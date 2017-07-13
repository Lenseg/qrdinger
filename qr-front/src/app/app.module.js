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
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var angular_1 = require("@uirouter/angular");
var dropdown_1 = require("ngx-bootstrap/dropdown");
var app_states_1 = require("./app.states");
var router_config_1 = require("./router.config");
var index_1 = require("./_services/index");
var app_component_1 = require("./app.component");
var login_component_1 = require("./login/login.component");
var register_component_1 = require("./register/register.component");
var home_component_1 = require("./home/home.component");
var codes_list_component_1 = require("./codes-list/codes-list.component");
var code_list_item_component_1 = require("./code-list-item/code-list-item.component");
var single_code_component_1 = require("./single-code/single-code.component");
var create_code_component_1 = require("./create-code/create-code.component");
var display_code_component_1 = require("./display-code/display-code.component");
var url_form_component_1 = require("./url-form/url-form.component");
var wifi_form_component_1 = require("./wifi-form/wifi-form.component");
var string_form_component_1 = require("./string-form/string-form.component");
var sms_form_component_1 = require("./sms-form/sms-form.component");
var business_card_form_component_1 = require("./business-card-form/business-card-form.component");
var code_options_component_1 = require("./code-options/code-options.component");
var angular_in_memory_web_api_1 = require("angular-in-memory-web-api");
var mock_data_1 = require("./mock-data");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [
            http_1.HttpModule,
            angular_in_memory_web_api_1.InMemoryWebApiModule.forRoot(mock_data_1.MockData, {
                passThruUnknownUrl: true
            }),
            angular_1.UIRouterModule.forRoot({
                states: app_states_1.APP_STATES,
                useHash: true,
                otherwise: { state: 'home' },
                config: router_config_1.routerConfigFn
            }),
            platform_browser_1.BrowserModule,
            forms_1.ReactiveFormsModule,
            forms_1.FormsModule,
            http_1.HttpModule,
            dropdown_1.BsDropdownModule.forRoot()
        ],
        declarations: [
            app_component_1.AppComponent,
            home_component_1.HomeComponent,
            login_component_1.LoginComponent,
            create_code_component_1.CreateCodeComponent,
            display_code_component_1.DisplayCodeComponent,
            codes_list_component_1.CodesListComponent,
            code_list_item_component_1.CodesListItemComponent,
            single_code_component_1.SingleCodeComponent,
            register_component_1.RegisterComponent,
            url_form_component_1.UrlFormComponent,
            string_form_component_1.StringFormComponent,
            sms_form_component_1.SmsFormComponent,
            wifi_form_component_1.WifiFormComponent,
            business_card_form_component_1.BusinessCardFormComponent,
            code_options_component_1.CodeOptionsComponent
        ],
        providers: [
            index_1.AppConfigService,
            index_1.AuthService,
            index_1.ParamsService,
            index_1.CodesService,
            index_1.ModelUpdateService
        ],
        bootstrap: [angular_1.UIView]
    }),
    __metadata("design:paramtypes", [])
], AppModule);
exports.AppModule = AppModule;
