import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AgendamentoDaoProvider } from '../../providers/agendamento-dao/agendamento-dao';
import { Agendamento } from '../../modelos/agendamento';
import { AgendamentosServiceProvider } from '../../providers/agendamentos-service/agendamentos-service';

/**
 * Generated class for the ListaAgendamentosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-lista-agendamentos',
  templateUrl: 'lista-agendamentos.html',
})
export class ListaAgendamentosPage {

  agendamentos: Agendamento[];
  private _alerta;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _agendamentoDao: AgendamentoDaoProvider,
    private _alertCtrl: AlertController,
    private _agendamentosService: AgendamentosServiceProvider
  ) {
  }

  ionViewDidLoad() {
    this._agendamentoDao.listarTodos()
      .subscribe((agendamentos: Agendamento[]) => this.agendamentos = agendamentos);
  }

  reenviar(agendamento: Agendamento) {
    this._alerta = this._alertCtrl.create({
      title: 'Aviso',
      buttons: [
        {
          text: 'OK',
        }
      ]
    });

    let mensagem = '';

    return this._agendamentosService.agendar(agendamento)
      .mergeMap((valor) => {

        const observable = this._agendamentoDao.salvar(agendamento);

        if (valor instanceof Error) {
          throw valor;
        }
        return observable;
      })
      .finally(() => {
        this._alerta.setSubTitle(mensagem).present();
      })
      .subscribe(
        res => mensagem = 'Agendamento reenviado!',
        (err: Error) => mensagem = err.message
      );
  }
}
