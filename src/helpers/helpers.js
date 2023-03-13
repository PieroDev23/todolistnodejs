const {
  readLine,
  listTasksDelete,
  confirm,
  listTasksChecklist,
} = require("./inquirer");

const fs = require("fs");
const Tasks = require("../models/Tasks");

const mapStrategy = {
  0: function () {
    return null;
  },
  1: createTask,
  2: listAllTasks,
  3: listCompleteTasks,
  4: listPendingTasks,
  5: completeTask,
  6: deleteTask,
};

const tasks = new Tasks();
const file = "./db/data.json";

async function createTask() {
  const desc = await readLine("Description: ");
  tasks.createTasks(desc);

  createFile(tasks.tasksCollection);
}

async function listAllTasks() {
  tasks.listAllTasks();
}

async function listCompleteTasks() {
  tasks.listCompleteTasks();
}

async function listPendingTasks() {
  tasks.listCompleteTasks(false);
}

async function completeTask() {
  const markedTasks = await listTasksChecklist(tasks.tasksCollection)
  tasks.toggleComplete(markedTasks)
  createFile(tasks.tasksCollection)
}

async function deleteTask() {
  const id = await listTasksDelete(tasks.tasksCollection);

  if (id === "0") return null;

  const ok = await confirm("this task would be deleted, are you sure?");

  if (!ok) return null;

  tasks.deleteTask(id);
  createFile(tasks.tasksCollection);
  console.log("Task deleted.");
}

function createFile(data = []) {
  fs.writeFileSync(file, JSON.stringify(data));
}

function readFile() {
  if (!fs.existsSync(file)) {
    return null;
  }

  const info = fs.readFileSync(file, { encoding: "utf-8" });
  return JSON.parse(info);
}

module.exports = {
  readFile,
  mapStrategy,
  tasks,
};
