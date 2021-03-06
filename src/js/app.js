//variables globales

let pagina = 1;

const cita = {
    nombre: '',
    fecha: '',
    hora: '',
    servicios: []
}

document.addEventListener('DOMContentLoaded', function () {
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

    //Almacenar el nombre de la cita en el objeto
    nombreCita();

    //almacenar fecha en el objeto

    fechaCita();

    // dessabilitar fecha anterior 
    desabilitarFechaAnterior();

    //alamacenar hora en objeto

    horaCita();
})

//Funcion que muestra la seccion en la que te encontras
function mostrarSeccion() {

    // ocultar la seccion anterior 
    const seccionAnterior = document.querySelector('.mostrar-seccion');
    if (seccionAnterior) {
        seccionAnterior.classList.remove('mostrar-seccion');
    }
    const tabAnterior = document.querySelector('.tab-actual');
    if (tabAnterior) {
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
function botonesPaginador() {
    const paginaSiguiente = document.querySelector('#siguiente');
    const paginaAnterior = document.querySelector('#anterior');
    if (pagina === 1) {
        paginaAnterior.classList.add('ocultar');
        paginaSiguiente.classList.remove('ocultar');
    } else if (pagina === 3) {
        paginaSiguiente.classList.add('ocultar');
        paginaAnterior.classList.remove('ocultar');
        
        //Actulizar la pagina de resumen
        mostrarResumen();
    } else {
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

    //Limpiar html previo

    while(resumenDiv.firstChild) {
        resumenDiv.removeChild(resumenDiv.firstChild);
    }

    // validacion del objeto
    if (Object.values(cita).includes('')) {
        const faltanDatos = document.createElement('P');
        faltanDatos.textContent = 'Falta completar algunos campos.';
        faltanDatos.classList.add('invalidar-cita');
        
        //Inyectar en el div
        resumenDiv.appendChild(faltanDatos);
        return;
    } 

    //Mostrar el resumen

    const headingDatos = document.createElement('H3');
    headingDatos.textContent = 'Resumen cita';
    
    
    const nombreCita = document.createElement('P');
    nombreCita.innerHTML = `<span>Nombre:</span> ${nombre}`
    
    const fechaCita = document.createElement('P');
    fechaCita.innerHTML = `<span>fecha:</span> ${fecha}`
    
    const horaCita = document.createElement('P');
    horaCita.innerHTML = `<span>hora:</span> ${hora}`
    
    const serviciosCita = document.createElement('DIV');
    serviciosCita.classList.add('resumen-servicios');
    
    const headingServicios = document.createElement('H3');
    headingServicios.textContent = 'Resumen de servicios';
    
    
    serviciosCita.appendChild(headingServicios);
    
//Iterar sobre el arreglo de servicios

let cantidad = 0;

    servicios.forEach( servicio => {
        
        //destructuring
        const {nombre, precio} = servicio;

        const contenedorServicio = document.createElement('DIV');
        contenedorServicio.classList.add('contenedor-servicio');
        
        const textoServicio = document.createElement('P');
        textoServicio.textContent = nombre;
        
        const precioServicio = document.createElement('P');
        precioServicio.textContent = precio;
        precioServicio.classList.add('precio');

        //Total del servicio
        const totalServicio = precio.split('$');
        
        cantidad += parseInt(totalServicio[1]);

        console.log(cantidad);
        
        
        //INYECTAR EN EL DIV
        
        contenedorServicio.appendChild(textoServicio);
        
        contenedorServicio.appendChild(precioServicio);
        
        serviciosCita.appendChild(contenedorServicio);
        
        
    })
    
    resumenDiv.appendChild(headingDatos);
    resumenDiv.appendChild(nombreCita);
    resumenDiv.appendChild(fechaCita);
    resumenDiv.appendChild(horaCita);
    resumenDiv.appendChild(serviciosCita);
    
    const cantidadPagar = document.createElement('P');
    cantidadPagar.classList.add('total');
    cantidadPagar.innerHTML = `<span>Total a pagar:</span>  $${cantidad}`;

    resumenDiv.appendChild(cantidadPagar);
    
}
//Cargar los datos de la cita


function nombreCita() {
    const nombreInput = document.querySelector('#nombre');
    nombreInput.addEventListener('input', e => {
        const nombreTexto = e.target.value.trim(); //trim elimina espacios blancos al inicio y final

        //Validacion contenido
        if (nombreTexto === '' || nombreTexto.length < 3) {

            mostrarAlerta('nombre invalido', 'error');

        } else {
            const alerta = document.querySelector('.alerta');
            if(alerta) {
                alerta.remove();
            }
            cita.nombre = nombreTexto
        }
        
    })
}

function desabilitarFechaAnterior() {
    const fechaInput = document.querySelector('#fecha');
    const fechaActual = new Date();
    const year = fechaActual.getFullYear();
    const mes = fechaActual.getMonth() + 1;
    const dia = fechaActual.getDate() + 1;
    //formato deseado AAAA-MM-DD

    const fechaDesabilitar = `${year}-${mes < 10 ? `0${mes}` : mes}-${dia < 10 ? `0${dia}` : dia}`;
    
    //Agregar la fecha a desabilitar
    fechaInput.min = fechaDesabilitar;
}

function fechaCita() {
    const fechaInput = document.querySelector('#fecha');
    fechaInput.addEventListener('input', e => {
        const fecha = new Date(e.target.value).getUTCDay();
       

        if([0, 6].includes(fecha)) {
            e.preventDefault();
            fechaInput.value = '';
            mostrarAlerta('El establecimiento no abre fines de semana.', 'error');
        } else {
            cita.fecha = fechaInput.value; 
            
        }

        /*
        const opciones = {
            weekday: 'long',
            year: 'numeric',
            month: 'long'
        }
        console.log(fecha.toLocaleDateString('es-ES', opciones));
        */
    })
}

function horaCita() {
    const inputHora = document.querySelector('#hora');
    inputHora.addEventListener('input', e => {
        const horaCita = e.target.value
        const hora = horaCita.split(':'); //split me lo convierte en un array dividiendo con lo que yo le pida
        
        if(hora[0] < 10 || hora[0] > 20) {
            mostrarAlerta('El horario de atención es de 10:00 a 20:00.', 'error');
            setTimeout(() => {
                inputHora.value = '';
            }, 3000);
        } else {
            cita.hora = horaCita;
        }
        
        
    });
}





function mostrarAlerta(mensaje, tipoAlerta) {


    //Checkear si hay una alerta previa
    const alertaPrevia = document.querySelector('.alerta');
    if (alertaPrevia) {
        return;
    }

    //Crear la alerta
    const alerta = document.createElement('DIV');
    alerta.textContent = mensaje;
    //Asignarle sus clases
    alerta.classList.add('alerta');
    if (tipoAlerta === 'error') {
        alerta.classList.add('error');
    }

    //Inyectar la alerta en el html
    const formulario = document.querySelector('.formulario');
    formulario.appendChild(alerta);

    // Eliminar la alerta
    setTimeout(() => {alerta.remove();}, 3000)



}

function iniciarApp() {
    mostrarServicios();
}

async function mostrarServicios() {
    try {

        const url = 'http://localhost:3000/Udemy/desarrolloWeb/php/AppSalon/servicios.php'

        const resultado = await fetch(url);
        const db = await resultado.json();


        // const { servicios } = db;
        db.forEach(servicio => {
            const { id, nombre, precio } = servicio;

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
                if (e.target.tagName === 'P') {
                    elemento = e.target.parentElement;


                } else {
                    elemento = e.target;
                }

                if (elemento.classList.contains('seleccionado')) {
                    elemento.classList.remove('seleccionado');

                    //eliminar el servicio
                    const id = parseInt(elemento.dataset.idServicio);
                    eliminarServicio(id);
                } else {
                    elemento.classList.add('seleccionado');


                    const servicioObj = {
                        id: parseInt(elemento.dataset.idServicio),
                        nombre: elemento.firstElementChild.textContent,
                        precio: elemento.firstElementChild.nextElementSibling.textContent
                    }


                    agregarServicio(servicioObj);
                }

                



            }

            function eliminarServicio(id) {

                const { servicios } = cita;
                cita.servicios = servicios.filter(servicio => servicio.id !== id);
            }

            function agregarServicio(objeto) {
                const { servicios } = cita;

                cita.servicios = [...servicios, objeto];
                
            }

            //Inyectar en el html 
            document.querySelector('#servicios').appendChild(botonServ);


        });

    } catch (error) {
        console.log(error);
    }

}

