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
var item_list_component_1 = require("./item.list.component");
// make jQuery "recognizable"
//declare var jQuery:any;
/**
 *  design issues:
 *    ItemCardComponent SHOULD-NOT have direct access / interaction with
 *    LandingPageComponent. Since ItemCardComponent is a child of ItemListComponent,
 *    it should only have the knowledge about ItemListComponent and hence any
 *    interaction involving the LandingPageComponent should be handled by
 *    the direct parent ItemListComponent.
 *
 *    PS. This design makes sense if you would want to re-use either the
 *    ItemListComponent OR the ItemCardComponent for another project.
 */
var ItemCardComponent = (function () {
    function ItemCardComponent() {
        // ctor. Init anything when necessary
    }
    ItemCardComponent.prototype.ngAfterContentChecked = function () { };
    return ItemCardComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", item_list_component_1.ItemListComponent)
], ItemCardComponent.prototype, "_ref", void 0);
ItemCardComponent = __decorate([
    core_1.Component({
        selector: 'item-card-component',
        templateUrl: "./view/itemCardComponent.html"
    }),
    __metadata("design:paramtypes", [])
], ItemCardComponent);
exports.ItemCardComponent = ItemCardComponent;
//# sourceMappingURL=item.card.component.js.map