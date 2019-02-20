import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Carro } from '../../modelos/carro';
import { Observable } from 'rxjs/Observable';
import { ApiProvider } from '../api/api';

@Injectable()
export class CarrosServiceProvider {

  constructor(private http: HttpClient, private _api: ApiProvider) {
  }

  listar(): Observable<Carro[]> {
    return this.http.get<Carro[]>(`${this._api.url}/api/carro/listaTodos`);
  }
}
