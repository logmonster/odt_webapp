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
    //console.log('suggestive-text-input');
  }

  // ######################

  /**
   *  item-click on a particular suggestion item
   *  1. update the _selectedSuggestion index (affect css)
   *  2. update the ngModel corresponding value
   *  3. set focus on the textInput
   */
  private _suggestionClickHandler(_idx:number) {
    if (_idx && this._selectedSuggestion != _idx) {
      let _options=this._delegate['_ref'][this._delegate['suggestionOptions']];

      this._selectedSuggestion=_idx;
      // update the textInput value too...
      this._delegate["_ref"][(this._delegate["ngModelField"])]=_options[_idx]['text'];
        //this._options[_idx]['text'];
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
      let _options = this._delegate['_ref'][this._delegate['suggestionOptions']];

      if (_kcode=='arrowup') {
        if (this._selectedSuggestion>=1) {
          this._selectedSuggestion-=1;
          _idxUpdated=true;
        }
      } else if (_kcode=='arrowdown') {
        if (_options && _options.length>(this._selectedSuggestion+1)) {
          this._selectedSuggestion+=1;
          this._delegate['placeholder']=_options[this._selectedSuggestion]['text'];
          _idxUpdated=true;
        }
      }

      if (_idxUpdated) {
        this._delegate["_ref"][(this._delegate["ngModelField"])]=
          _options[this._selectedSuggestion]['text'];
        //this._options[this._selectedSuggestion]['text'];
      }

      if (_kcode=='enter' || _kcode=='return') {
        // no more suggestions, as user confirmed the value
        //this._options=[];
        this._delegate['_ref'][this._delegate['suggestionOptions']]=[];
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
  }

  private _getSearchSuggestionContainerClass() {
    let _options=this._delegate['_ref'][this._delegate['suggestionOptions']];

    if (_options && _options.length>0) {
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
      search_suggestion_item_selected: (_idx==this._selectedSuggestion)?true:false,
      pointer: true
    };
  }


  // ######################

  //private _options:any = [];
  private _selectedSuggestion:number = -1;

  /**
   *  ui callback for updating the UI with suggestions queried
   */
  public updateUIWithSuggestions(_optionsList:any, _callerRef:any) {
    if (_optionsList && _optionsList.length>0) {
      // show the suggestive container + reset the selectedSuggestion variable
      //_callerRef._options=_optionsList;
      _callerRef._delegate['_ref'][(_callerRef._delegate['suggestionOptions'])]=_optionsList;
      _callerRef._selectedSuggestion=-1;

    } else {
      // hide the suggestive container
      //_callerRef._options=[];
      _callerRef._delegate['_ref'][(_callerRef._delegate['suggestionOptions'])]=[];
    }
  }

  // ######################
}
