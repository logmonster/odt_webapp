import { Component, ElementRef } from '@angular/core';
import { NgClass } from '@angular/common';

import { SearchComponent } from './../component/search/search.component';

// get a reference to google apis (e.g. places, maps)
declare var google:any;
declare var jQuery:any;

@Component({
  selector: 'landing-page-component',
  templateUrl: "./view/landingPageComponent.html"
})
export class LandingPageComponent  {
  private _layoutType:number = LANDING_LAYOUT_TYPE.COLUMNS;
  private _mapInited:boolean = false;
  private _gmap:any;
  private _gmarkers:any = [];

  // constructor
  constructor(private _el:ElementRef) {}

  ngAfterContentChecked() {
    if (!this._mapInited) {
      this._mapInited=true;
      // init gmap
      this._initGMap();
    }
  }

  private _initGMap() {
    // clear div contents first
    jQuery(this._el.nativeElement.querySelector('#gMap')).empty();

    // a slight debounce is required so that the original map contents are removed by jQuery first
    // seems like if gmap instance already there, gmap would not be "re-created" even you call the new Map() api
    let _me = this;
    setTimeout(function() {
      _me._gmarkers=[];
      _me._gmap = new google.maps.Map(
        _me._el.nativeElement.querySelector('#gMap'),
        {
          zoom: 3,
          center: { lat: 55.0516877, lng: 3.4360 }
        }
      );
      // add marker (center of UK...)
      _me._gmarkers.push(new google.maps.Marker({
        position: new google.maps.LatLng(55.0516877, -4.401611),
        title: 'United Kingdom',
        map: _me._gmap
      }));
    }, 100);
  }

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
    // re-init the gmap (since the size of the div already changed, avoid visual flaws)
    this._initGMap();
  }

}

/**
 *  the enum stating the layout type
 */
export enum LANDING_LAYOUT_TYPE {
  COLUMNS = 0,
  TILES
};
