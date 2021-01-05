'use strict';

/**
 * Elimina todos los hijos de un contenedor HTML.
 * @param {HTMLElement} contenedor
 */
function borrarContenedor(contenedor){
    while(contenedor.firstElementChild){
        contenedor.firstElementChild.remove();
    }
}