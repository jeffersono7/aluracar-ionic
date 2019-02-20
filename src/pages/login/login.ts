import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { UsuariosServiceProvider } from '../../providers/usuarios-service/usuarios-service';
import { Usuario } from '../../modelos/usuario';
import { Vibration } from '@ionic-native/vibration';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  email: string = 'joao@alura.com.br';
  senha: string = 'alura123';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _alertCtrl: AlertController,
    private _toastCtrl: ToastController,
    private _usuariosService: UsuariosServiceProvider,
    private _vibration: Vibration
  ) {
  }

  efetuaLogin() {
    this._usuariosService.efetuaLogin(this.email, this.senha)
      .subscribe((usuario: Usuario) => {
        this.navCtrl.setRoot(HomePage);

        this._toastCtrl.create({
          message: `Seja bem vindo ${usuario.nome}!`,
          duration: 1700,
          position: 'bottom'
        }).present();
      }, (err: Response) => {
        this._alertCtrl.create({
          title: 'Falha no login',
          subTitle: 'Email ou senha incorretos! Verifique!',
          buttons: [{ text: 'OK' }]
        }).present();
        this._vibration.vibrate([70, 10, 70, 10, 150])
      });
  }
}
