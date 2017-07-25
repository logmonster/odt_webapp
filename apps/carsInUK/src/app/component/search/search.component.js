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
var esearch_provider_1 = require("./../../core/esearch.provider");
var SearchComponent = (function () {
    // * ctor
    function SearchComponent(_el, _es) {
        this._el = _el;
        this._es = _es;
        this._showSimpleSearch = true;
        this._uiInited = false;
        this._isFirstSearchToggle = true;
        // form-binding related variables
        this._suggestionOnBasicSearch = '';
        this._meRef = this;
        // * delegate object for the suggestive.text.input.component to invoke
        this._searchBarSimpleDelegate = {};
        // init the _delegate for simple and adv search
        this._searchBarSimpleDelegate = {
            _ref: this,
            keyUpHandler: 'getSuggestionOnBasicSearch',
            ngModelField: '_suggestionOnBasicSearch',
            placeholder: 'type in a car model here...',
            styles: {
                'border-radius': '4px',
                'padding-left': '20px',
                'padding-right': '20px',
                'margin-bottom': '0px'
            }
        };
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
    // ####################
    SearchComponent.prototype.getSuggestionOnBasicSearch = function (_event, _callerRef, _uiCallback) {
        if (_event['key'].length != 1 &&
            (_event['code'].toLowerCase() != 'backspace' &&
                _event['code'].toLowerCase() != 'delete')) {
            // TODO: check for "arrow keys" or "enter" CODE
            console.log('#' + _event['code'] + '$');
        }
        else {
            // * handle alpha-numeric keys + backspace
            var _prefix = this._suggestionOnBasicSearch;
            this._es.getClient().suggest({
                index: 'odt_vehicle_suggestor',
                body: {
                    "1": {
                        "prefix": _prefix,
                        "completion": {
                            "field": "suggest_model",
                            "size": 5
                        }
                    }
                }
            }).then(function (_body) {
                var _options = _body['1'][0]['options'];
                //console.log(_options);
                //console.log(_options.length);
                if (_uiCallback) {
                    _uiCallback(_options, _callerRef);
                }
                else {
                    console.log('### sth wrong, _uiCallback is null');
                }
            }, function (_err) {
                console.log('*** ERR');
                console.log(_err.message);
            });
        }
        /*
        console.log(_event);
        chrome, safari, firefox => code => Enter, ArrowUp, ArrowDown, ArrowRight, ArrowLeft
    
        KeyboardEvent: key: "a" code: "KeyA", location: index_of_character_inTheTextInput
        if special keys...
          key: "Meta", code: "MetaLeft" "ShiftLeft", location: n
    
        PS. if key != a_singular_character... it could be a special key (e.g. meta, shift, alt)
        */
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
        templateUrl: "./view/searchComponent.html",
        providers: [
            esearch_provider_1.ESearchProvider
        ]
    }),
    __metadata("design:paramtypes", [core_1.ElementRef, esearch_provider_1.ESearch])
], SearchComponent);
exports.SearchComponent = SearchComponent;
//# sourceMappingURL=search.component.js.map