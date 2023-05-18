const data = {
    employees: require('../model/employees.json'),
    setEmployees: function (data) { this.employees = data }
};
const fsPromises = require('fs').promises;
const path = require('path');

const getAllEmployees = (req, res) => {
    console.log(data.employees);
    res.json(data.employees);
}

const createNewEmployee = async (req, res) => {
    const newEmployees = {
        id: data.employees?.length ? data.employees[data.employees.length - 1].id + 1 : 1,
        firstname: req.body.firstname,
        lastname: req.body.lastname
    }
    if (!newEmployees.firstname || !newEmployees.lastname) {
        return res.status(400).json({ 'message': 'Firstname and Lastname are required.' })
    }
    data.setEmployees([...data.employees, newEmployees]);
    await fsPromises.writeFile(path.join(__dirname, '..', 'model', 'employees.json'), JSON.stringify(data.employees));
    console.log(data.employees);
    res.status(201).json(data.employees);
}

const updateNewEmployee = async (req, res) => {
    const employee = data.employees.find(emp => emp.id === parseInt(req.body.id));
    if (!employee) {
        return res.status(400).json({ 'message': `Employee ID: ${req.body.id} not found.` })
    }
    if (req.body.firstname) employee.firstname = req.body.firstname;
    if (req.body.lastname) employee.lastname = req.body.lastname;
    const filteredArray = data.employees.filter(emp => emp.id !== parseInt(req.body.id));
    const unsortedArray = [...filteredArray, employee];
    data.setEmployees(unsortedArray.sort((a, b) => a.id > b.id ? 1 : a.id < b.id ? -1 : 0));
    await fsPromises.writeFile(path.join(__dirname, '..', 'model', 'employees.json'), JSON.stringify(data.employees));
    console.log(data.employees);
    res.json(data.employees);
}

const deleteEmployee = async (req, res) => {
    const employee = data.employees.find(emp => emp.id === parseInt(req.body.id));
    if (!employee) {
        return res.status(400).json({ 'message': `Employee ID: ${req.body.id} not found.` })
    }
    const filteredArray = data.employees.filter(emp => emp.id !== parseInt(req.body.id));
    data.setEmployees([...filteredArray]);
    await fsPromises.writeFile(path.join(__dirname, '..', 'model', 'employees.json'), JSON.stringify(data.employees));
    console.log(data.employees);
    res.json(data.employees);
}

const getEmployee = (req, res) => {
    const employee = data.employees.find(emp => emp.id === parseInt(req.params.id));
    if (!employee) {
        return res.status(400).json({ "message": `Employee ID ${req.params.id} not found` });
    }
    res.json(employee);
}

module.exports = {
    getAllEmployees,
    createNewEmployee,
    updateNewEmployee,
    deleteEmployee,
    getEmployee
}