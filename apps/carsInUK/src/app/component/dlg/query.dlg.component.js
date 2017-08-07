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
var core_model_provider_1 = require("./../../core/core.model.provider");
// make jQuery "recognizable"
//declare var jQuery:any;
/**
 *  design issues:
 *    ...
 */
var QueryDlgComponent = QueryDlgComponent_1 = (function () {
    function QueryDlgComponent(_coreModel) {
        this._coreModel = _coreModel;
        // ctor. Init anything when necessary
    }
    /**
     *  method to show the dlg with the given contents
     */
    QueryDlgComponent.prototype._getDlgTitle = function () {
        if (this._coreModel) {
            // title
            var _title = this._coreModel.getDataByKey(QueryDlgComponent_1.KEY_TITLE);
            if (_title) {
                return _title;
            }
        }
        return "title";
    };
    QueryDlgComponent.prototype._getDlgContent = function () {
        if (this._coreModel) {
            // contents
            var _contents = this._coreModel.getDataByKey(QueryDlgComponent_1.KEY_CONTENT);
            console.log(_contents);
        }
    };
    QueryDlgComponent.prototype._copyQueryToClipboard = function () {
        console.log('called copyQueryToClipboard');
    };
    return QueryDlgComponent;
}());
//@Input() _ref:ItemListComponent;
QueryDlgComponent.KEY_TITLE = "KEY_TITLE";
QueryDlgComponent.KEY_CONTENT = "KEY_CONTENT";
QueryDlgComponent = QueryDlgComponent_1 = __decorate([
    core_1.Component({
        selector: 'query-dlg-component',
        templateUrl: "./view/queryDlgComponent.html",
        providers: [
            core_model_provider_1.CoreModelProvider
        ]
    }),
    __metadata("design:paramtypes", [core_model_provider_1.CoreModel])
], QueryDlgComponent);
exports.QueryDlgComponent = QueryDlgComponent;
var QueryDlgComponent_1;
//# sourceMappingURL=query.dlg.component.js.map