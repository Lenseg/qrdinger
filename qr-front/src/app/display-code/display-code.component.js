"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var qrious_1 = require("../_global/qrious");
var code_1 = require("../_global/code");
var DisplayCodeComponent = (function () {
    function DisplayCodeComponent() {
        this.codeInstance = {};
    }
    DisplayCodeComponent.prototype.ngOnChanges = function () {
        this.updateCode();
    };
    DisplayCodeComponent.prototype.ngOnInit = function () {
        this.updateSize();
        this.createCode();
    };
    DisplayCodeComponent.prototype.ngDoCheck = function () {
        this.updateCode();
    };
    DisplayCodeComponent.prototype.onResize = function () {
        this.updateSize();
    };
    DisplayCodeComponent.prototype.createCode = function () {
        this.codeInstance = new qrious_1.QRious({
            size: this.canvasContainer.nativeElement.offsetWidth,
            element: this.canvas.nativeElement
        });
        console.log(this.codeInstance);
    };
    DisplayCodeComponent.prototype.updateSize = function () {
        this.codeInstance.size = this.canvasContainer.nativeElement.offsetWidth;
    };
    DisplayCodeComponent.prototype.updateCode = function () {
        this.codeInstance.value = this.code.value;
        for (var option in this.code.options) {
            this.codeInstance[option] = this.code.options[option];
        }
    };
    return DisplayCodeComponent;
}());
__decorate([
    core_1.Input('code'),
    __metadata("design:type", code_1.Code)
], DisplayCodeComponent.prototype, "code", void 0);
__decorate([
    core_1.ViewChild('canvas'),
    __metadata("design:type", core_1.ElementRef)
], DisplayCodeComponent.prototype, "canvas", void 0);
__decorate([
    core_1.ViewChild('canvasContainer'),
    __metadata("design:type", core_1.ElementRef)
], DisplayCodeComponent.prototype, "canvasContainer", void 0);
DisplayCodeComponent = __decorate([
    core_1.Component({
        selector: 'display-code',
        templateUrl: './display-code.component.html',
        host: {
            '(window:resize)': 'onResize()'
        }
    }),
    __metadata("design:paramtypes", [])
], DisplayCodeComponent);
exports.DisplayCodeComponent = DisplayCodeComponent;
