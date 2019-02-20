import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Alert } from 'ionic-angular';
import { Vibration } from '@ionic-native/vibration';

import { Carro } from '../../modelos/carro';
import { HomePage } from '../home/home';
import { Agendamento } from '../../modelos/agendamento';

import { AgendamentosServiceProvider } from '../../providers/agendamentos-service/agendamentos-service';
import { AgendamentoDaoProvider } from '../../providers/agendamento-dao/agendamento-dao';
import { DatePicker } from '@ionic-native/date-picker';

@IonicPage()
@Component({
  selector: 'page-cadastro',
  templateUrl: 'cadastro.html',
})
export class CadastroPage {

  public carro: Carro;
  public precoTotal: number;

  public nome: string = '';
  public endereco: string = '';
  public email: string = '';
  public data: string = new Date().toISOString();

  private _alerta: Alert;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _agendamentosService: AgendamentosServiceProvider,
    private _alertCtrl: AlertController,
    private _agendamentoDao: AgendamentoDaoProvider,
    private _vibration: Vibration,
    private _datePicker: DatePicker
  ) {
    this.carro = this.navParams.get('carroSelecionado');
    this.precoTotal = this.navParams.get('precoTotal');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CadastroPage');
  }

  agendar() {
    if (!this.nome || !this.endereco || !this.email) {
      this._vibration.vibrate(500);

      this._alertCtrl.create({
        title: 'Preenchimento obrigatório',
        subTitle: 'Preencha todos os campos!',
        buttons: [{
          text: 'OK'
        }]
      }).present();

      return;
    }
    const agendamento: Agendamento = {
      nomeCliente: this.nome,
      enderecoCliente: this.endereco,
      emailCliente: this.email,
      modeloCarro: this.carro.nome,
      precoTotal: this.precoTotal,
      confirmado: false,
      enviado: false,
      data: this.data
    };

    this._alerta = this._alertCtrl.create({
      title: 'Aviso',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.navCtrl.setRoot(HomePage);
          }
        }
      ]
    });

    let mensagem = '';

    this._agendamentoDao.ehDuplicado(agendamento)
      .mergeMap(ehDuplicado => {
        if (ehDuplicado) {
          throw new Error('Agendamento existente!');
        }
        return this._agendamentosService.agendar(agendamento);
      })
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
        res => mensagem = 'Agendamento realizado!',
        (err: Error) => mensagem = err.message
      );
  }

  selecionaData(): void {
    this._datePicker.show({
      date: new Date(),
      mode: 'date'
    }).then((data: Date) => this.data = data.toISOString());
  }
}
