import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, normalizeURL, AlertController } from 'ionic-angular';
import { UsuariosServiceProvider } from '../../providers/usuarios-service/usuarios-service';
import { Usuario } from '../../modelos/usuario';
import { Camera } from '@ionic-native/camera';

@IonicPage()
@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})
export class PerfilPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _usuariosService: UsuariosServiceProvider,
    private _camera: Camera,
    private _alertCtrl: AlertController
  ) {
  }

  tiraFoto(): void {
    this._camera.getPicture({
      destinationType: this._camera.DestinationType.FILE_URI,
      saveToPhotoAlbum: true,
      correctOrientation: true,
      allowEdit: false,
      mediaType: this._camera.MediaType.PICTURE
    }).then(fotoUri => {
      fotoUri = normalizeURL(fotoUri);
      this._usuariosService.salvaAvatar(fotoUri);
      this._alertCtrl.create({
        message: 'Foto salva com sucesso!'
      }).present();
    }).catch(err => {
      alert(err);
      this._alertCtrl.create({
        message: 'Erro ao salvar foto!',
        subTitle: err
      }).present()
    });
  }

  get avatar() {
    return this._usuariosService.obtemAvatar();
  }

  get usuarioLogado(): Usuario {
    return this._usuariosService.obtemUsuarioLogado();
  }

}
