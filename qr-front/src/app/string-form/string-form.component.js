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
var forms_1 = require("@angular/forms");
var angular_1 = require("@uirouter/angular");
var index_1 = require("../_services/index");
var StringFormComponent = (function () {
    function StringFormComponent(modelUpdateService, stateService) {
        this.modelUpdateService = modelUpdateService;
        this.stateService = stateService;
        this.stringValue = this.stateService.params['string'] ? decodeURIComponent(this.stateService.params['string']) : '';
        this.string = new forms_1.FormControl(this.stringValue, [
            forms_1.Validators.required
        ]);
        this.errors = [];
        this.bindUpdateEvents();
    }
    StringFormComponent.prototype.bindUpdateEvents = function () {
        var _this = this;
        this.string.valueChanges.subscribe(function (value) {
            _this.errors = [];
            if (!_this.string.valid && _this.string.dirty) {
                for (var err in _this.string.errors) {
                    _this.errors.push(errors[err]);
                }
            }
            _this.sendModel();
        });
    };
    StringFormComponent.prototype.sendModel = function () {
        var model = {
            type: 'string',
            string: this.string.value
        };
        this.modelUpdateService.modelUpdate(model);
    };
    return StringFormComponent;
}());
StringFormComponent = __decorate([
    core_1.Component({
        selector: 'string-form',
        templateUrl: './string-form.component.pug'
    }),
    __metadata("design:paramtypes", [index_1.ModelUpdateService, angular_1.StateService])
], StringFormComponent);
exports.StringFormComponent = StringFormComponent;
var errors = {
    required: {
        type: 'err',
        message: 'Please, put something in text field.'
    }
};
