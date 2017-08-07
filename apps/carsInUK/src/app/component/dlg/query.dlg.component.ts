import { Component, Input } from '@angular/core';

import { CoreModel, CoreModelProvider } from './../../core/core.model.provider';

// make jQuery "recognizable"
//declare var jQuery:any;

/**
 *  design issues:
 *    ...
 */
@Component({
  selector: 'query-dlg-component',
  templateUrl: "./view/queryDlgComponent.html",
  providers: [
    CoreModelProvider
  ]
})
export class QueryDlgComponent  {
  //@Input() _ref:ItemListComponent;

  public static KEY_TITLE:string = "KEY_TITLE";
  public static KEY_CONTENT:string = "KEY_CONTENT";

  constructor(private _coreModel:CoreModel) {
    // ctor. Init anything when necessary
  }


  /**
   *  method to show the dlg with the given contents
   */
  private _getDlgTitle() {
    if (this._coreModel) {
      // title
      let _title = this._coreModel.getDataByKey(QueryDlgComponent.KEY_TITLE);
      if (_title) {
        return _title;
      }
    }
    return "title";
  }

  private _getDlgContent() {
    if (this._coreModel) {
      // contents
      let _contents = this._coreModel.getDataByKey(QueryDlgComponent.KEY_CONTENT);
      console.log(_contents);
    }
  }

  private _copyQueryToClipboard() {
    console.log('called copyQueryToClipboard');
  }

}
