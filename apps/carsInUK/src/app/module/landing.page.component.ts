import { Component } from '@angular/core';
import { NgClass } from '@angular/common';

import { SearchComponent } from './../component/search/search.component';

@Component({
  selector: 'landing-page-component',
  templateUrl: "./view/landingPageComponent.html"
})
export class LandingPageComponent  {
  private _layoutType:number = LANDING_LAYOUT_TYPE.COLUMNS;

  // ################################

  private _getClassForListItemPane() {
    let _css ={};
    if (this._layoutType==LANDING_LAYOUT_TYPE.COLUMNS) {
      _css['col-md-4']=true;
      _css['col-sm-4']=true;

    } else {
      _css['col-md-12']=true;
      _css['col-sm-12']=true;
    }
    return _css;
  }
  private _getClassForGMapPane() {
    let _css ={};
    if (this._layoutType==LANDING_LAYOUT_TYPE.COLUMNS) {
      _css['col-md-8']=true;
      _css['col-sm-8']=true;

    } else {
      _css['col-md-12']=true;
      _css['col-sm-12']=true;
    }
    return _css;
  }

  // ################################

  public _toggleLayout() {
    this._layoutType=(++this._layoutType)%2;
  }

}

/**
 *  the enum stating the layout type
 */
export enum LANDING_LAYOUT_TYPE {
  COLUMNS = 0,
  TILES
};

/*
// object binding between parent and child
  @Input() _ref:PlaygroundComponent;

  constructor() {
    // init
  }

  ngAfterViewInit() {
    //this._ref.changeRoutlet('testing-baby');
  }

  private pluginRequested(label:string) {
    // based on the label value, change the router-outlet to show the correct component view
    if (label == 'photo-picker') {
      this._ref.changeRoutlet(label);
    } else {
      // normally should just pass through
      this._ref.changeRoutlet(label);
    }
  }
*/
