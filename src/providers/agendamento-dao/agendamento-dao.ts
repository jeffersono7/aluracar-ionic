import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

import { Agendamento } from '../../modelos/agendamento';

@Injectable()
export class AgendamentoDaoProvider {

  constructor(private _storage: Storage) {
  }

  private _geraChave(agendamento: Agendamento) {
    const chave = agendamento.emailCliente +
      agendamento.data.substr(0, 10);
    return chave;
  }

  salvar(agendamento: Agendamento) {
    const chave = this._geraChave(agendamento);
    const promise = this._storage.set(chave, agendamento);

    return Observable.fromPromise(promise);
  }

  ehDuplicado(agendamento: Agendamento): Observable<boolean> {
    const chave = this._geraChave(agendamento);
    const promise = this._storage.get(chave)
      .then(data => data ? true : false);

    return Observable.fromPromise(promise);
  }

  listarTodos() {
    let agendamentos: Agendamento[] = [];

    const promise = this._storage.forEach((agendamento: Agendamento) => {
      agendamentos.push(agendamento);
    })
    .then(() => agendamentos);

    return Observable.fromPromise(promise);
  }
}
