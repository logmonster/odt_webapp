import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { LandingPageComponent }  from './landing.page.component';
import { SearchComponent } from './../component/search/search.component';
import { ItemListComponent } from './../component/item/item.list.component';


@NgModule({
  imports:      [ BrowserModule ],
  declarations: [
    LandingPageComponent,
    SearchComponent,
    ItemListComponent
  ],
  bootstrap:    [ LandingPageComponent ]
})
export class AppModule { }
