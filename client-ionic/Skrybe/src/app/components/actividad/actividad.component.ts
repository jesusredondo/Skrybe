import { Component, Input, OnInit } from '@angular/core';
import * as Leaflet from 'leaflet';
import { antPath } from 'leaflet-ant-path';

import { ActividadesServiceService } from './../../services/actividades-service.service';


@Component({
  selector: 'app-actividad',
  templateUrl: './actividad.component.html',
  styleUrls: ['./actividad.component.scss'],
})
export class ActividadComponent implements OnInit {

    @Input() nombreUser;
    @Input() apellidosUser;
    @Input() idMapa;
    map: Leaflet.Map; 
    idActividad;
    public actividadActual;
    
    constructor(private actividadesService: ActividadesServiceService) { }
    
    ngOnInit() {
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

        //if(!this.map){
            this.map = Leaflet.map(this.idMapa).setView([longInicial,latInicial], 11);
            Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: 'edupala.com © Angular LeafLet',
            }).addTo(this.map);

            Leaflet.geoJSON(this.actividadActual).addTo(this.map);
        //}
        
    
        /*Leaflet.marker([28.6, 77]).addTo(this.map).bindPopup('Delhi').openPopup();
        Leaflet.marker([34, 77]).addTo(this.map).bindPopup('Leh').openPopup();
    
        antPath([[28.644800, 77.216721], [34.1526, 77.5771]],
            { color: '#FF0000', weight: 5, opacity: 0.6 })
            .addTo(this.map);*/
    }
    
    /** Remove map when we have multiple map object */
    ngOnDestroy() {
        this.map.remove();
    }




    get fecha(){
        return this.actividadActual ? this.actividadActual.properties.time  : ""
    }

}
