import { Injectable } from '@angular/core';
import { AuthenticationService } from './../services/authentication.service';



@Injectable({
  providedIn: 'root'
})
export class ActividadesServiceService {

    constructor(private authService: AuthenticationService) { }

    async getActividad(idActividad):Promise<any>{
        const token = await this.authService.getToken();

       return fetch("http://localhost:3000/api/actividades/"+idActividad,
            {
                method: 'get',
                headers: {
                    'Authorization':'Bearer '+token 
                }
            })
        .then(resp => resp.json())
    }




    async actividadesMias():Promise<any>{
        const token = await this.authService.getToken();

       return fetch("http://localhost:3000/api/actividades/follow",
            {
                method: 'get',
                headers: {
                    'Authorization':'Bearer '+token 
                }
            })
        .then(resp => resp.json())
        
     }


    async actividadesAmigos():Promise<any>{
       /* var fd = new FormData();
        fd.append('email',credentials.email);
        fd.append('password',credentials.password);
        return fetch("http://localhost:3000/api/auth/login",
            {
                method: 'post',
                body: fd
            })
        .then(resp => resp.json());
        */
    }




}
