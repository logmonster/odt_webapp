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
/**
 *  singleton for providing elasticSearch connectivity
 */
var ESearch = ESearch_1 = (function () {
    // ctor
    function ESearch() {
    }
    ESearch.getInstance = function () {
        if (ESearch_1._instance == null) {
            ESearch_1._instance = new ESearch_1();
        }
        return ESearch_1._instance;
    };
    /**
     *  return the only instance of es.Client
     */
    ESearch.prototype.getClient = function () {
        if (this._esclient == null) {
            this._esclient = new jQuery.es.Client({
                hosts: ['localhost:9200']
            });
        }
        return this._esclient;
    };
    return ESearch;
}());
ESearch._instance = null;
ESearch = ESearch_1 = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [])
], ESearch);
exports.ESearch = ESearch;
exports.ESearchProvider = {
    provide: ESearch,
    useFactory: ESearch.getInstance
};
var ESearch_1;
//# sourceMappingURL=esearch.provider.js.map