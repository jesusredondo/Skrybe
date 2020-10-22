'use strict';


document.addEventListener('DOMContentLoaded',()=>{

    document.querySelector('#formularioSignin').addEventListener('submit',(e)=>{
        e.preventDefault();
        enviarSignin();
    });

});


function enviarSignin() {
    const XHR = new XMLHttpRequest();
    // Bind the FormData object and the form element
    const FD = new FormData( document.querySelector('#formularioSignin') );

    // Define what happens on successful data submission
    XHR.addEventListener( "load", function(event) {
      alert( event.target.responseText );
    } );

    // Define what happens in case of error
    XHR.addEventListener( "error", function( event ) {
      alert( 'Oops! Something went wrong.' );
    } );

    // Set up our request
    XHR.open( "POST", "http://localhost:3000/api/auth/signin" );
    XHR.setRequestHeader('X-PINGOTHER', 'pingpong');
    XHR.setRequestHeader('Content-Type', 'application/json');

    // The data sent is what the user provided in the form
    XHR.send( FD );
}