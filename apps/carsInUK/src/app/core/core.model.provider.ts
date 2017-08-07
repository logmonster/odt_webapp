import { Injectable } from '@angular/core';

/**
 *  sort of like a singleton for storing information across
 *  component(s)
 */
@Injectable()
export class CoreModel {
  public static KEY_STATUS:string = "STATUS";
  public static KEY_OVERWRITE:string = "OVERWRITE";
  public static STATUS_OK:string = "OK";
  public static STATUS_FAIL:string = "FAIL";
  public static STATUS_FAIL_REASON:string = "FAIL_REASON";
  public static OVERWRITE_YES:string = "YES";
  public static OVERWRITE_NO:string = "NO";
  public static REASON_DUPLICATE_KEY:string = "key already existed, either set _canOverwrite to 'true' or use another Key value";


  private _creationTimestamp:any;
  // the actual place where dynamic data (logically grouped) could be stored
  private _fieldset:Object = {};

// *
  private static _instance:CoreModel = null;
// *
  public static getInstance(): CoreModel {
    if (CoreModel._instance == null) {
      CoreModel._instance = new CoreModel();
    }
    return CoreModel._instance;
  }

  constructor() {
    this._creationTimestamp = new Date();
  }

  public getCreationTimestamp() {
    return this._creationTimestamp;
  }

  /**
   *  set / add data based on the key value; can set _canOverwrite to true
   *  if needed to overwrite existing data
   */
  public setDataByKey(_key:string, _data:any, _canOverwrite:boolean) {
    // check if _key exists
    let _keyExists:boolean = this._fieldset.hasOwnProperty(_key);
    let _ret = {};

    _ret[CoreModel.KEY_STATUS] = CoreModel.STATUS_OK;
    if (!_keyExists) {
      this._fieldset[_key] = _data;

    } else if (_canOverwrite==true) {
      this._fieldset[_key] = _data;
      _ret[CoreModel.KEY_OVERWRITE] = CoreModel.OVERWRITE_YES;

    } else {
      _ret[CoreModel.KEY_STATUS] = CoreModel.STATUS_FAIL;
      _ret[CoreModel.STATUS_FAIL_REASON] = CoreModel.REASON_DUPLICATE_KEY;
    }
    return _ret;
  }

  /**
   *  get the value / data based on the key
   */
  public getDataByKey(_key:string) {
    return this._fieldset[_key];
  }
  /**
   *  get all the keys available (each key holds associated values)
   */
  public getFieldSetKeys() {
    return Object.keys(this._fieldset);
  }

  /**
   *  remove the value under the given key
   */
  public removeDataByKey(_key:string) {
    delete this._fieldset[_key];
  }
}

/**
 *  provider:
 *    return the singleton instance of CoreModel
 */
export let CoreModelProvider = {
  provide: CoreModel,
  useFactory: CoreModel.getInstance
};
