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
var UrlFormComponent = (function () {
    function UrlFormComponent(modelUpdateService, stateService) {
        this.modelUpdateService = modelUpdateService;
        this.stateService = stateService;
        this.urlRegexp = /[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
        this.protocolRegexp = /^(http:|ftp:|https:)/;
        this.urlValue = this.stateService.params['url'] ? decodeURIComponent(this.stateService.params['url']) : '';
        this.url = new forms_1.FormControl(this.urlValue, [
            forms_1.Validators.required,
            forms_1.Validators.pattern(this.urlRegexp),
            directives_1.patternWarningWalidator(this.protocolRegexp)
        ]);
        this.errors = [];
        this.warns = [];
        this.bingUpdateEvents();
    }
    UrlFormComponent.prototype.bingUpdateEvents = function () {
        var _this = this;
        this.url.valueChanges.subscribe(function (value) {
            _this.errors = [];
            _this.warns = [];
            if (!_this.url.valid && _this.url.dirty) {
                for (var err in _this.url.errors) {
                    if (errors[err].type === 'err') {
                        _this.errors.push(errors[err]);
                    }
                    else {
                        _this.warns.push(errors[err]);
                    }
                    ;
                }
            }
            _this.sendModel();
        });
    };
    UrlFormComponent.prototype.sendModel = function () {
        var model = {
            type: 'url',
            url: this.url.value
        };
        this.modelUpdateService.modelUpdate(model);
    };
    return UrlFormComponent;
}());
UrlFormComponent = __decorate([
    core_1.Component({
        selector: 'url-form',
        templateUrl: './url-form.component.html'
    }),
    __metadata("design:paramtypes", [index_1.ModelUpdateService, angular_1.StateService])
], UrlFormComponent);
exports.UrlFormComponent = UrlFormComponent;
var errors = {
    pattern: {
        type: 'err',
        message: 'Your link is incorrect.'
    },
    required: {
        type: 'err',
        message: 'Please, put something in link field.'
    },
    patternWarning: {
        type: 'warn',
        message: 'Http(s) protocol prefix is reccomended.'
    }
};
