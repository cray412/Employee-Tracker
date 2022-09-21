const inquirer = require('inquirer');
const mysql = require('mysql2');



function init {

    inquirer
        .prompt(
            {
                type: "list",
                message: "What would you like to do?",
                name: "likeToDO",
                choices: ["View All Employees", "Add Employees", "Update Employee Role", "View All Roles", "Add Role", "View All Departments", "Add Department", "Quit"]
            }
        )
        .then((res) => {
            switch (res.selection) {
                case "View All Employees":
                    viewAllEmployees();
                    break;
                case "Add Employees":
                    addEmployees();
                    break;
                case "Update Employee Role":
                    updateEmployeeRole();
                    break;
                case "View All Roles":
                    viewAllRoles();
                    break;
                case "Add Role":
                    addRole();
                    break;
                case "View All Departments":
                    viewAllDepartments();
                    break;
                case "Add Department":
                    addDepartment();
                    break;
                case "Quit":
                    quit();
            }
        })
        .catch((err) => console.error(err));
}

init();