"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var LandingPageComponent = (function () {
    function LandingPageComponent() {
        this._layoutType = LANDING_LAYOUT_TYPE.COLUMNS;
    }
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
    };
    return LandingPageComponent;
}());
LandingPageComponent = __decorate([
    core_1.Component({
        selector: 'landing-page-component',
        templateUrl: "./view/landingPageComponent.html"
    })
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
/*
// object binding between parent and child
  @Input() _ref:PlaygroundComponent;

  constructor() {
    // init
  }

  ngAfterViewInit() {
    //this._ref.changeRoutlet('testing-baby');
  }

  private pluginRequested(label:string) {
    // based on the label value, change the router-outlet to show the correct component view
    if (label == 'photo-picker') {
      this._ref.changeRoutlet(label);
    } else {
      // normally should just pass through
      this._ref.changeRoutlet(label);
    }
  }
*/
//# sourceMappingURL=landing.page.component.js.map