//variables globales
    
let pagina = 1;

const cita = {
    nombre: '',
    fecha: '',
    hora: '',
    servicios: []
}

document.addEventListener('DOMContentLoaded', function() {
    iniciarApp();

    // Resalta el div actual
    mostrarSeccion();

    //muestra la funcion segun el tab
    cambiarSeccion();

    // paginacion 
    paginaSiguiente();
    paginaAnterior();

    //Comprueba la pagina actual para ocultar paginacion
    botonesPaginador();

    //Muestra el resumen de la cita o mensaje de error
    mostrarResumen();
})

//Funcion que muestra la seccion en la que te encontras
function mostrarSeccion(){
   
    // ocultar la seccion anterior 
    const seccionAnterior = document.querySelector('.mostrar-seccion');
    if(seccionAnterior) {
        seccionAnterior.classList.remove('mostrar-seccion');
    }
    const tabAnterior = document.querySelector('.tab-actual');
    if(tabAnterior) {
        tabAnterior.classList.remove('tab-actual');
    }

    //Mostrar seccion
    const seccionActual = document.querySelector(`#paso_${pagina}`);
    seccionActual.classList.add('mostrar-seccion');

    //resaltar el tab actual
    document.querySelector(`[data-paso="${pagina}"]`).classList.add('tab-actual');
 
    
}

//Funcion que oculta la seccion anterior y muestra la actual
function cambiarSeccion() {
    const enlaces = document.querySelectorAll('.tabs button');
    enlaces.forEach(enlace => {
        enlace.addEventListener('click', e => {
            e.preventDefault();
            pagina = parseInt(e.target.dataset.paso);

            //Mostrar seccion elegida

            mostrarSeccion();
            botonesPaginador();
            
        })
    })
}

//Funcion que coloca los botones correspondientes de la paginacion
function botonesPaginador(){
    const paginaSiguiente = document.querySelector('#siguiente');
    const paginaAnterior = document.querySelector('#anterior');
    if(pagina === 1) {
        paginaAnterior.classList.add('ocultar');
        paginaSiguiente.classList.remove('ocultar');
    } else if(pagina === 3) {
        paginaSiguiente.classList.add('ocultar');
        paginaAnterior.classList.remove('ocultar');
    }  else {
        document.querySelector('.ocultar').classList.remove('ocultar');
    } 
    mostrarSeccion();
}

//Funcion que avanza la pagina
function paginaSiguiente() {
    const paginaSiguiente = document.querySelector('#siguiente');
    paginaSiguiente.addEventListener('click', e => {
            pagina++;
            botonesPaginador();
    });

}

//Funcion que va pagina atras
function paginaAnterior() {
    const paginaAnterior = document.querySelector('#anterior');
    paginaAnterior.addEventListener('click', e => {
        pagina--;
        botonesPaginador();

    });
}

//validacion

function mostrarResumen() {
    //object destructuring
    const { nombre, fecha, hora, servicios } = cita;

    //selector resumen
    const resumenDiv = document.querySelector('.contenido-resumen'); 

    // validacion del objeto
    if(Object.values(cita).includes('')) {
        const faltanDatos = document.createElement('P');
        faltanDatos.textContent = 'Falta completar algunos campos.';
        faltanDatos.classList.add('invalidar-cita');
           
        //Inyectar en el div
        resumenDiv.appendChild(faltanDatos); 
    }


}







function iniciarApp() {
    mostrarServicios();
}

async function mostrarServicios() {
    try {
        const resultado = await fetch('./servicios.json');
        const db = await resultado.json();
        

        const {servicios} = db;  
        servicios.forEach(servicio => {
            const {id, nombre, precio} = servicio;

            //Dom scripting
            const nombreServicio = document.createElement('P');
            nombreServicio.textContent = nombre;
            nombreServicio.classList.add('nombre-servicio');
            //Precio
            const precioServicio = document.createElement('P');
            precioServicio.textContent = `$${precio}`;
            precioServicio.classList.add('precio-servicio');

            //Div contenedor
            const botonServ = document.createElement('DIV');
            botonServ.classList.add('boton-serv');

            //Seleccionar el boton de servicio
            botonServ.onclick = seleccionarServicio;
            botonServ.dataset.idServicio = id;

            //Inyectar precio y nombre
            botonServ.appendChild(nombreServicio);
            botonServ.appendChild(precioServicio);
            function seleccionarServicio(e) {
                let elemento;
                if(e.target.tagName === 'P') {
                    elemento = e.target.parentElement;
                    

                } else {
                   elemento = e.target;
                }

                if(elemento.classList.contains('seleccionado')) {
                    elemento.classList.remove('seleccionado');
                } else {
                    elemento.classList.add('seleccionado');
                }

                console.log(elemento.dataset.idServicio);
                
            }

            //Inyectar en el html 
            document.querySelector('#servicios').appendChild(botonServ);

            
        });

    } catch(error) {
        console.log(error);
    }

}

