import { Component } from '@angular/core';
import { AuthenticationService } from './../services/authentication.service';
import { UsuariosService } from '../services/usuarios.service';
import { Router } from '@angular/router';

import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

    usuariosSiguiendo = [];
    usuariosFollowers = [];

    miUsuario;

    constructor(private authService: AuthenticationService,
        private router: Router,
        private usuariosService: UsuariosService,
        private toastController: ToastController) {
        
    }
 

    async ngOnInit() { 
        
    }

    async ionViewDidEnter() { 
        await this.recargarInfo();
    }
    private async recargarInfo() {
        this.miUsuario = await this.usuariosService.getMiUsuario();
        this.miUsuario.imagen = this.avatarIdenticon(this.miUsuario);
        this.usuariosSiguiendo = [];

        let usuariosAux = await this.usuariosService.getFollow();

        for (let usuario of usuariosAux) {
            usuario.imagen = this.avatarIdenticon(usuario);
            if (this.miUsuario.sigue.includes(usuario._id)) {
                usuario.siguiendo = true;
            }
            //Elimino mi propio usuario:
            if (usuario._id !== this.miUsuario._id) {
                this.usuariosSiguiendo.push(usuario);
            }
        }

        usuariosAux = await this.usuariosService.getFollowers();
        this.usuariosFollowers = []
        for (let usuario of usuariosAux) {
            usuario.imagen = this.avatarIdenticon(usuario);
            if (this.miUsuario.sigue.includes(usuario._id)) {
                usuario.siguiendo = true;
            }
            //Elimino mi propio usuario:
            if (usuario._id !== this.miUsuario._id) {
                this.usuariosFollowers.push(usuario);
            }
        }
    }

    avatarIdenticon(usuario){
        return "https://identicon-api.herokuapp.com/"+usuario._id+"/150?format=png";
    }

    

    async logout() {
      await this.authService.logout();
      this.router.navigateByUrl('/login', { replaceUrl: true });
    }

}
