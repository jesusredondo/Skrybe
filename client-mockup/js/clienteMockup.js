'use strict';


document.addEventListener('DOMContentLoaded',()=>{

    document.querySelector('#formularioSignin').addEventListener('submit',enviarSignin);

    document.querySelector('#formularioLogin').addEventListener('submit',enviarLogin);

    document.querySelector('#formularioYo').addEventListener('submit', pedirYo);

    document.querySelector('#formularioUsuarios').addEventListener('submit', pedirUsuarios);

    document.querySelector('#formularioSubirGPX').addEventListener('submit', subirGPXFile);
    
    document.querySelector('#formularioTodasActividades').addEventListener('submit', todasActividades);
    
    
    document.querySelector('#formularioUnaActividad').addEventListener('submit', unaActividad);


    //automatizar();
});

/**
 * Envía la petición para Sign-in de un nuevo usuario.
 */
function enviarSignin(e) {
    e.preventDefault();
    const peticionSignin = new XMLHttpRequest();
    const FD = new FormData(document.querySelector('#formularioSignin'));

    peticionSignin.addEventListener( "load", function(event) {
        console.log( event.target.responseText );
    } );

    peticionSignin.addEventListener( "error", function( event ) {
        alert( 'Oops! Something went wrong.' );
    } );

    // Abrir & mandar
    peticionSignin.open( "POST", "http://localhost:3000/api/auth/signin" );
    peticionSignin.send( FD );
}


/**
 * Envía la petición para Sign-in de un nuevo usuario.
 */
function enviarLogin(e) {
    if(e){
        e.preventDefault();
    }
    
    const peticionSignin = new XMLHttpRequest();
    const FD = new FormData(document.querySelector('#formularioLogin'));

    peticionSignin.addEventListener( "load", function(event) {
        let objRespuesta = JSON.parse(event.target.responseText)
        console.log( objRespuesta );
        //Pillamos donde meter el token y lo metemos:
        document.querySelectorAll('[id^=token]').forEach(x => x.value=objRespuesta.access_token);
    } );

    peticionSignin.addEventListener( "error", function( event ) {
        alert( 'Oops! Something went wrong.' );
    } );

    // Abrir & mandar
    peticionSignin.open( "POST", "http://localhost:3000/api/auth/login" );
    peticionSignin.send( FD );
}


/**
 * Envía la petición para Consultar mi perfil.
 */
function pedirYo(e) {
    e.preventDefault();
    console.log('Bearer '+ document.querySelector('#tokenYo').value)

    fetch("http://localhost:3000/api/usuarios/yo",
        {
            method: 'post',
            headers: {
                'Authorization':'Bearer '+ document.querySelector('#tokenYo').value
            }
        })
    .then(resp => resp.json())
    .then(obj=> console.log(obj));

}

/**
 * Envía la petición para Consultar los usuarios del sistema.
 */
function pedirUsuarios(e) {
    e.preventDefault();
    
    fetch("http://localhost:3000/api/usuarios",
        {
            method: 'post',
            headers: {
                'Authorization':'Bearer '+ document.querySelector('#tokenUsuarios').value
            }
        })
    .then(resp => resp.json())
    .then(obj=> console.log(obj));

}

/**
 * Sube un fichero GPX al servidor. Devuelve un objeto en GeoJSON como respuesta.
 */
function subirGPXFile(e){
    e.preventDefault();

    const fichero = document.querySelector('#ficheroSubirGPX').files[0];
    console.log('Subiendo el fichero '+fichero);

    /* NECESITO USAR FORMDATA PARA QUE FUNCIONE FORMIDABLE */
    var data = new FormData()
    data.append('file',fichero)

    let bearer = document.querySelector('#tokenGPX').value
    console.log('BEARER '+bearer);

    if(fichero){
       fetch("http://localhost:3000/api/upload/routeGPX",
        {
            method: 'post',
            headers: {
                'Authorization':'Bearer '+ bearer//
            },
            body: data
        })
        .then(resp => resp.json())
        .then(obj=>console.log(obj)); 
    } else{
        console.log("NO has seleccionado ningún fichero");
    }
}


/**
 * Pide todas las actividades que hay en el sistema de manera resumida.
 */
async function todasActividades(e) {
    e.preventDefault();
    
    let actividadesSimples = await fetch("http://localhost:3000/api/actividades",
        {
            method: 'post',
            headers: {
                'Authorization':'Bearer '+ document.querySelector('#tokenUsuarios').value
            }
        })
    .then(resp => resp.json())

    //Borramos el contenedor
    let contenedorTA = document.querySelector("#contenedorTodasActividades");
    borrarContenedor(contenedorTA);

    //Añadimos la info de cada actividad:
    for(let actividadSimple of actividadesSimples){
        contenedorTA.appendChild(AHTML.aActividadSimple(actividadSimple));
    }
    console.log(actividadesSimples);
}


/**
 * Pide todas las actividades que hay en el sistema de manera resumida.
 */
async function unaActividad(e) {
    e.preventDefault();

    let idActividad = document.querySelector("#idUnaActividad").value

    console.log("ID Actividad: " + idActividad);
    
    let actividad = await fetch("http://localhost:3000/api/actividades/"+idActividad,
        {
            method: 'post',
            headers: {
                'Authorization':'Bearer '+ document.querySelector('#tokenUsuarios').value
            }
        })
    .then(resp => resp.json())

    console.log(actividad);

    //Borramos el contenedor y plantamos el mapa:
    let contenedor1Actividad = document.querySelector("#contenedorUnaActividad");
    borrarContenedor(contenedor1Actividad);
    
    AHTML.aActividadMapa(actividad,contenedor1Actividad); //Lo mete directamente en el contenedor.

}



/**
 * Automatiza las llamadas para tener un token al arrancar la aplicación.
 */
async function automatizar() {
    //Obtener token y rellenar donde se necesita:
    await enviarLogin();
    
    document.querySelector('#idUnaActividad').value = '5ff1bd6f98638341465234c4';
}