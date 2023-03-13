const colors = require("colors");
const readline = require("readline");

function displayConsoleMenu() {
  console.clear()
  console.log("==============================".green);
  console.log(" Select one option".green);
  console.log("==============================".green);

  console.log(`${"1.".green} Crear tarea`);
  console.log(`${"2.".green} Listar tarea`);
  console.log(`${"3.".green} Listar tareas completadas`);
  console.log(`${"4.".green} Listar tareas pendientes`);
  console.log(`${"5.".green} Completar tarea`);
  console.log(`${"6.".green} Borrar tarea`);
  console.log(`${"0.".green} salir`);
}

/**
 * Nota:
 * Primero intente hacer que esta funcion retorne un valor del rlInstance.question(), pero me di cuenta que esto no funciona porque retorna un vacio
 * Segundo probe con hacer una variable global dentro de mi funcion, y esa misma retornarla pero eso tampoco funciona porque es codigo sincrono, no asincrono.
 * ¿Eso que tiene que ver? el proceso es el siguiente.
 * EL programa debe de pararse en multiples momentos: 
 * 1 - Cuando esté esperando una respuesta del usuario.
 * 2 - Cuando seleccionó una opción y tiene que presionar enter para continuar.
 * el metodo del objeto readline, question congela el programa hasta que el usuario brinde una respuesta. pero una vez que se brinda la respuesta el
 * programa se cierra, tenemos que pausarlo, por eso creo la funcion de pause.
 * tambien esta el do while del app.js que permite ejecutar la funcion de requireInput tantas veces como quiera hasta que el usuario ponga 0.
 * como lo que estaba haciendo era codigo sincrono, creo que no estaba esperando nada y el codigo simplemente se ejecutaba hasta el infinito porque:
 * el usuario no ingresaba una respuesta, por ende la opcion era indefinida y al evaluar eso con un 0 el resultado era false.
 * AL retornar una promesa lo que sucede es que basicamente yo puedo escoger en que parte del codigo el programa va a resolver esa promesa,
 * que inicialmente se queda como pendiente.
 * La promesa se resuelve cuando el usuario coloca una respuesta, entonces hay esa espera, con el await en el app.
 * @returns 
 */

function requireInput() {
  displayConsoleMenu();

  return new Promise((resolve) => {
    //leyendo datos del usuario en la consola
    const rlInstance = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rlInstance.question("Select an option: ", (answer) => {
      //cuando response se cierra el programa.
      resolve(Number(answer));
      rlInstance.close();
    });
  });
}

function pause() {
  return new Promise((resolve) => {
    const rlInstance = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rlInstance.question("presione ENTER para continuar", (_) => {
      resolve()
      rlInstance.close();
    });
  });
}

module.exports = {
  requireInput,
  pause,
};
