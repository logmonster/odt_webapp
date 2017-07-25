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
var SuggestiveTextInputComponent = (function () {
    function SuggestiveTextInputComponent() {
        // ######################
        this._options = [];
        this._selectedSuggestion = -1;
        console.log('suggestive-text-input');
    }
    // ######################
    /**
     *  keyup handler => calling the correct handler based on the injected
     *    "_delegate" object
     */
    SuggestiveTextInputComponent.prototype._keyUpHandler = function (_event) {
        if (this._delegate &&
            this._delegate['_ref'] &&
            this._delegate['keyUpHandler']) {
            this._delegate['_ref'][(this._delegate['keyUpHandler'])](_event, this, this.updateUIWithSuggestions);
        }
        else {
            console.log('*** should not happen');
        }
    };
    SuggestiveTextInputComponent.prototype._getSearchSuggestionContainerClass = function () {
        if (this._options && this._options.length > 0) {
            return {
                search_suggestion_container: true,
                showing: true,
                hiding: false
            };
        }
        else {
            return {
                search_suggestion_container: true,
                showing: false,
                hiding: true
            };
        }
    };
    SuggestiveTextInputComponent.prototype._getSearchSuggestionItemClass = function () {
        return {
            search_suggestion_item: true
        };
    };
    /**
     *  ui callback for updating the UI with suggestions queried
     */
    SuggestiveTextInputComponent.prototype.updateUIWithSuggestions = function (_optionsList, _callerRef) {
        if (_optionsList && _optionsList.length > 0) {
            // show the suggestive container + reset the selectedSuggestion variable
            _callerRef._options = _optionsList;
            _callerRef._selectedSuggestion = -1;
        }
        else {
            // hide the suggestive container
            _callerRef._options = [];
        }
    };
    return SuggestiveTextInputComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], SuggestiveTextInputComponent.prototype, "_delegate", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], SuggestiveTextInputComponent.prototype, "_placeholder", void 0);
SuggestiveTextInputComponent = __decorate([
    core_1.Component({
        selector: 'suggestive-text-input',
        templateUrl: "./view/suggestiveTextInputComponent.html"
    }),
    __metadata("design:paramtypes", [])
], SuggestiveTextInputComponent);
exports.SuggestiveTextInputComponent = SuggestiveTextInputComponent;
//# sourceMappingURL=suggestive.text.input.component.js.map