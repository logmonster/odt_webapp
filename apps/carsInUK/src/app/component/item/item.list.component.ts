import { Component, Input } from '@angular/core';
//import { NgClass } from '@angular/common';

import { LandingPageComponent } from './../../module/landing.page.component';
import { ItemCardComponent } from './item.card.component';

// make jQuery "recognizable"
//declare var jQuery:any;

@Component({
  selector: 'item-list-component',
  templateUrl: "./view/itemListComponent.html"
})
export class ItemListComponent  {
  @Input() _ref:LandingPageComponent;

  constructor() {
    // ctor. Init anything when necessary

// TODO: destroy / remove element / component on the fly
    // elementRef.nativeElement.querySelector('some-elem').destroy();
  }

  ngAfterContentChecked() {}

}
