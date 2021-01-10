import { Component } from '@angular/core';

import { ActividadesServiceService } from '../services/actividades-service.service';


@Component({
    selector: 'app-tab1',
    templateUrl: 'tab1.page.html',
    styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

    actividades;

    constructor(private actividadesService: ActividadesServiceService) { }
    
    async ngOnInit() { 
        this.actividades = await this.actividadesService.actividadesMias();
        console.log("ACTIVIDADES!");
        console.log(this.actividades);
    }
    


    
    
    
 
}
