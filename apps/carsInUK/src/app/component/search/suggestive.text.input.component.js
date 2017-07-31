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
        //private _options:any = [];
        this._selectedSuggestion = -1;
        //console.log('suggestive-text-input');
    }
    // ######################
    /**
     *  item-click on a particular suggestion item
     *  1. update the _selectedSuggestion index (affect css)
     *  2. update the ngModel corresponding value
     *  3. set focus on the textInput
     */
    SuggestiveTextInputComponent.prototype._suggestionClickHandler = function (_idx) {
        if (_idx && this._selectedSuggestion != _idx) {
            var _options = this._delegate['_ref'][this._delegate['suggestionOptions']];
            this._selectedSuggestion = _idx;
            // update the textInput value too...
            this._delegate["_ref"][(this._delegate["ngModelField"])] = _options[_idx]['text'];
            //this._options[_idx]['text'];
            jQuery('#s_t_i_c_main').focus();
        }
    };
    /**
     *  keyup handler => calling the correct handler based on the injected
     *    "_delegate" object
     */
    SuggestiveTextInputComponent.prototype._keyUpHandler = function (_event) {
        if (_event['key'].length == 1 ||
            _event['code'].toLowerCase() == 'backspace' ||
            _event['code'].toLowerCase() == 'delete') {
            this._delegate['_ref'][(this._delegate['keyUpHandler'])](_event, this, this.updateUIWithSuggestions);
        }
        else {
            // check for arrow keys (up or down ONLY)
            var _kcode = _event['code'].toLowerCase();
            var _idxUpdated = false;
            var _options = this._delegate['_ref'][this._delegate['suggestionOptions']];
            if (_kcode == 'arrowup') {
                if (this._selectedSuggestion >= 1) {
                    this._selectedSuggestion -= 1;
                    _idxUpdated = true;
                }
            }
            else if (_kcode == 'arrowdown') {
                if (_options && _options.length > (this._selectedSuggestion + 1)) {
                    this._selectedSuggestion += 1;
                    this._delegate['placeholder'] = _options[this._selectedSuggestion]['text'];
                    _idxUpdated = true;
                }
            }
            if (_idxUpdated) {
                this._delegate["_ref"][(this._delegate["ngModelField"])] =
                    _options[this._selectedSuggestion]['text'];
            }
            if (_kcode == 'enter' || _kcode == 'return') {
                // no more suggestions, as user confirmed the value
                //this._options=[];
                this._delegate['_ref'][this._delegate['suggestionOptions']] = [];
                // do another callback based on search based on the text (it is necessary as we only return top 5 suggestions... there might be alot of entries matching the given prefix)
                this._delegate['_ref'][(this._delegate['keyEnterHandler'])]();
            }
        }
        /*
        if (this._delegate &&
          this._delegate['_ref'] &&
          this._delegate['keyUpHandler']) {
    
          this._delegate['_ref'][(this._delegate['keyUpHandler'])](_event, this, this.updateUIWithSuggestions);
        } else {
          console.log('*** should not happen');
        }
        */
    };
    SuggestiveTextInputComponent.prototype._getSearchSuggestionContainerClass = function () {
        var _options = this._delegate['_ref'][this._delegate['suggestionOptions']];
        if (_options && _options.length > 0) {
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
    SuggestiveTextInputComponent.prototype._getSearchSuggestionItemClass = function (_idx) {
        return {
            search_suggestion_item: true,
            search_suggestion_item_selected: (_idx == this._selectedSuggestion) ? true : false,
            pointer: true
        };
    };
    /**
     *  ui callback for updating the UI with suggestions queried
     */
    SuggestiveTextInputComponent.prototype.updateUIWithSuggestions = function (_optionsList, _callerRef) {
        if (_optionsList && _optionsList.length > 0) {
            // show the suggestive container + reset the selectedSuggestion variable
            //_callerRef._options=_optionsList;
            _callerRef._delegate['_ref'][(_callerRef._delegate['suggestionOptions'])] = _optionsList;
            _callerRef._selectedSuggestion = -1;
        }
        else {
            // hide the suggestive container
            //_callerRef._options=[];
            _callerRef._delegate['_ref'][(_callerRef._delegate['suggestionOptions'])] = [];
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