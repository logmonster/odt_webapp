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
 *  sort of like a singleton for storing information across
 *  component(s)
 */
var CoreModel = CoreModel_1 = (function () {
    function CoreModel() {
        // the actual place where dynamic data (logically grouped) could be stored
        this._fieldset = {};
        this._creationTimestamp = new Date();
    }
    // *
    CoreModel.getInstance = function () {
        if (CoreModel_1._instance == null) {
            CoreModel_1._instance = new CoreModel_1();
        }
        return CoreModel_1._instance;
    };
    CoreModel.prototype.getCreationTimestamp = function () {
        return this._creationTimestamp;
    };
    /**
     *  set / add data based on the key value; can set _canOverwrite to true
     *  if needed to overwrite existing data
     */
    CoreModel.prototype.setDataByKey = function (_key, _data, _canOverwrite) {
        // check if _key exists
        var _keyExists = this._fieldset.hasOwnProperty(_key);
        var _ret = {};
        _ret[CoreModel_1.KEY_STATUS] = CoreModel_1.STATUS_OK;
        if (!_keyExists) {
            this._fieldset[_key] = _data;
        }
        else if (_canOverwrite == true) {
            this._fieldset[_key] = _data;
            _ret[CoreModel_1.KEY_OVERWRITE] = CoreModel_1.OVERWRITE_YES;
        }
        else {
            _ret[CoreModel_1.KEY_STATUS] = CoreModel_1.STATUS_FAIL;
            _ret[CoreModel_1.STATUS_FAIL_REASON] = CoreModel_1.REASON_DUPLICATE_KEY;
        }
        return _ret;
    };
    /**
     *  get the value / data based on the key
     */
    CoreModel.prototype.getDataByKey = function (_key) {
        return this._fieldset[_key];
    };
    /**
     *  get all the keys available (each key holds associated values)
     */
    CoreModel.prototype.getFieldSetKeys = function () {
        return Object.keys(this._fieldset);
    };
    /**
     *  remove the value under the given key
     */
    CoreModel.prototype.removeDataByKey = function (_key) {
        delete this._fieldset[_key];
    };
    return CoreModel;
}());
CoreModel.KEY_STATUS = "STATUS";
CoreModel.KEY_OVERWRITE = "OVERWRITE";
CoreModel.STATUS_OK = "OK";
CoreModel.STATUS_FAIL = "FAIL";
CoreModel.STATUS_FAIL_REASON = "FAIL_REASON";
CoreModel.OVERWRITE_YES = "YES";
CoreModel.OVERWRITE_NO = "NO";
CoreModel.REASON_DUPLICATE_KEY = "key already existed, either set _canOverwrite to 'true' or use another Key value";
// *
CoreModel._instance = null;
CoreModel = CoreModel_1 = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [])
], CoreModel);
exports.CoreModel = CoreModel;
/**
 *  provider:
 *    return the singleton instance of CoreModel
 */
exports.CoreModelProvider = {
    provide: CoreModel,
    useFactory: CoreModel.getInstance
};
var CoreModel_1;
//# sourceMappingURL=core.model.provider.js.map