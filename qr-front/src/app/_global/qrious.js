"use strict";
var Nevis = require('nevis/lite');
var Renderer = require('qrious-core/src/renderer/Renderer');
var Frame = require('qrious-core/src/Frame');
var ImageRenderer = require('qrious-core/src/renderer/ImageRenderer');
var Option = require('qrious-core/src/option/Option');
var OptionManager = require('qrious-core/src/option/OptionManager');
var ServiceManager = require('qrious-core/src/service/ServiceManager');
var Utilities = require('qrious-core/src/util/Utilities');
var ElementService = require('qrious-core/src/service/element/ElementService');
var optionManager = new OptionManager([
    new Option('background', true, 'white'),
    new Option('backgroundAlpha', true, 1, Utilities.abs),
    new Option('element'),
    new Option('foreground', true, 'black'),
    new Option('foregroundAlpha', true, 1, Utilities.abs),
    new Option('level', true, 'L', Utilities.toUpperCase),
    new Option('mime', true, 'image/png'),
    new Option('padding', true, null, Utilities.abs),
    new Option('size', true, 100, Utilities.abs),
    new Option('value', true, '')
]);
var serviceManager = new ServiceManager();
var SvgCanvasRenderer = Renderer.extend({
    draw: function (frame) {
        var i, j;
        var qrious = this.qrious;
        var moduleSize = this.getModuleSize(frame);
        var offset = this.getOffset(frame);
        var context = this.element.getContext('2d');
        context.fillStyle = qrious.foreground;
        context.globalAlpha = qrious.foregroundAlpha;
        for (i = 0; i < frame.width; i++) {
            for (j = 0; j < frame.width; j++) {
                if (frame.buffer[(j * frame.width) + i]) {
                    context.fillRect((moduleSize * i) + offset, (moduleSize * j) + offset, moduleSize, moduleSize);
                }
            }
        }
    },
    reset: function () {
        var qrious = this.qrious;
        var context = this.element.getContext('2d');
        var size = qrious.size;
        context.lineWidth = 1;
        context.clearRect(0, 0, size, size);
        context.fillStyle = qrious.background;
        context.globalAlpha = qrious.backgroundAlpha;
        context.fillRect(0, 0, size, size);
    }
});
var QRious = Nevis.extend(function (options) {
    optionManager.init(options, this, this.update.bind(this));
    var element = optionManager.get('element', this);
    var elementService = serviceManager.getService('element');
    var canvas = element && elementService.isCanvas(element) ? element : elementService.createCanvas();
    var image = element && elementService.isImage(element) ? element : elementService.createImage();
    this._canvasRenderer = new SvgCanvasRenderer(this, canvas, true);
    this._imageRenderer = new ImageRenderer(this, image, image === element);
    this.update();
}, {
    get: function () {
        return optionManager.getAll(this);
    },
    set: function (options) {
        if (optionManager.setAll(options, this)) {
            this.update();
        }
    },
    toDataURL: function (mime) {
        return this.canvas.toDataURL(mime || this.mime);
    },
    update: function () {
        var frame = new Frame({
            level: this.level,
            value: this.value
        });
        this._canvasRenderer.render(frame);
        this._imageRenderer.render(frame);
    }
}, {
    use: function (service) {
        serviceManager.setService(service.getName(), service);
    }
});
exports.QRious = QRious;
Object.defineProperties(QRious.prototype, {
    canvas: {
        get: function () {
            return this._canvasRenderer.getElement();
        }
    },
    image: {
        get: function () {
            return this._imageRenderer.getElement();
        }
    }
});
var BrowserElementService = ElementService.extend({
    createCanvas: function () {
        return document.createElement('canvas');
    },
    createImage: function () {
        return document.createElement('img');
    },
    isCanvas: function (element) {
        return element instanceof HTMLCanvasElement;
    },
    isImage: function (element) {
        return element instanceof HTMLImageElement;
    }
});
QRious.use(new BrowserElementService());
