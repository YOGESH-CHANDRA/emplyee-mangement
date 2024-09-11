
const mongoose = require("mongoose");

const employeeSchema=new mongoose.Schema({
    id:{
        type:Number,
        required:true,
        trim: true
    },
    name:{
        type:String,
        required:true,
        trim: true,
        lowercase:true
    },
    position:{
        type:String,
        required:true,
        trim: true,
        lowercase:true
    },
    salary:{
        type:Number,
        required:true,
        trim: true,
        min:[0, "Salary should be in positive number"]
    }
   
},{
    timestamps:true
})


const Employee= mongoose.model("Employee",employeeSchema);

module.exports=Employee;
