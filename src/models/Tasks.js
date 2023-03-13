const colors = require("colors");
const Task = require("./Task");

class Tasks {
  _list = {};

  get tasksCollection() {
    return Object.keys(this._list).map((key) => this._list[key]);
  }

  constructor() {
    this._list = {};
  }

  toggleComplete(ids = []){
    for(let id of ids){
      const task = this._list[id]
      if(!task.completeIN) {
        task.completeIN = new Date().toISOString()
      }
    }

    this.tasksCollection.forEach(task => {
      if( !ids.includes(task.id) ){
        this._list[task.id].completeIN = null;
      }
    })
  }

  deleteTask(id = ''){
    if(!this._list[id]) return

    delete this._list[id]
  }

  createTasks(desc = "") {
    const task = new Task(desc);
    //creamos la propiedad con el id de la tarea y le asigno el objeto.
    this._list[task.id] = task;
  }

  loadTasksFromArray(data = []) {
    data.map((task) => (this._list[task.id] = task));
  }

  listAllTasks() {
    this.tasksCollection.map((task, index) => {
      const num = `${index + 1}.`;
      console.log(
        `${num.green} ${task.desc} :: ${
          task.completeIN ? "completado".green : "pendiente".red
        }`
      );
    });
  }

  listCompleteTasks(complete = true) {
    this.tasksCollection
      .filter((task) => Boolean(task.completeIN) === complete)
      .map((task, index) => {
        const num = `${index + 1}.`;
        console.log(
          `${num.green} ${task.desc} :: ${
            !task.completeIN ? 'pendiente'.red : task.completeIN
          }`
        );
      });
  }
}

module.exports = Tasks;
