const inquirer = require('inquirer');
const mysql = require('mysql2');
const consoleTable = require('console.table');
const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'company_db'
  },
  console.log(`Connected to the company_db database.`)
);


function init() {

    inquirer
        .prompt(
            {
                type: "list",
                message: "What would you like to do?",
                name: "likeToDO",
                choices: ["View All Employees", "Add Employees", "Update Employee Role", "View All Roles", "Add Role", "View All Departments", "Add Department", "Quit"]
            }
        )
        .then((response) => {
            switch (response.selection) {
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
                    process.exit();
            }
        })
        .catch((err) => console.error(err));
}


async function  viewAllEmployees() {
    result = await db.promise().query(`
        SELECT 
            e.id employee_id, 
            e.first_name, e.last_name, 
            r.title job_title, 
            d.name department, 
            r.salary, 
            CONCAT(m.first_name, " ", m.last_name) manager 
        FROM department d 
        JOIN role r on d.id = r.department_id 
        JOIN employee e on r.id = e. role_id 
        LEFT JOIN employee m on m.id = e.manager_id ORDER BY e.id ASC;
    `)
    return result[0];
}
function viewAllDepartments () {
    db.query("SELECT * FROM department", function(err, results) {
        if(err) {
            console.error(err);
        }
        else{
            console.table(results);
            init();
        }
    
    });
}

init();