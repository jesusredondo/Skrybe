'use strict';


document.addEventListener('DOMContentLoaded',()=>{

    document.querySelector('#formularioSignin').addEventListener('submit',enviarSignin);

    document.querySelector('#formularioLogin').addEventListener('submit',enviarLogin);

    document.querySelector('#formularioYo').addEventListener('submit', pedirYo);

    document.querySelector('#formularioUsuarios').addEventListener('submit', pedirUsuarios);

    document.querySelector('#formularioUsuariosSigo').addEventListener('submit', pedirUsuariosSigo);

    document.querySelector('#formularioFollowers').addEventListener('submit', pedirFollowers);

    document.querySelector('#formularioSubirGPX').addEventListener('submit', subirGPXFile);
    
    document.querySelector('#formularioTodasActividadesUsuario').addEventListener('submit', todasActividadesUsuario);

    document.querySelector('#formularioTodasActividades').addEventListener('submit', todasActividades);
    
    document.querySelector('#formularioUnaActividad').addEventListener('submit', unaActividad);

    document.querySelector('#formularioComentariosActividad').addEventListener('submit', comentariosActividad);

    document.querySelector('#formularioComentarActividad').addEventListener('submit', comentarActividad);


    automatizar();
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
            method: 'get',
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
async function pedirUsuarios(e) {
    e.preventDefault();
    
    let usuarios = await fetch("http://localhost:3000/api/usuarios",
        {
            method: 'get',
            headers: {
                'Authorization':'Bearer '+ document.querySelector('#tokenUsuarios').value
            }
        })
    .then(resp => resp.json());

    console.log(usuarios);


    //Borramos el contenedor y mostramos todos los usuarios:
    let contenedorTodosUsuarios = document.querySelector("#contenedorTodosUsuarios");
    borrarContenedor(contenedorTodosUsuarios);
    for(let usuario of usuarios){
        contenedorTodosUsuarios.appendChild(AHTML.aUsuario(usuario)); 
    }    
}


/**
 * Envía la petición para Consultar los usuarios que sigo en el sistema.
 */
async function pedirUsuariosSigo(e) {
    e.preventDefault();
    
    let usuarios = await fetch("http://localhost:3000/api/usuarios/follow",
        {
            method: 'get',
            headers: {
                'Authorization':'Bearer '+ document.querySelector('#tokenUsuariosSigo').value
            }
        })
    .then(resp => resp.json());

    console.log(usuarios);


    //Borramos el contenedor y mostramos todos los usuarios:
    let contenedorTodosUsuariosSigo = document.querySelector("#contenedorTodosUsuariosSigo");
    borrarContenedor(contenedorTodosUsuariosSigo);
    for(let usuario of usuarios){
        contenedorTodosUsuariosSigo.appendChild(AHTML.aUsuario(usuario)); 
    }    
}



/**
 * Envía toda la petición para sacar los followers
 */
async function pedirFollowers(e) {
    e.preventDefault();
    
    let followers = await fetch("http://localhost:3000/api/usuarios/followers",
        {
            method: 'get',
            headers: {
                'Authorization':'Bearer '+ document.querySelector('#tokenFollowers').value
            }
        })
    .then(resp => resp.json());

    console.log(followers);


    //Borramos el contenedor y mostramos todos los usuarios:
    let contenedorFollowers = document.querySelector("#contenedorFollowers");
    borrarContenedor(contenedorFollowers);
    for(let usuario of followers){
        contenedorFollowers.appendChild(AHTML.aUsuario(usuario)); 
    }    
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
        console.log("No has seleccionado ningún fichero");
    }
}


/**
 * Pide todas las actividades de UN USUARIO que hay en el sistema de manera resumida.
 */
async function todasActividadesUsuario(e) {
    e.preventDefault();
    const _id_usuario = document.querySelector('#idTodasActividadesUsuario').value;
    
    let actividadesSimples = await fetch("http://localhost:3000/api/actividades/usuario/"+_id_usuario, 
        {
            method: 'get',
            headers: {
                'Authorization':'Bearer '+ document.querySelector('#tokenTodasActividadesUsuario').value
            }
        })
    .then(resp => resp.json())

    //Borramos el contenedor
    let contenedorTAUsuario = document.querySelector("#contenedorTodasActividadesUsuario");
    borrarContenedor(contenedorTAUsuario);

    //Añadimos la info de cada actividad:
    for(let actividadSimple of actividadesSimples){
        contenedorTAUsuario.appendChild(AHTML.aActividadSimple(actividadSimple));
    }
    console.log(actividadesSimples);
}


/**
 * Pide todas las actividades que hay en el sistema de manera resumida.
 */
async function todasActividades(e) {
    e.preventDefault();
    
    let actividadesSimples = await fetch("http://localhost:3000/api/actividades",
        {
            method: 'get',
            headers: {
                'Authorization':'Bearer '+ document.querySelector('#tokenTodasActividades').value
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
 * Pide una actividad de manera completa
 */
async function unaActividad(e) {
    e.preventDefault();

    let idActividad = document.querySelector("#idUnaActividad").value

    console.log("ID Actividad: " + idActividad);
    
    let actividad = await fetch("http://localhost:3000/api/actividades/"+idActividad,
        {
            method: 'get',
            headers: {
                'Authorization':'Bearer '+ document.querySelector('#tokenUnaActividad').value
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
 * Pide todos los comentarios de una actividad.
 */
async function comentariosActividad(e) {
    e.preventDefault();

    let idActividad = document.querySelector("#idUnaActividadComentarios").value

    console.log("ID Actividad: " + idActividad);
    
    let comentarios = await fetch("http://localhost:3000/api/comentarios/"+idActividad,
        {
            method: 'get',
            headers: {
                'Authorization':'Bearer '+ document.querySelector('#tokenComentariosActividad').value
            }
        })
    .then(resp => resp.json())

    console.log(comentarios);

    //Borramos el contenedor y plantamos el mapa:
    let contenedorComentariosActividad = document.querySelector("#contenedorComentariosActividad");
    borrarContenedor(contenedorComentariosActividad);
    
    for(let comentario of comentarios){
        contenedorComentariosActividad.appendChild(AHTML.aComentario(comentario));
    }
}


/**
 * Comenta una actividad
 */
async function comentarActividad(e) {
    e.preventDefault();

    let idActividad = document.querySelector("#idUnaActividadComentar").value;
    let mensajeComentario = document.querySelector("#idComentarioActividadComentar").value;
    console.log("ID Actividad: " + idActividad);
    console.log("Comentario: " + mensajeComentario);

    var data = new FormData()
    data.append('mensaje',mensajeComentario);
    
    let comentario = await fetch("http://localhost:3000/api/comentarios/"+idActividad,
        {
            method: 'post',
            headers: {
                'Authorization':'Bearer '+ document.querySelector('#tokenComentariosActividad').value
            },
            body: data
        })
    .then(resp => resp.json())

    console.log(comentario);

       

}





/**
 * Automatiza las llamadas para tener un token al arrancar la aplicación.
 */
async function automatizar() {
    //Obtener token y rellenar donde se necesita:
    await enviarLogin();
    
    //document.querySelector('#idUnaActividad').value = '5ff1bd6f98638341465234c4';
}