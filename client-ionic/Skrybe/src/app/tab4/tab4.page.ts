import { Component } from '@angular/core';
import { UsuariosService } from '../services/usuarios.service';
import { Router } from '@angular/router';

import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss']
})
export class Tab4Page {

    usuarios = [];

    miUsuario;

    constructor(private usuariosService: UsuariosService,
        private toastController: ToastController) {}
 
    async ngOnInit() { 
        this.miUsuario = await this.usuariosService.getMiUsuario();

        let usuariosAux = await this.usuariosService.getTodosUsuarios();
        

        for(let usuario of usuariosAux){
            usuario.imagen = this.avatarIdenticon(usuario);
            if(this.miUsuario.sigue.includes(usuario._id)){
                usuario.siguiendo = true;
            }

            //Elimino mi propio usuario:
            if(usuario._id !== this.miUsuario._id){
                this.usuarios.push(usuario);
            }
            
        }
        
        console.log("USUARIOS!");
        console.log(this.usuarios);
    }

    avatarIdenticon(usuario){
        return "https://identicon-api.herokuapp.com/"+usuario._id+"/150?format=png";
    }


    async empezarSeguir(usuarioSeleccionado){
        await this.usuariosService.seguirUsuario(usuarioSeleccionado._id);
        //Mostramos el toast
        const toast = await this.toastController.create({
            message: 'Comienzas a seguir al usuario' ,
            duration: 2000,
            position: 'top'
          });
          toast.present();
          usuarioSeleccionado.siguiendo = true;
    }

    async dejarSeguir(usuarioSeleccionado){
        await this.usuariosService.dejarSeguir(usuarioSeleccionado._id);
        //Mostramos el toast
        const toast = await this.toastController.create({
            message: 'Dejas de seguir al usuario' ,
            duration: 2000,
            position: 'top'
          });
          toast.present();
        usuarioSeleccionado.siguiendo = false;

    }

}
