class Usuario {

  constructor(){
    this.personas = [];

  }

  addPersona(id,nombre,sala){

    let persona = {
      id,
      nombre,
      sala
    };
    this.personas.push(persona);
    return this.personas;

  }

  getPersona(id){
    let persona = this.personas.filter(persona => persona.id === id)[0];
    return persona;
  }
  
  getPersonas(){
    return this.personas;
  }
  
  
  getPersonasPorSala(sala){
    let personasEnSala = this.personas.filter(persona => persona.sala === sala )
    return personasEnSala;
  }
  
  deletePersona(id){

    let deletedPersona = this.getPersona(id);

    this.personas = this.personas.filter(personas => personas.id != id);

    return deletedPersona;

  }

}



module.exports = {
  Usuario
}