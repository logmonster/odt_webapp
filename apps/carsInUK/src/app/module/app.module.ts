import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { LandingPageComponent }  from './landing.page.component';
import { SearchComponent } from './../component/search/search.component';
import { SuggestiveTextInputComponent } from './../component/search/suggestive.text.input.component';
import { ItemListComponent } from './../component/item/item.list.component';
import { ItemCardComponent } from './../component/item/item.card.component';

import { QueryDlgComponent } from './../component/dlg/query.dlg.component';
import { ESearchProvider } from './../core/esearch.provider';
import { CoreModelProvider } from './../core/core.model.provider';


@NgModule({
  imports:      [ BrowserModule, FormsModule ],
  declarations: [
    LandingPageComponent,
    SearchComponent, SuggestiveTextInputComponent,
    ItemListComponent, ItemCardComponent,
    QueryDlgComponent
  ],
  providers: [
    ESearchProvider,
    CoreModelProvider
  ],
  bootstrap:    [ LandingPageComponent ]
})
export class AppModule { }
