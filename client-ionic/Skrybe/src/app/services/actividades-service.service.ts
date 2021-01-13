import { Injectable } from '@angular/core';
import { AuthenticationService } from './../services/authentication.service';

import { UrlServidorService } from './url-servidor.service';

@Injectable({
  providedIn: 'root'
})
export class ActividadesServiceService {

    constructor(private authService: AuthenticationService,
        private urlServidorSerice:UrlServidorService) { }

    async getActividad(idActividad):Promise<any>{
        const token = await this.authService.getToken();

       return fetch(this.urlServidorSerice.getUrlBase()+"api/actividades/"+idActividad,
            {
                method: 'get',
                headers: {
                    'Authorization':'Bearer '+token 
                }
            })
        .then(resp => resp.json())
    }




    async actividadesFollow():Promise<any>{
        const token = await this.authService.getToken();

        return fetch(this.urlServidorSerice.getUrlBase()+"api/actividades/follow",
            {
                method: 'get',
                headers: {
                    'Authorization':'Bearer '+token 
                }
            })
        .then(resp => resp.json());
        
     }


    async actividadesPropias ():Promise<any>{
        const token = await this.authService.getToken();

        return fetch(this.urlServidorSerice.getUrlBase()+"api/actividades",
            {
                method: 'get',
                headers: {
                    'Authorization':'Bearer '+token 
                }
            })
        .then(resp => resp.json());
    }




}
