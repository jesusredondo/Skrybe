import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';

import { Plugins } from '@capacitor/core';

const { Storage } = Plugins;

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {

    credentialsNewUser: FormGroup;
 
    constructor(
        private fb: FormBuilder,
        private authService: AuthenticationService,
        private alertController: AlertController,
        private router: Router,
        private loadingController: LoadingController
    ) {}
   
    ngOnInit() {
        this.credentialsNewUser = this.fb.group({
            nombre: ['aaa', [Validators.required,Validators.minLength(3)]], //TODO: Revisar las validaciones
            apellidos: ['aaa', [Validators.required,Validators.minLength(3)]],
            email: ['aaa@aaa.es', [Validators.required, Validators.email]],
            password: ['password', [Validators.required, Validators.minLength(6)]],
        });
    }
   
    async signin() {
        const loading = await this.loadingController.create();
        await loading.present();
        
        const resultadoSignin = await this.authService.signinPromise(this.credentialsNewUser.value);
        await loading.dismiss();
        console.log(resultadoSignin);
        if (resultadoSignin.error){ //Si sigin erróneo --> Mensaje
            const mensajeError = resultadoSignin.error.details ? resultadoSignin.error.details[0].message : resultadoSignin.error;
            const alert = await this.alertController.create({
                header: 'Signin incorrecto',
                message: mensajeError, //OJO: Aquí mostramos el mensaje que nos valida Joi en el server.
                buttons: ['OK'],
                });
            await alert.present();
        }else{ //Si signin correcto -->
            //Avisamos al usuario
            const alert = await this.alertController.create({
                header: 'Signin correcto',
                message: resultadoSignin.error,
                buttons: ['OK'],
                });
            //Redireccionamos.
            alert.onDidDismiss().then(
                ()=>{
                    this.router.navigateByUrl('/login', { replaceUrl: true });
                }
            );
                
            
                await alert.present();
            
            
            
        }
    }



   
    // Easy access for form fields

    get nombre() {
        return this.credentialsNewUser.get('nombre');
    }
    
    get apellidos() {
        return this.credentialsNewUser.get('apellidos');
    }

    get email() {
        return this.credentialsNewUser.get('email');
    }
    
    get password() {
        return this.credentialsNewUser.get('password');
    }

}
