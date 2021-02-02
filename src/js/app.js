document.addEventListener('DOMContentLoaded', function() {
    iniciarApp();

})

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
                } else {elemento.classList.add('seleccionado');}

                console.log(elemento.dataset.idServicio);
                
            }

            //Inyectar en el html 
            document.querySelector('#servicios').appendChild(botonServ);

            
        });

    } catch(error) {
        console.log(error);
    }

}

