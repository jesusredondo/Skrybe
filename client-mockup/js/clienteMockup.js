'use strict';


document.addEventListener('DOMContentLoaded',()=>{

    document.querySelector('#formularioSignin').addEventListener('submit',(e)=>{
        e.preventDefault();
        enviarSignin();
    });


    document.querySelector('#formularioLogin').addEventListener('submit',(e)=>{
        e.preventDefault();
        enviarLogin();
    });

    document.querySelector('#formularioYo').addEventListener('submit', pedirYo);
    document.querySelector('#formularioUsuarios').addEventListener('submit', pedirUsuarios);
});

/**
 * Envía la petición para Sign-in de un nuevo usuario.
 */
function enviarSignin() {
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
function enviarLogin() {
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
    console.log('Bearer '+ document.querySelector('#tokenUsuarios').value)

    fetch("http://localhost:3000/api/usuarios/yo",
        {
            headers: {
                'Authorization':'Bearer '+ document.querySelector('#tokenUsuarios').value
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
            headers: {
                'Authorization':'Bearer '+ document.querySelector('#tokenUsuarios').value
            }
        })
    .then(resp => resp.json())
    .then(obj=> console.log(obj));

}