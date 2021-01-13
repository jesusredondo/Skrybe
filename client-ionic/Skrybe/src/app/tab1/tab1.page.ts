import { Component } from '@angular/core';

import { ActividadesServiceService } from '../services/actividades-service.service';


@Component({
    selector: 'app-tab1',
    templateUrl: 'tab1.page.html',
    styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

    actividades=[];

    constructor(private actividadesService: ActividadesServiceService) { }
    
    async ngOnInit() { 
        //await this.refrescarActividades();
    }


    async ionViewDidEnter() { 
        await this.refrescarActividades(); 
    }


    async refrescarActividades(){
        this.actividades = await this.actividadesService.actividadesFollow();
        console.log("ACTIVIDADES!");
        console.log(this.actividades);
    }
    


    
    
    
 
}
