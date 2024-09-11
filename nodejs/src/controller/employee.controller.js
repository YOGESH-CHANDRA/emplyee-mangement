const Employee = require("../model/employee.model");

const allEmployee = async (req, res) => {
  try {
    const employeeList = await Employee.find();
    if (employeeList.length == 0)
      return res.status(404).send("Employee list is empty ");
    console.log(employeeList);
    return res.status(200).send(employeeList);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const singleEmployee=async(req,res)=>{
    try {
        const id= req.params.id;
        const employeeDetail = await Employee.findOne({id});
        if (!employeeDetail)
          return res.status(404).send("Employee list is empty ");
        console.log(employeeDetail);
        return res.status(200).send(employeeDetail);
      } catch (error) {
        return res.status(500).send(error.message);
      }
    };


const registerEmployee = async (req, res) => {
  try {
    const { id, name, position, salary } = req.body;
    console.log(req.body)
    if (!id || !name || !position || !salary)
      return res.status(400).json({ msg: "All field is required " })
    const existingEmployee = await Employee.findOne({ id });
    console.log(existingEmployee)
    if (existingEmployee)
      return res
        .status(400)
        .json({ msg: `Employee with ${id} is already exist`, existingEmployee } );
    const newEmployee = await Employee.create({ id, name, position, salary });
    return res
      .status(201)
      .json({ msg: "Employee registered succesufully", newEmployee });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

const updateEmployee = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, position, salary } = req.body;
    console.log(req.body)
    const updatedEmployee = await Employee.findOneAndUpdate(
      { id },
      { $set: { name, position, salary } },
      { new: true }
    );
    console.log("ud : ", updatedEmployee)
    res
      .status(200)
      .send({
        msg: `Employee with ${id} is updated succesfully`,
        updatedEmployee,
      });

  } catch (error) {
    return res.status(500).send({ msg: error.message });
  }
};

const deleteEmployee = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedEmployee = await Employee.findOneAndDelete({ id });
    if (!deletedEmployee)
      return res
        .status(400)
        .send({ msg: `Employee with ${id} is not exist || deleted ` });
    return res
      .status(200)
      .send({ msg: `Employee with id: ${id} is deleted succesfully` });
  } catch (error) {
    return res.status(500).send({ msg: error.message });
  }
};

module.exports = {
  registerEmployee,
  allEmployee,
  singleEmployee,
  updateEmployee,
  deleteEmployee,
};
