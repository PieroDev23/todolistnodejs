const inquirer = require("inquirer");
const colors = require("colors");

const questions = [
  {
    type: "list",
    name: "option",
    message: "What do you wanna do?",
    choices: [
      {
        value: 1,
        name: `${"1.".green} Create new task.`,
      },
      {
        value: 2,
        name: `${"2.".green} List tasks.`,
      },
      {
        value: 3,
        name: `${"3.".green} List complete tasks.`,
      },
      {
        value: 4,
        name: `${"4.".green} List pending tasks.`,
      },
      {
        value: 5,
        name: `${"5.".green} Mark task as complete.`,
      },
      {
        value: 6,
        name: `${"6.".green} Delete task.`,
      },
      {
        value: 0,
        name: "exit.",
      },
    ],
  },
];

async function confirm(message = "") {
  const question = [
    {
      type: "confirm",
      name: "ok",
      message,
    },
  ];

  const { ok } = await inquirer.prompt(question);
  return ok;
}

async function listTasksChecklist(list = []) {
  const choices = list.map((task, index) => {
    const idx = `${index + 1}`.green;

    return {
      value: task.id,
      name: `${idx}. ${task.desc}`,
      checked: (task.completeIN ) ? true : false
    };
  });

  const question = [
    {
      type: "checkbox",
      name: "ids",
      message: "Select",
      choices,
    },
  ];

  const { ids } = await inquirer.prompt(question);
  return ids;
}

async function listTasksDelete(list = []) {
  const choices = list.map((task, index) => {
    const idx = `${index + 1}`.green;
    return {
      value: task.id,
      name: `${idx}. ${task.desc}`,
    };
  });

  choices.unshift({
    value: "0",
    name: `${"0".green}. Cancel.`,
  });

  const questions = [
    {
      type: "list",
      name: "id",
      message: "Delete",
      choices,
    },
  ];

  const { id } = await inquirer.prompt(questions);

  return id;
}

async function readLine(message = "") {
  const question = [
    {
      type: "input",
      name: "description",
      message,
      validate(value) {
        if (value.length === 0) {
          return "Ingrese un valor";
        }
        return true;
      },
    },
  ];

  const { description } = await inquirer.prompt(question);
  return description;
}

async function inquirerMenu() {
  console.clear();
  console.log("========================================================".green);
  console.log(" Terminal TodoApp with nodejs + inquirer + colors + uuid".green);
  console.log("========================================================".green);

  const { option } = await inquirer.prompt(questions);

  return Number(option);
}

async function pause() {
  const question = [
    {
      type: "input",
      name: "enter",
      message: `Press ${"ENTER".green} to continue.`,
    },
  ];

  console.log("\n");

  await inquirer.prompt(question);
}

module.exports = {
  inquirerMenu,
  pause,
  readLine,
  listTasksDelete,
  confirm,
  listTasksChecklist,
};
