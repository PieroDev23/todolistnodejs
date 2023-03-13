const { inquirerMenu, pause } = require("./helpers/inquirer");
const { mapStrategy, readFile, tasks } = require("./helpers/helpers");

async function main() {
  let opt;
  const tasksDB = readFile();

  if (tasksDB) {
    //establecer las tareas
    tasks.loadTasksFromArray(tasksDB)
  }

  do {
    opt = await inquirerMenu();
    await mapStrategy[opt]();
    await pause();
  } while (opt !== 0);
}

main().catch((err) => console.error(err));
