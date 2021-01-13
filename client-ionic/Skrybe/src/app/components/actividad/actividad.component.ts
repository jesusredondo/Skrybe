import { Component, Input, OnInit } from '@angular/core';
import * as Leaflet from 'leaflet';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ActividadesServiceService } from './../../services/actividades-service.service';
import { ComentariosService } from 'src/app/services/comentarios.service';

import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-actividad',
  templateUrl: './actividad.component.html',
  styleUrls: ['./actividad.component.scss'],
})
export class ActividadComponent implements OnInit {

    @Input() nombreUser;
    @Input() apellidosUser;
    @Input() idMapa;
    @Input() idUser;
    map: Leaflet.Map; 
    idActividad;
    actividadActual;

    //Para saber si se esta comentando:
    comentando = false;

    //Para el comentario:
    comentarioFG: FormGroup;
    
    constructor(private fb: FormBuilder,
        private actividadesService: ActividadesServiceService, 
        private comentariosService: ComentariosService,
        private toastController: ToastController) { }
    
    ngOnInit() {
        //Preparamos los comentarios:
        this.comentarioFG = this.fb.group({
            comentario: ['', [Validators.required, Validators.minLength(3)]]
        });



        console.log(this.map);  
        console.log(this.idMapa);  
        this.idActividad = this.idMapa.split('-')[1];
        console.log(this.idActividad);
        //this.leafletMap(); 
    }
    
    
    ngAfterViewInit() {
        setTimeout(() => {
            this.leafletMap();
        }, 100);
         
    }

    ionViewDidEnter() { 
        
    }
    
    async leafletMap() {
 
        //Pedimos la actividad:
        this.actividadActual = await this.actividadesService.getActividad(this.idActividad);
        const latInicial =this.actividadActual.geometry.coordinates[0][0];
        const longInicial =this.actividadActual.geometry.coordinates[0][1];
        console.log("Lat "+latInicial);
        console.log("Long "+longInicial);



        console.log(this.actividadActual);

        this.map = Leaflet.map(this.idMapa).setView([longInicial,latInicial], 11);
        Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: 'edupala.com © Angular LeafLet',
        }).addTo(this.map);

        Leaflet.geoJSON(this.actividadActual).addTo(this.map);
    }
    
    /** Remove map when we have multiple map object */
    ngOnDestroy() {
        this.map.remove();
    }




    get fecha(){
        return this.actividadActual ? this.actividadActual.properties.time  : ""
    }

    hayComentarios(){
        if(!this.actividadActual){
            return false;
        }
        
        return this.actividadActual.comentarios
    }

    /**
     * Marca el + de iniciar un nuevo comentario.
     */
    empezarComentar(){
        this.comentando = true;
    }


    async comentar(){
        let comentarioEscrito = this.comentarioFG.get('comentario').value;
        this.comentarioFG.get('comentario').setValue(''); //Lo borramos al inicio para evitar varios clicks
        
        let comentarioDevuelto = await this.comentariosService.enviarComentario(comentarioEscrito, this.actividadActual._id);
        //TODO: Faltaría checkear que se devuelve un OK.
        
        //Mostramos el toast
        const toast = await this.toastController.create({
            message: 'Comentario enviado',
            duration: 2000,
            position: 'top'
          });
          toast.present();




        this.actividadActual.comentarios = await this.comentariosService.getComentariosActividad(this.idActividad);
        
        console.log(comentarioDevuelto);
    }


    get comentario() {
        return this.comentarioFG.get('comentario');
    }


    avatarIdenticonUsuarioID(usuario_ID){
        return "https://identicon-api.herokuapp.com/"+usuario_ID+"/50?format=png";
    }
}
