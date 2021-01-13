import { Injectable } from '@angular/core';
import { AuthenticationService } from './../services/authentication.service';

import { UrlServidorService } from './url-servidor.service';


@Injectable({
    providedIn: 'root'
})
export class ComentariosService {
    
    //TODO: Cargar una vez el token al inyectar el servicio en tabs.
    
    constructor(private authService: AuthenticationService,
        private urlServidorSerice:UrlServidorService) { }
    
    async getComentariosActividad(idActividad):Promise<any>{
        const token = await this.authService.getToken();
        
        return fetch(this.urlServidorSerice.getUrlBase()+"api/comentarios/"+idActividad,
        {
            method: 'get',
            headers: {
                'Authorization':'Bearer '+token 
            }
        })
        .then(resp => resp.json())
    }
    
    
    async enviarComentario(mensaje, idActividad):Promise<any>{
        const token = await this.authService.getToken();
        
        var fd = new FormData();
        fd.append('mensaje',mensaje);
        
        return fetch(this.urlServidorSerice.getUrlBase()+"api/comentarios/"+idActividad,
        {
            method: 'post',
            headers: {
                'Authorization':'Bearer '+ token
            },
            body: fd
        })
        .then(resp => resp.json())
        
    }
}
