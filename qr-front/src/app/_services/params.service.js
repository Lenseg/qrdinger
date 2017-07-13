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
var angular_1 = require("@uirouter/angular");
var ParamsService = (function () {
    function ParamsService(stateService) {
        this.stateService = stateService;
    }
    ParamsService.prototype.bindFormParamsUpdate = function (formObservable) {
        var _this = this;
        formObservable.valueChanges.subscribe(function () {
            var params = {};
            for (var param in formObservable.value) {
                params[param] = encodeURIComponent(formObservable.value[param]);
            }
            _this.stateService.go(_this.stateService.current, params);
        });
    };
    ParamsService.prototype.setObjectAsParams = function (newParams) {
        var params = {};
        for (var param in params) {
            params[param] = encodeURIComponent(newParams[param]);
        }
        this.stateService.go(this.stateService.current, params);
    };
    return ParamsService;
}());
ParamsService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [angular_1.StateService])
], ParamsService);
exports.ParamsService = ParamsService;
