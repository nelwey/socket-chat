//del server -->  module.exports.io = socketIO(server);
const { io } = require("../server");
const {Usuario} = require('../classes/usuario'); 
const {crearMensaje} = require('../utils/utils'); 
const usuario = new Usuario();




//evento que se dispara cuando alguien (cliente) ingresa a una pagina
//que trabaja con sockets var socket = io();
//servidor sabe que se conectó un cliente
io.on("connection", client => {
  // console.log("usuario conectau");


  //recibo el usuario del front end
  client.on("entrarChat", (data,callback) => {


    if(!data.nombre || !data.sala){
      return callback({
        ok:false,
        mensaje:'El nombre/sala es necesario'
      })
    }

    //cada vez que un cliente ingrese a la sala chat
    //le asigno la sala que manda por argumento en la url
    client.join(data.sala);

    //cada vez que se une un cliente o se crea un cliente se le asigna un id diferente
    usuario.addPersona(client.id,data.nombre,data.sala);


    // retorno cantidad de usuarios conectaus (arreglo de obj) solo a la maquina que acaba de ingresar
    

    // retorno la cantidad de clientes conectaus
    //a todos los clientes de la misma sala
    client.broadcast.to(data.sala).emit('listarPersona',usuario.getPersonasPorSala(data.sala));  

    //dispara este emit a todos los clientes cuando un cliente nuevo ingresa al chat de la misma sala
    let mensaje = crearMensaje('Administrador1',`${data.nombre} se unió`)
    client.broadcast.to(data.sala).emit('crearMensaje',mensaje);

    callback(usuario.getPersonasPorSala(data.sala));

    
    
  });

//DESCONEXION DE USUARIOS DEL CHAT

  client.on('disconnect',()=>{

    //si el cliente se desconecta se lo borra del arreglo entonces cuando vuelva a conectarse va a usar otro id

    let deletedPersona = usuario.deletePersona(client.id);
     
    //envio a todos los clientes conectados que usuario
    //se desconectó mediante una funcion creada en utils
    client.broadcast.to(deletedPersona.sala).emit('crearMensaje',crearMensaje('Administrador',`${deletedPersona.nombre} salió`));

    //despues de que alguien se desconecte envio a todos los clientes de la misma sala, los clientes que estan activos de la misma sala
    client.broadcast.to(deletedPersona.sala).emit('listarPersona',usuario.getPersonasPorSala(deletedPersona.sala));

  });

  client.on('crearMensaje',(data,callback) => {
    
    let cliente = usuario.getPersona(client.id);
    let mensaje = crearMensaje(cliente.nombre,data.mensaje);
    //el mensaje que se envia desde el navegador lo devuelvo
    // a todos los clientes de la misma sala
    
    client.broadcast.to(cliente.sala).emit('crearMensaje',mensaje);
    


    callback(mensaje);

  });
  
  client.on('mensajePrivado', (data) => {

    let cliente = usuario.getPersona(client.id);
    let mensaje = crearMensaje(cliente.nombre,data.mensaje);

    client.broadcast.to(data.id).emit('mensajePrivado',mensaje);

  });

});
