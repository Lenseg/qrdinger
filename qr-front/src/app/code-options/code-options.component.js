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
var code_1 = require("../_global/code");
var CodeOptionsComponent = (function () {
    function CodeOptionsComponent(fb, stateService) {
        this.fb = fb;
        this.stateService = stateService;
    }
    CodeOptionsComponent.prototype.ngOnInit = function () {
        this.createForm();
        this.bindChangeEvents();
    };
    CodeOptionsComponent.prototype.createForm = function () {
        var formValues = {
            level: 1,
            foreground: '#000000',
            background: '#ffffff'
        };
        for (var option in formValues) {
            if (option === 'level') {
                switch (this.code.options.level.toLowerCase()) {
                    case 'l':
                        formValues.level = 1;
                        break;
                    case 'm':
                        formValues.level = 2;
                        break;
                    case 'q':
                        formValues.level = 3;
                        break;
                    case 'h':
                        formValues.level = 4;
                        break;
                }
            }
            else {
                formValues[option] = this.code.options[option] || formValues[option];
            }
        }
        formValues.level = this.stateService.params['level'] ? parseInt(decodeURIComponent(this.stateService.params['level'])) : formValues.level;
        formValues.foreground = this.stateService.params['foreground'] ? decodeURIComponent(this.stateService.params['foreground']) : formValues.foreground,
            formValues.background = this.stateService.params['background'] ? decodeURIComponent(this.stateService.params['background']) : formValues.background;
        this.form = this.fb.group(formValues);
        this.updateCode(this.form.value);
    };
    CodeOptionsComponent.prototype.bindChangeEvents = function () {
        var _this = this;
        this.form.valueChanges.subscribe(function () {
            _this.updateCode(_this.form.value);
        });
    };
    CodeOptionsComponent.prototype.updateCode = function (value) {
        var options = Object.assign({}, value);
        switch (options.level) {
            case 1:
                options.level = 'L';
                break;
            case 2:
                options.level = 'M';
                break;
            case 3:
                options.level = 'Q';
                break;
            case 4:
                options.level = 'H';
                break;
        }
        this.level = options.level;
        console.log(this.code, options);
        Object.assign(this.code.options, options);
    };
    return CodeOptionsComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", code_1.Code)
], CodeOptionsComponent.prototype, "code", void 0);
CodeOptionsComponent = __decorate([
    core_1.Component({
        selector: 'code-options',
        templateUrl: './code-options.component.html'
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder, angular_1.StateService])
], CodeOptionsComponent);
exports.CodeOptionsComponent = CodeOptionsComponent;
var CodeOptionsForm = (function () {
    function CodeOptionsForm() {
    }
    return CodeOptionsForm;
}());
