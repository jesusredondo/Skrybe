import { Component } from '@angular/core';

import { ActividadesServiceService } from '../services/actividades-service.service';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

    actividades;

    constructor(private actividadesService: ActividadesServiceService) {}

    async ngOnInit() { 
        this.actividades = await this.actividadesService.actividadesPropias();
        console.log("ACTIVIDADES!");
        console.log(this.actividades);
    }

}
