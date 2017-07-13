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
var directives_1 = require("../_global/directives");
var SmsFormComponent = (function () {
    function SmsFormComponent(modelUpdateService, fb, stateService) {
        this.modelUpdateService = modelUpdateService;
        this.fb = fb;
        this.stateService = stateService;
        this.numberRegexp = /[0-9]/;
        this.statrtsWidthPlusRegexp = /^\+/;
        this.messageErrors = [];
        this.messageWarns = [];
        this.numberErrors = [];
        this.numberWarns = [];
        this.createForm();
        this.bindUpdateEvents();
    }
    SmsFormComponent.prototype.createForm = function () {
        var formValues = {};
        formValues.number = this.stateService.params['number'] ? decodeURI(this.stateService.params['number']) : '';
        formValues.message = this.stateService.params['message'] ? decodeURI(this.stateService.params['message']) : '',
            this.form = this.fb.group({
                number: ['', [
                        forms_1.Validators.required,
                        forms_1.Validators.pattern(this.numberRegexp),
                        directives_1.patternWarningWalidator(this.statrtsWidthPlusRegexp)
                    ]],
                message: ['', forms_1.Validators.required]
            });
        this.form.setValue(formValues);
    };
    SmsFormComponent.prototype.bindUpdateEvents = function () {
        var _this = this;
        this.form.valueChanges.subscribe(function (value) {
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
            _this.setModel();
        });
    };
    SmsFormComponent.prototype.setModel = function () {
        var number = this.form.value.number.replace(/[^+[0-9]]*/g, '');
        var model = {
            type: 'sms',
            number: number,
            message: this.form.value.message
        };
        this.modelUpdateService.modelUpdate(model);
    };
    SmsFormComponent.prototype.preventCharInput = function (e) {
        var regexp = /[^0-9,+,(,),\-,—,–, ]/g;
        if (regexp.test(e.key))
            e.preventDefault();
    };
    SmsFormComponent.prototype.filterPaste = function (e) {
        var _this = this;
        setTimeout(function () {
            var regexp = /[^0-9,+,(,),\-,—,–, ]/g;
            var control = _this.form.get('number');
            control.setValue(control.value.replace(regexp, ''));
        }, 0);
    };
    return SmsFormComponent;
}());
SmsFormComponent = __decorate([
    core_1.Component({
        selector: 'sms-form',
        templateUrl: './sms-form.component.html'
    }),
    __metadata("design:paramtypes", [index_1.ModelUpdateService, forms_1.FormBuilder, angular_1.StateService])
], SmsFormComponent);
exports.SmsFormComponent = SmsFormComponent;
var smsParams = (function () {
    function smsParams() {
    }
    return smsParams;
}());
var errors = {
    number: {
        required: {
            type: 'err',
            message: 'Are you sure number shold be empty?'
        },
        pattern: {
            type: 'err',
            message: 'Please, put some numbers in here'
        },
        patternWarning: {
            type: 'warn',
            message: 'International prefix (+X) is reccomended'
        }
    },
    message: {
        required: {
            type: 'warn',
            message: 'Are you sure message shold be empty?'
        }
    }
};
