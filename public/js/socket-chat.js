
 var socket = io();
// validar que el argumento nombre se pase por el url cuando se ingresa a chat.html
 var params = new URLSearchParams(window.location.search);
if(!params.has('nombre') || !params.has('sala')){
  window.location = 'index.html';
  throw new Error('El nombre/sala es necesario');
}
var usuario = {
  nombre:params.get('nombre'),
  sala:params.get('sala')

}
/////////////////////////////////////////////


//evento que se dispara cuando alguien (cliente) ingresa a chat.html
//cliente sabe que se conecto al servidor
socket.on('connect', function() {
  //msj por consola del navegador 
  // console.log('Conectau al servidor');
   

   //notifico al back end que hay un cliente que ingreso a la pag mediante la url
   socket.emit('entrarChat',usuario,function(res){

    //el callback del servidor me retorna todos los clientes conectaus
    //imprime en la consola del navegador los clientes conectaus pero solo 
    //le muestra el mensaje a la maquina que se acaba de conectar no a todos
    console.log('Usuarios conectados', res);
    
   });

   


 });

 //
//  enviarMensaje emit



 //todos los clientes escuchan o bueno reciben el mensaje de cuantos clientes estan activos
   //mediante la consola del navegador 
   socket.on('listarPersona',function(personas){
    console.log(personas);
  });


//el servidor envia --> todos los clientes reciben el nombre del cliente que se desconectó Y tambien cualquier mensaje que el cliente escriba desde la consola del navegador se va al server y vuelve aca y lo muestra a todos los clientes activos el mensaje porque es un broadcast.emit
 socket.on('crearMensaje', function(mensaje){
   console.log('Servidor: ', mensaje );
 });

 socket.on('mensajePrivado', function(mensaje){
  console.log('Mensaje Privado: ', mensaje );
});




 //EVENTO disconnect, cuando el servidor se jode
 socket.on('disconnect', function() {
   console.log("Perdimos conexión con el servidor");
 });

 


 