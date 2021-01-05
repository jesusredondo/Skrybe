'use strict';

class AHTML {

    /**
     * Representa una Actividad Simple como su representación HTML.
     * @param {*} actividadSimple 
     */
    static aActividadSimple(actividadSimple) {
        let divActividadSimple = document.createElement('div');
        divActividadSimple.classList.add('actividad');
        divActividadSimple.innerHTML = `<div class="actividad">
            <p><b>ID</b>:${actividadSimple._id}
            <p><b>Nombre</b>:${actividadSimple.properties.name}
            <p><b>Fecha</b>:${actividadSimple.properties.time}<br>
            <button>Cargar Actividad</button>
        </div>`;

        //TODO: Ojo esto está puesto ahora a pelo:
        divActividadSimple.querySelector('button').addEventListener('click',()=>{
            document.querySelector("#idUnaActividad").value = actividadSimple._id;
        });

        return divActividadSimple;
    }


    /**
     * Representa una actividad en el mapa y lo introduce en un contenedor.
     * @param {*} actividad 
     * @param {*} contenedor 
     */
    static aActividadMapa(actividad, contenedor){
        let mapaDiv = document.createElement('div');
        mapaDiv.classList.add('mapa');

        let idMapa = 'mapa-'+actividad._id;
        mapaDiv.id=idMapa;

        //Tiene que estar en el DOM para cargar el mapa.
        contenedor.appendChild(mapaDiv);
        //Cargamos el mapa
        var mapa = L.map(idMapa).setView([39.468230, -6.379019], 13);
        L.tileLayer( 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        }).addTo(mapa);

        //Añadimos el feature/actividad al mapa:
        L.geoJSON(actividad).addTo(mapa);

    }

    

}