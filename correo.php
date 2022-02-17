<?php

$destino = "dilandgame@gmail.com";

$nombre = $_POST['nombre'];
$email = $_POST['email'];
$telefono = $_POST['telefono'];
$compañia = $_POST['compañia'];
$asunto = $_POST['asunto'];
$mensaje = $_POST['mensaje'];

$header = "Enviado desde Dilam Chuquilin/Ing. Sistemas y Software";
$mensajeCompleto = "\n Nombre:" . $nombre . "\n" . "Email:" . $email . "\n" . "Teléfono:" . $telefono . "\n" . "Compañia :" . $compañia . "\n" . "Mensaje :" . $mensaje;

mail($destino, $asunto, $mensajeCompleto, $header);

header('Location: index.html');
?>
