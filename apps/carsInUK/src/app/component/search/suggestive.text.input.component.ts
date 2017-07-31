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

  private _suggestionClickHandler(_idx) {
    if (_idx && this._selectedSuggestion != _idx) {
      this._selectedSuggestion=_idx;
      // update the textInput value too...
      this._delegate["_ref"][(this._delegate["ngModelField"])]=this._options[_idx]['text'];
      jQuery('#s_t_i_c_main').focus();
    }
  }

  /**
   *  keyup handler => calling the correct handler based on the injected
   *    "_delegate" object
   */
  private _keyUpHandler(_event:any) {
    if (_event['key'].length==1 ||
      _event['code'].toLowerCase()=='backspace' ||
      _event['code'].toLowerCase()=='delete') {

      this._delegate['_ref'][(this._delegate['keyUpHandler'])](_event, this, this.updateUIWithSuggestions);
    } else {
      // check for arrow keys (up or down ONLY)
      let _kcode=_event['code'].toLowerCase();
      let _idxUpdated:boolean = false;
      if (_kcode=='arrowup') {
        if (this._selectedSuggestion>=1) {
          this._selectedSuggestion-=1;
          _idxUpdated=true;
        }
      } else if (_kcode=='arrowdown') {
        if (this._options && this._options.length>(this._selectedSuggestion+1)) {
          this._selectedSuggestion+=1;
          this._delegate['placeholder']=this._options[this._selectedSuggestion]['text'];
          _idxUpdated=true;
        }
      }

      if (_idxUpdated) {
        this._delegate["_ref"][(this._delegate["ngModelField"])]=this._options[this._selectedSuggestion]['text'];
      }

      if (_kcode=='enter' || _kcode=='return') {
        // no more suggestions, as user confirmed the value
console.log(this._options);
        this._options=[];
// TODO: do another callback based on search based on the text (it is necessary as we only return top 5 suggestions... there might be alot of entries matching the given prefix)
// TODO: add back onclick event (for mouse instead of keyboard; then set focus back on the textInput)
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

  private _getSearchSuggestionItemClass(_idx:number) {
    return {
      search_suggestion_item: true,
      search_suggestion_item_selected: (_idx==this._selectedSuggestion)?true:false
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
