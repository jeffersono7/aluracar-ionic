import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { ApiProvider } from '../api/api';

@Injectable()
export class AgendamentosServiceProvider {

  constructor(private _http: HttpClient, private _api: ApiProvider) {
  }

  agendar(agendamento) {
    return this._http.post(`${this._api.url}/api/agendamento/agenda`, agendamento)
    .do(() => agendamento.enviado = true)
    .catch((err) => Observable.of(new Error('Falha no agendamento! Tente novamente mais tarde!')));
  }
}
