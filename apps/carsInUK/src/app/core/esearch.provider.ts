
import { Injectable } from '@angular/core';

declare var jQuery:any;

/**
 *  singleton for providing elasticSearch connectivity
 */
@Injectable()
export class ESearch {
  private static _instance:ESearch = null;

  private _esclient:any;

  // ctor
  constructor() {}

  public static getInstance(): ESearch {
    if (ESearch._instance == null) {
      ESearch._instance = new ESearch();
    }
    return ESearch._instance;
  }

  /**
   *  return the only instance of es.Client
   */
  public getClient() {
    if (this._esclient==null) {
      this._esclient= new jQuery.es.Client({
        hosts: ['localhost:9200']
      });
    }
    return this._esclient;
  }

}

export let ESearchProvider = {
  provide: ESearch,
  useFactory: ESearch.getInstance
};
