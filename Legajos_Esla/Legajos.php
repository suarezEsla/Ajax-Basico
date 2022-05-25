<?php
if(isset($_POST['legajo'])){
 //Guarda el legajo que llego vía ajax. en una varibale.
 $legajo = $_POST['legajo'];
 //Lista de empleados.
 $empleados = array(
 array('legajo' => '10001', 'nombre' => 'Cosme', 'apellido' => 'Fulanito', 'departamento' => 'Estadisticas'),
 array('legajo' => '10002', 'nombre' => 'Lola', 'apellido' => 'Landa', 'departamento' => 'Recursos humanos'),
 array('legajo' => '10003', 'nombre' => 'Cornelio', 'apellido' => 'Del Rancho', 'departamento' => 'Sistemas')
 );
 //Variable que guardará los datos del empleado a buscar. Por defecto guardará null.
 $empleado = null;
 foreach($empleados as $item){
 //Verifica si el legajo es uno de los que está en la lista.
 if($item['legajo'] == $legajo){
 //Guarda los datos del empleado que fue encontrado y finaliza el ciclo del foreach.
 $empleado = $item;
 break;
 }
 }
 //Devuelve la respuesta de si lo encontró o no
 if($empleado){
 //Lo encontró así que devuelve los datos del empleado en forma de cadena.
 echo 'Nombre y apellido: ' . $empleado['nombre'] . ' ' . $empleado['apellido'] . ' / Departamento: ' .
$empleado['departamento'];
 }else{
 //No encontró al usuario.
 echo 'El numero de legajo no le corresponde a ningun empleado';
 }
}else{
 echo ':(';
}
?>