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
var WifiFormComponent = (function () {
    function WifiFormComponent(modelUpdateService, fb, stateService) {
        this.modelUpdateService = modelUpdateService;
        this.fb = fb;
        this.stateService = stateService;
        this.typeErrors = [];
        this.nameErrors = [];
        this.nameWarns = [];
        this.passErrors = [];
        this.passWarns = [];
        this.createForm();
        this.typeCache = this.form.value.networkType;
        this.bindUpdateEvents();
    }
    WifiFormComponent.prototype.createForm = function () {
        var formValues = {};
        formValues.name = this.stateService.params['name'] ? decodeURI(this.stateService.params['name']) : '';
        formValues.pass = this.stateService.params['pass'] ? decodeURI(this.stateService.params['pass']) : '',
            formValues.networkType = this.stateService.params['networkType'] ? decodeURI(this.stateService.params['networkType']) : 'WPA';
        formValues.hidden = this.stateService.params['hidden'] ? this.stateService.params['hidden'] : false;
        this.form = this.fb.group({
            name: [formValues.name,
                forms_1.Validators.required
            ],
            pass: formValues.pass,
            networkType: formValues.networkType,
            hidden: formValues.hidden
        }, {
            validator: this.isPasswordReqired('networkType', 'pass')
        });
        this.form.setValue(formValues);
    };
    WifiFormComponent.prototype.bindUpdateEvents = function () {
        var _this = this;
        this.form.valueChanges.subscribe(function (value) {
            if (_this.checkIsTypeChanged(value.networkType)) {
                _this.setFormConfigByType(value.networkType);
            }
            for (var controlName in errors) {
                var control = _this.form.get(controlName);
                _this[controlName + 'Errors'] = [];
                _this[controlName + 'Warns'] = [];
                if (control && control.dirty && !control.valid) {
                    for (var key in control.errors) {
                        var errMessage = errors[controlName][key];
                        if (errMessage.type === 'err') {
                            _this[controlName + 'Errors'].push(errMessage);
                        }
                        else {
                            _this[controlName + 'Warns'].push(errMessage);
                        }
                    }
                }
            }
            _this.sendModel();
        });
    };
    WifiFormComponent.prototype.isPasswordReqired = function (typeControlName, passControlName) {
        return function (group) {
            var typeControl = group.get(typeControlName);
            var passControl = group.get(passControlName);
            if (typeControl.value !== 'nopass' && passControl.value === '') {
                passControl.setErrors({ required: true });
            }
            else {
                passControl.setErrors(null);
            }
        };
    };
    WifiFormComponent.prototype.checkIsTypeChanged = function (type) {
        if (type !== this.typeCache) {
            this.typeCache = type;
            return true;
        }
        return false;
    };
    WifiFormComponent.prototype.setFormConfigByType = function (type) {
        var passControll = this.form.get('pass');
        if (type === 'nopass') {
            passControll.disable();
            passControll.setValue('', {
                emitEvent: true
            });
        }
        else {
            passControll.enable();
        }
    };
    WifiFormComponent.prototype.sendModel = function () {
        var model = Object.assign({ type: 'wifi' }, this.form.value);
        this.modelUpdateService.modelUpdate(model);
    };
    return WifiFormComponent;
}());
WifiFormComponent = __decorate([
    core_1.Component({
        selector: 'wifi-form',
        templateUrl: './wifi-form.component.pug'
    }),
    __metadata("design:paramtypes", [index_1.ModelUpdateService, forms_1.FormBuilder, angular_1.StateService])
], WifiFormComponent);
exports.WifiFormComponent = WifiFormComponent;
var CodeWifiParams = (function () {
    function CodeWifiParams() {
    }
    return CodeWifiParams;
}());
var errors = {
    name: {
        required: {
            type: 'err',
            message: 'Network name required.'
        }
    },
    pass: {
        required: {
            type: 'err',
            message: 'Password  required.'
        }
    }
};
