import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';

import { Plugins } from '@capacitor/core';
import { TOKEN_KEY } from './../../services/authentication.service';

const { Storage } = Plugins;


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
    
    credentials: FormGroup;
 
    constructor(
        private fb: FormBuilder,
        private authService: AuthenticationService,
        private alertController: AlertController,
        private router: Router,
        private loadingController: LoadingController
    ) {}
   
    ngOnInit() {
        this.credentials = this.fb.group({
            email: ['redondogarciajesus@gmail.com', [Validators.required, Validators.email]],
            password: ['password', [Validators.required, Validators.minLength(6)]],
        });
    }
   
    async login() {
        const loading = await this.loadingController.create();
        await loading.present();
        
        const resultadoLogin = await this.authService.loginNoObservable(this.credentials.value);
        await loading.dismiss();
        console.log(resultadoLogin);
        if (resultadoLogin.error){ //Si login erróneo --> Mensaje
            const alert = await this.alertController.create({
                header: 'Login incorrecto',
                message: resultadoLogin.error,
                buttons: ['OK'],
                });
                await alert.present();
        }else{ //Si login correcto --> Palante
            //Guardamos el Bearer Token:
            await Storage.set({key: TOKEN_KEY, value: resultadoLogin.access_token});
            this.authService.okLoginNoObservable(); //Marcamos que estamos logueados para el futuro.
            this.router.navigateByUrl('/tabs', { replaceUrl: true });
        }
    }


    irASignin(){
        this.router.navigateByUrl('/signin', { replaceUrl: true });
    }

    verIntro(){
        this.router.navigateByUrl('/intro', { replaceUrl: true });
    }



   
    // Easy access for form fields
    get email() {
        return this.credentials.get('email');
    }
    
    get password() {
        return this.credentials.get('password');
    }

}
