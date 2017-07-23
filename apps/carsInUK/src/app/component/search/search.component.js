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
var landing_page_component_1 = require("./../../module/landing.page.component");
var SearchComponent = (function () {
    function SearchComponent(_el) {
        // ctor. Init anything when necessary
        this._el = _el;
        this._showSimpleSearch = true;
        this._uiInited = false;
        this._isFirstSearchToggle = true;
        // TODO: destroy / remove element / component on the fly
        // elementRef.nativeElement.querySelector('some-elem').destroy();
    }
    SearchComponent.prototype.ngAfterContentChecked = function () {
        // do sth if necessary after state change in the component
        if (this._uiInited == false) {
            jQuery('[data-toggle="tooltip"]').tooltip({
                container: 'body'
            });
            this._uiInited = true;
        }
    };
    // ####################
    SearchComponent.prototype.toggleLayout = function () {
        this._ref._toggleLayout();
    };
    // ####################
    SearchComponent.prototype._getClassForSearchDiv = function () {
        return {
            'align-middle': true,
            'flex-center': this._showSimpleSearch,
            'search_bar_simple_outer_container': true,
            'animated': true,
            'fadeInUp': true,
            showing: this._showSimpleSearch,
            hiding: !this._showSimpleSearch
        };
    };
    SearchComponent.prototype._getClassForAdvSearchDiv = function () {
        return {
            'align-middle': true,
            'flex-center': !this._showSimpleSearch,
            'animated': true,
            'fadeInDown': true,
            showing: !this._showSimpleSearch,
            hiding: this._showSimpleSearch
        };
    };
    // toggle the _showSimpleSearch variable and hence toggle which pane to show
    SearchComponent.prototype.toggleSearchPane = function () {
        this._showSimpleSearch = !this._showSimpleSearch;
    };
    return SearchComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", landing_page_component_1.LandingPageComponent)
], SearchComponent.prototype, "_ref", void 0);
SearchComponent = __decorate([
    core_1.Component({
        selector: 'search-component',
        templateUrl: "./view/searchComponent.html"
    }),
    __metadata("design:paramtypes", [core_1.ElementRef])
], SearchComponent);
exports.SearchComponent = SearchComponent;
/*
$(function () {
  $('[data-toggle="tooltip"]').tooltip({
    container: 'body'
  })
})
*/
//# sourceMappingURL=search.component.js.map