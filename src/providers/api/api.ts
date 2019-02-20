import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class ApiProvider {

  private _url = 'http://192.168.25.177:8080'

  public get url(): string {
    return this._url;
  }
}
