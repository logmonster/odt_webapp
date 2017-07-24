import { Component, Input } from '@angular/core';
//import { NgClass } from '@angular/common';

import { ItemListComponent } from './item.list.component';

// make jQuery "recognizable"
//declare var jQuery:any;

/**
 *  design issues:
 *    ItemCardComponent SHOULD-NOT have direct access / interaction with
 *    LandingPageComponent. Since ItemCardComponent is a child of ItemListComponent,
 *    it should only have the knowledge about ItemListComponent and hence any
 *    interaction involving the LandingPageComponent should be handled by
 *    the direct parent ItemListComponent.
 *
 *    PS. This design makes sense if you would want to re-use either the
 *    ItemListComponent OR the ItemCardComponent for another project.
 */
@Component({
  selector: 'item-card-component',
  templateUrl: "./view/itemCardComponent.html"
})
export class ItemCardComponent  {
  @Input() _ref:ItemListComponent;

  constructor() {
    // ctor. Init anything when necessary
  }

  ngAfterContentChecked() {}
  

}
