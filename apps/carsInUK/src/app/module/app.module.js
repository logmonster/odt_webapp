"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var landing_page_component_1 = require("./landing.page.component");
var search_component_1 = require("./../component/search/search.component");
var suggestive_text_input_component_1 = require("./../component/search/suggestive.text.input.component");
var item_list_component_1 = require("./../component/item/item.list.component");
var item_card_component_1 = require("./../component/item/item.card.component");
var query_dlg_component_1 = require("./../component/dlg/query.dlg.component");
var esearch_provider_1 = require("./../core/esearch.provider");
var core_model_provider_1 = require("./../core/core.model.provider");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [platform_browser_1.BrowserModule, forms_1.FormsModule],
        declarations: [
            landing_page_component_1.LandingPageComponent,
            search_component_1.SearchComponent, suggestive_text_input_component_1.SuggestiveTextInputComponent,
            item_list_component_1.ItemListComponent, item_card_component_1.ItemCardComponent,
            query_dlg_component_1.QueryDlgComponent
        ],
        providers: [
            esearch_provider_1.ESearchProvider,
            core_model_provider_1.CoreModelProvider
        ],
        bootstrap: [landing_page_component_1.LandingPageComponent]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map