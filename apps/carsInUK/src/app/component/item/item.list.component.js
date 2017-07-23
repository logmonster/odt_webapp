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
//import { NgClass } from '@angular/common';
var landing_page_component_1 = require("./../../module/landing.page.component");
// make jQuery "recognizable"
//declare var jQuery:any;
var ItemListComponent = (function () {
    function ItemListComponent() {
        // ctor. Init anything when necessary
        console.log('item.list~');
        // TODO: destroy / remove element / component on the fly
        // elementRef.nativeElement.querySelector('some-elem').destroy();
    }
    ItemListComponent.prototype.ngAfterContentChecked = function () { };
    return ItemListComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", landing_page_component_1.LandingPageComponent)
], ItemListComponent.prototype, "_ref", void 0);
ItemListComponent = __decorate([
    core_1.Component({
        selector: 'item-list-component',
        templateUrl: "./view/itemListComponent.html"
    }),
    __metadata("design:paramtypes", [])
], ItemListComponent);
exports.ItemListComponent = ItemListComponent;
//# sourceMappingURL=item.list.component.js.map