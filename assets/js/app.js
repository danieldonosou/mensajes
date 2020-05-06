//variables

const listaMensajes= document.querySelector('#lista-mensajes');

//Event Listeners

eventListeners();

function eventListeners(){
    
    //Cuando se envia el formulario
    document.querySelector('#formulario').addEventListener('submit', accionAgregarMensaje);

    //borrar mensaje
    listaMensajes.addEventListener('click', borrarMensaje);

    //contenido cargado
    document.addEventListener('DOMContentLoaded', cargaDatosLocalStorage);

}

//Funciones

//añade mensaje
function accionAgregarMensaje(e){
    e.preventDefault();
    //leer valor text area
    const mensaje = document.querySelector('#mensaje').value;
    agregarMensaje(mensaje);
    //añadir a localStorage
    agregarMensajeLocalStorage(mensaje);
}

//agrega los componentes al DOM
function agregarMensaje(mensaje){
    //crear boton eliminar
    const botonBorrar = document.createElement('a');
    botonBorrar.classList= 'borrar-mensaje';
    botonBorrar.innerText='X';

    //crear elemento y añadirlo a la lista
    const li = document.createElement('li');
    li.innerText=mensaje;
    //añade el botòn de borrar
    li.appendChild(botonBorrar);
    //añade a la lista
    listaMensajes.appendChild(li);
}

//borrar mensaje del DOM y del storage
function borrarMensaje(e){
    e.preventDefault();
    //delegator: la accion se activará solamente si se dió click en la X
    if(e.target.className === 'borrar-mensaje'){
        //remueve del DOM
        e.target.parentElement.remove();
        //elimina del storage
        eliminarDatosLocalStorage(e.target.parentElement.innerText);
    }
}

//agrega mensaje al storage
function agregarMensajeLocalStorage(mensaje){
    let mensajes=obtenerMensajesLocalStorage();
    //añadir nuevo mensajes
    mensajes.push(mensaje);
    //agregar al local convirtiendo en string
    localStorage.setItem('mensajes', JSON.stringify(mensajes));
}

//obtiene los mensajes del localStorage
function obtenerMensajesLocalStorage(){
    let mensajes;
    if (localStorage.getItem('mensajes') === null){
        mensajes=[];
    }
    else{
        mensajes=JSON.parse(localStorage.getItem('mensajes'));
    }
    return mensajes;
}

//cargar datos del localStorage
function cargaDatosLocalStorage(){
    let mensajes=obtenerMensajesLocalStorage();
    mensajes.forEach(function(mensaje){
        agregarMensaje(mensaje);
    });
}

//eliminar mensaje del storage
function eliminarDatosLocalStorage(mensaje){
    let mensajes, mensajeBorrar;
    //elimina la X del mensaje
    mensajeBorrar=mensaje.substring(0, mensaje.length - 1);
    //obtiene los mensajes almacenados
    mensajes=obtenerMensajesLocalStorage();
    //elimina del storage
    mensajes.forEach(function(mensaje, index){
        if(mensaje === mensajeBorrar){
            mensajes.splice(index, 1);
        }
    });
    //agrega al localStorage
    localStorage.setItem('mensajes', JSON.stringify(mensajes));
}
