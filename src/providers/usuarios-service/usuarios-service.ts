import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../../modelos/usuario';
import { Observable } from 'rxjs/Observable';
import { ApiProvider } from '../api/api';

const CHAVE = 'avatar-usuario';

@Injectable()
export class UsuariosServiceProvider {

  private _usuarioLogado: Usuario;

  constructor(private _http: HttpClient, private _api: ApiProvider) {

  }

  efetuaLogin(email: string, senha: string): Observable<Usuario> {
    return this._http.post<Usuario>(`${this._api.url}/api/login`, { email, senha })
      .do((usuario: Usuario) => this._usuarioLogado = usuario);
  }

  obtemUsuarioLogado() {
    return this._usuarioLogado;
  }

  salvaAvatar(avatar) {
    localStorage.setItem(CHAVE, avatar);
  }

  obtemAvatar() {
    return localStorage.getItem(CHAVE) ?
      localStorage.getItem(CHAVE) : 'assets/img/avatar-padrao.jpg';
  }
}
