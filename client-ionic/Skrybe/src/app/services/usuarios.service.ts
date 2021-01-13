import { Injectable } from '@angular/core';
import { AuthenticationService } from './../services/authentication.service';

import { UrlServidorService } from './url-servidor.service';


@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

    constructor(private authService: AuthenticationService,
        private urlServidorSerice:UrlServidorService) { }

    async getTodosUsuarios():Promise<any>{
        const token = await this.authService.getToken();

       return fetch(this.urlServidorSerice.getUrlBase()+"api/usuarios/",
            {
                method: 'get',
                headers: {
                    'Authorization':'Bearer '+token 
                }
            })
        .then(resp => resp.json());
    }

    async getFollow():Promise<any>{
        const token = await this.authService.getToken();

       return fetch(this.urlServidorSerice.getUrlBase()+"api/usuarios/follow/",
            {
                method: 'get',
                headers: {
                    'Authorization':'Bearer '+token 
                }
            })
        .then(resp => resp.json());
    }

    async getFollowers():Promise<any>{
        const token = await this.authService.getToken();

       return fetch(this.urlServidorSerice.getUrlBase()+"api/usuarios/followers",
            {
                method: 'get',
                headers: {
                    'Authorization':'Bearer '+token 
                }
            })
        .then(resp => resp.json());
    }


    async getMiUsuario():Promise<any>{
        const token = await this.authService.getToken();

       return fetch(this.urlServidorSerice.getUrlBase()+"api/usuarios/yo",
            {
                method: 'get',
                headers: {
                    'Authorization':'Bearer '+token 
                }
            })
        .then(resp => resp.json());
    }


    async seguirUsuario(idUsuario):Promise<any>{
        const token = await this.authService.getToken();

       return fetch(this.urlServidorSerice.getUrlBase()+"api/usuarios/follow/"+idUsuario,
            {
                method: 'post',
                headers: {
                    'Authorization':'Bearer '+token 
                }
            })
        .then(resp => resp.json());
    }


    async dejarSeguir(idUsuario):Promise<any>{
        const token = await this.authService.getToken();

        return fetch(this.urlServidorSerice.getUrlBase()+"api/usuarios/unfollow/"+idUsuario,
             {
                 method: 'post',
                 headers: {
                     'Authorization':'Bearer '+token 
                 }
             })
         .then(resp => resp.json());
    }
    
}
