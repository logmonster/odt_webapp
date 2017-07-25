
import { Component, Input, ElementRef } from '@angular/core';
import { NgModel } from '@angular/forms';
import { NgClass } from '@angular/common';

import { SuggestiveTextInputComponent } from './suggestive.text.input.component';
import { LandingPageComponent } from './../../module/landing.page.component';
import { ESearch, ESearchProvider } from './../../core/esearch.provider';

// make jQuery "recognizable"
declare var jQuery:any;

@Component({
  selector: 'search-component',
  templateUrl: "./view/searchComponent.html",
  providers: [
    ESearchProvider
  ]
})
export class SearchComponent  {
  @Input() _ref:LandingPageComponent;
  private _showSimpleSearch:boolean = true;
  private _uiInited:boolean = false;
  private _isFirstSearchToggle:boolean = true;

  // form-binding related variables
  private _suggestionOnBasicSearch:string = '';

  private _meRef:SearchComponent = this;

  // * delegate object for the suggestive.text.input.component to invoke
  private _searchBarSimpleDelegate={};

  // * ctor
  constructor(private _el:ElementRef, private _es:ESearch) {
    // init the _delegate for simple and adv search
    this._searchBarSimpleDelegate={
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

  ngAfterContentChecked() {
    // do sth if necessary after state change in the component
    if (this._uiInited==false) {
      jQuery('[data-toggle="tooltip"]').tooltip({
        container: 'body'
      });
      this._uiInited=true;
    }
  }

  // ####################

  private toggleLayout() {
    this._ref._toggleLayout();
  }

  // ####################

  private _getClassForSearchDiv() {
    return {
      'align-middle': true,
      'flex-center': this._showSimpleSearch,
      'search_bar_simple_outer_container': true,
      'animated': true,
      'fadeInUp': true,
      showing: this._showSimpleSearch,
      hiding: !this._showSimpleSearch
    };
  }
  private _getClassForAdvSearchDiv() {
    return {
      'align-middle': true,
      'flex-center': !this._showSimpleSearch,
      'animated': true,
      'fadeInDown': true,
      showing: !this._showSimpleSearch,
      hiding: this._showSimpleSearch
    };
  }

  // toggle the _showSimpleSearch variable and hence toggle which pane to show
  protected toggleSearchPane() {
    this._showSimpleSearch=!this._showSimpleSearch;
  }

  // ####################

  protected getSuggestionOnBasicSearch(_event:any, _callerRef:any, _uiCallback:any) {
    // * handle alpha-numeric keys + backspace
    let _prefix = this._suggestionOnBasicSearch;

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
    }).then(function(_body:any) {
      let _options=_body['1'][0]['options'];
      //console.log(_options);
      //console.log(_options.length);
      if (_uiCallback) {
        _uiCallback(_options, _callerRef);
      } else {
        console.log('### sth wrong, _uiCallback is null');
      }

    }, function(_err:any) {
      console.log('*** ERR');
      console.log(_err.message);
    });
    /*
    console.log(_event);
    chrome, safari, firefox => code => Enter, ArrowUp, ArrowDown, ArrowRight, ArrowLeft

    KeyboardEvent: key: "a" code: "KeyA", location: index_of_character_inTheTextInput
    if special keys...
      key: "Meta", code: "MetaLeft" "ShiftLeft", location: n

    PS. if key != a_singular_character... it could be a special key (e.g. meta, shift, alt)
    */
  }

}
