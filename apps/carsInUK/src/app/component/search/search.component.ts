
import { Component, Input, ElementRef } from '@angular/core';
import { NgClass } from '@angular/common';

import { LandingPageComponent } from './../../module/landing.page.component';

// make jQuery "recognizable"
declare var jQuery:any;

@Component({
  selector: 'search-component',
  templateUrl: "./view/searchComponent.html"
})
export class SearchComponent  {
  @Input() _ref:LandingPageComponent;
  private _showSimpleSearch:boolean = true;
  private _uiInited:boolean = false;
  private _isFirstSearchToggle:boolean = true;

  constructor(private _el:ElementRef) {
    // ctor. Init anything when necessary

    // TODO: destroy / remove element / component on the fly
    // elementRef.nativeElement.querySelector('some-elem').destroy();
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

}
/*
$(function () {
  $('[data-toggle="tooltip"]').tooltip({
    container: 'body'
  })
})
*/
