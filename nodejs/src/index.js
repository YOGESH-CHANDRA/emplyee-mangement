require("dotenv").config();
const express = require ("express")
const cors = require("cors");
const employeeRouter=require("../src/route/employee.route")


const DataBaseConnection = require("../src/db/conn");

const port = process.env.PORT || 3000;
const app =express();

app.use(cors());
app.use(express.json());

// Router
app.use("/api/v1/employee",employeeRouter);

// Server run when succefully connected with mongodb database..
DataBaseConnection()
  .then((connection) => {
    app.listen(port, () => {
      console.log(`app is running on port no ${port}`);
    });
  })
  .catch((error) => console.log(error));