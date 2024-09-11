const express = require("express");
const {
    registerEmployee,
    allEmployee,
    updateEmployee,
    singleEmployee,
    deleteEmployee,
} = require("../controller/employee.controller");

const Employee = require("../model/employee.model");

const Router = express.Router();

Router.route("/")
  .post(registerEmployee)
  .get(allEmployee)
  
Router.route("/:id").get(singleEmployee).patch(updateEmployee)
  .delete(deleteEmployee);

module.exports = Router;
