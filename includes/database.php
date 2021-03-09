<?php


$db = mysqli_connect('localhost', 'root', 'root', 'appsalon');
$db->set_charset('utf8');

if(!$db) {
    echo 'error en la conexión';
    exit; //finaliza la ejecución del codigo
}
    // echo 'conexion exitosa';