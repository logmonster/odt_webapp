import { Component, Input, ElementRef } from '@angular/core';
import { NgClass, NgStyle, NgForOf } from '@angular/common';

//import { SearchComponent } from './search.component';

// make jQuery "recognizable"
declare var jQuery:any;

@Component({
  selector: 'suggestive-text-input',
  templateUrl: "./view/suggestiveTextInputComponent.html"
})
export class SuggestiveTextInputComponent  {
  @Input() _delegate:any;
  @Input() _placeholder:string;

  constructor() {
    console.log('suggestive-text-input');

  }

  // ######################

  /**
   *  keyup handler => calling the correct handler based on the injected
   *    "_delegate" object
   */
  private _keyUpHandler(_event:any) {
    if (this._delegate &&
      this._delegate['_ref'] &&
      this._delegate['keyUpHandler']) {

      this._delegate['_ref'][(this._delegate['keyUpHandler'])](_event, this, this.updateUIWithSuggestions);
    } else {
      console.log('*** should not happen');
    }
  }

  private _getSearchSuggestionContainerClass() {
    if (this._options && this._options.length>0) {
      return {
        search_suggestion_container: true,
        showing: true,
        hiding: false
      };
    } else {
      return {
        search_suggestion_container: true,
        showing: false,
        hiding: true
      };
    }
  }

  private _getSearchSuggestionItemClass() {
    return {
      search_suggestion_item: true
    };
  }


  // ######################

  private _options:any = [];
  private _selectedSuggestion:number = -1;

  /**
   *  ui callback for updating the UI with suggestions queried
   */
  public updateUIWithSuggestions(_optionsList:any, _callerRef:any) {
    if (_optionsList && _optionsList.length>0) {
      // show the suggestive container + reset the selectedSuggestion variable
      _callerRef._options=_optionsList;
      _callerRef._selectedSuggestion=-1;

    } else {
      // hide the suggestive container
      _callerRef._options=[];
    }
  }

  // ######################
}
