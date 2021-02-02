let pagina = 1;

document.addEventListener('DOMContentLoaded', function() {
    iniciarApp();

    // Resalta el div actual
    mostrarSeccion();

    //Oculta/muestra la funcion segun el tab
    cambiarSeccion();
})

function mostrarSeccion(){
    const seccionActual = document.querySelector(`#paso_${pagina}`);
    seccionActual.classList.add('mostrar-seccion');

    //resalta el tab actual
    document.querySelector(`[data-paso="${pagina}"]`).classList.add('tab-actual');
}

function cambiarSeccion() {
    const enlaces = document.querySelectorAll('.tabs button');
    enlaces.forEach(enlace => {
        enlace.addEventListener('click', e => {
            e.preventDefault();
            pagina = parseInt(e.target.dataset.paso);
            
            //Ocultar seccion anterior
            document.querySelector('.mostrar-seccion').classList.remove('mostrar-seccion');
            document.querySelector('.tab-actual').classList.remove('tab-actual');
            //Mostrar seccion elegida

            const seccion = document.querySelector(`#paso_${pagina}`);
            seccion.classList.add('mostrar-seccion');
            document.querySelector(`[data-paso="${pagina}"]`).classList.add('tab-actual');
            
        })
    })
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

