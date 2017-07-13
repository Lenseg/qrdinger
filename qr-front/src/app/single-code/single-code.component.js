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
var code_1 = require("../_global/code");
var angular_1 = require("@uirouter/angular");
var index_1 = require("../_services/index");
var SingleCodeComponent = (function () {
    function SingleCodeComponent(codesService, stateService) {
        var _this = this;
        this.codesService = codesService;
        this.stateService = stateService;
        var codeId = this.stateService.params['codeId'];
        this.code = new code_1.Code();
        if (codeId !== 'new') {
            this.codesService.getCode(codeId).subscribe(function (code) { return _this.code = new code_1.Code(code); });
        }
    }
    return SingleCodeComponent;
}());
SingleCodeComponent = __decorate([
    core_1.Component({
        selector: 'single-code',
        templateUrl: './single-code.component.pug'
    }),
    __metadata("design:paramtypes", [index_1.CodesService, angular_1.StateService])
], SingleCodeComponent);
exports.SingleCodeComponent = SingleCodeComponent;
