const Nevis = require('nevis/lite');
const C2S = require('canvas2svg');

const Renderer = require('qrious-core/src/renderer/Renderer');
const CanvasRenderer = require('qrious-core/src/renderer/CanvasRenderer');
const Frame = require('qrious-core/src/Frame');
const ImageRenderer = require('qrious-core/src/renderer/ImageRenderer');
const Option = require('qrious-core/src/option/Option');
const OptionManager = require('qrious-core/src/option/OptionManager');
const ServiceManager = require('qrious-core/src/service/ServiceManager');
const Utilities = require('qrious-core/src/util/Utilities');
const ElementService = require('qrious-core/src/service/element/ElementService');

let optionManager = new OptionManager([
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
let serviceManager = new ServiceManager();
let SvgRenderer = Renderer.extend({
  draw: function(frame) {
    var i, j;
    var qrious = this.qrious;
    var moduleSize = this.getModuleSize(frame);
    var offset = this.getOffset(frame);
    var context = C2S(qrious.size,qrious.size);

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
  reset: function() {
    var qrious = this.qrious;
    var context = C2S(qrious.size,qrious.size);
    var size = qrious.size;

    context.lineWidth = 1;
    context.clearRect(0, 0, size, size);
    context.fillStyle = qrious.background;
    context.globalAlpha = qrious.backgroundAlpha;
    context.fillRect(0, 0, size, size);
  },
  resize: function() {
    var element = this.element;
    element.width = element.height = this.qrious.size;
  }
});
const QRious = Nevis.extend(function(options) {
  optionManager.init(options, this, this.update.bind(this));

  var element = optionManager.get('element', this);
  var elementService = serviceManager.getService('element');
  var canvas = element && elementService.isCanvas(element) ? element : elementService.createCanvas();
  var image = element && elementService.isImage(element) ? element : elementService.createImage();
  var svgCanvas = elementService.createCanvas();
  this._canvasRenderer = new CanvasRenderer(this, canvas, true);
  this._imageRenderer = new ImageRenderer(this, image, image === element);
  this._svgRenderer = new SvgRenderer(this, svgCanvas, false);

  this.update();
}, {
  get: function() {
    return optionManager.getAll(this);
  },
  set: function(options) {
    if (optionManager.setAll(options, this)) {
      this.update();
    }
  },
  toDataURL: function(mime) {
    return this.canvas.toDataURL(mime || this.mime);
  },
  toSVG:function(){
    console.log(this._svgRenderer);
  },
  update: function() {
    var frame = new Frame({
      level: this.level,
      value: this.value
    });

    this._canvasRenderer.render(frame);
    this._imageRenderer.render(frame);
    this._svgRenderer.render(frame);
  }
}, {
  use: function(service) {
    serviceManager.setService(service.getName(), service);
  }

});
Object.defineProperties(QRious.prototype, {
  canvas: {
    get: function() {
      return this._canvasRenderer.getElement();
    }
  },

  image: {
    get: function() {
      return this._imageRenderer.getElement();
    }
  }
});

const BrowserElementService = ElementService.extend({
  createCanvas: function() {
    return document.createElement('canvas');
  },
  createImage: function() {
    return document.createElement('img');
  },
  isCanvas: function(element) {
    return element instanceof HTMLCanvasElement;
  },
  isImage: function(element) {
    return element instanceof HTMLImageElement;
  }
});

QRious.use(new BrowserElementService());
export { QRious };
