<?php

function obtenerServicios() : array {

    try {

        //importar conexion
        require 'database.php';

        // var_dump($db);


        // escribir el codigo sql

        $sql = 'SELECT * FROM servicios;';

        $consulta = mysqli_query($db, $sql);

        //creando array vacio

        $servicios = [];

        //obtener los resultados

        $i = 0;

        while($row = mysqli_fetch_assoc($consulta)) {

            $servicios[$i]['id'] = $row['id'];
            $servicios[$i]['nombre'] = $row['nombre'];
            $servicios[$i]['precio'] = $row['precio'];

            $i++;
            

    }
    
    // echo "<pre>";
    // var_dump($servicios);
    // echo "</pre>";
    return $servicios;

 


} catch (\Throwable $th) {
    //throw $th;
    var_dump($th);

    }

    
}

obtenerServicios();