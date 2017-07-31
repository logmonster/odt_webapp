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
var esearch_provider_1 = require("./../core/esearch.provider");
var LandingPageComponent = (function () {
    // constructor
    function LandingPageComponent(_el, _es) {
        this._el = _el;
        this._es = _es;
        this._layoutType = LANDING_LAYOUT_TYPE.COLUMNS;
        this._mapInited = false;
        this._gmarkers = [];
    }
    LandingPageComponent.prototype.ngAfterContentChecked = function () {
        if (!this._mapInited) {
            this._mapInited = true;
            // init gmap
            this._initGMap();
        }
    };
    /**
     *  set the item-list for ItemListComponent (visualization)
     */
    LandingPageComponent.prototype.setItemList = function (_list) {
        this._itemList = _list;
        console.log(this._itemList);
    };
    LandingPageComponent.prototype._initGMap = function () {
        // clear div contents first
        jQuery(this._el.nativeElement.querySelector('#gMap')).empty();
        // a slight debounce is required so that the original map contents are removed by jQuery first
        // seems like if gmap instance already there, gmap would not be "re-created" even you call the new Map() api
        var _me = this;
        setTimeout(function () {
            _me._gmarkers = [];
            _me._gmap = new google.maps.Map(_me._el.nativeElement.querySelector('#gMap'), {
                zoom: 3,
                center: { lat: 55.0516877, lng: 3.4360 }
            });
            // add marker (center of UK...)
            _me._gmarkers.push(new google.maps.Marker({
                position: new google.maps.LatLng(55.0516877, -4.401611),
                title: 'United Kingdom',
                map: _me._gmap
            }));
        }, 100);
    };
    // ################################
    LandingPageComponent.prototype._getClassForListItemPane = function () {
        var _css = {};
        if (this._layoutType == LANDING_LAYOUT_TYPE.COLUMNS) {
            _css['col-md-4'] = true;
            _css['col-sm-4'] = true;
        }
        else {
            _css['col-md-12'] = true;
            _css['col-sm-12'] = true;
        }
        return _css;
    };
    LandingPageComponent.prototype._getClassForGMapPane = function () {
        var _css = {};
        if (this._layoutType == LANDING_LAYOUT_TYPE.COLUMNS) {
            _css['col-md-8'] = true;
            _css['col-sm-8'] = true;
        }
        else {
            _css['col-md-12'] = true;
            _css['col-sm-12'] = true;
        }
        return _css;
    };
    // ################################
    LandingPageComponent.prototype._toggleLayout = function () {
        this._layoutType = (++this._layoutType) % 2;
        // re-init the gmap (since the size of the div already changed, avoid visual flaws)
        this._initGMap();
    };
    return LandingPageComponent;
}());
LandingPageComponent = __decorate([
    core_1.Component({
        selector: 'landing-page-component',
        templateUrl: "./view/landingPageComponent.html"
    }),
    __metadata("design:paramtypes", [core_1.ElementRef, esearch_provider_1.ESearch])
], LandingPageComponent);
exports.LandingPageComponent = LandingPageComponent;
/**
 *  the enum stating the layout type
 */
var LANDING_LAYOUT_TYPE;
(function (LANDING_LAYOUT_TYPE) {
    LANDING_LAYOUT_TYPE[LANDING_LAYOUT_TYPE["COLUMNS"] = 0] = "COLUMNS";
    LANDING_LAYOUT_TYPE[LANDING_LAYOUT_TYPE["TILES"] = 1] = "TILES";
})(LANDING_LAYOUT_TYPE = exports.LANDING_LAYOUT_TYPE || (exports.LANDING_LAYOUT_TYPE = {}));
;
//# sourceMappingURL=landing.page.component.js.map