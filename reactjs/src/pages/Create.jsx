import axios from "axios";
import React, { useState } from "react";
import { API } from "../api";
import { toast } from "react-toastify";
import Spinner from "../Spinner";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const [user, setUser] = useState({ id:"", name: "", position: "", salary: "" });
  const [loading, setLoading] = useState(0);
 const navigate=useNavigate();

  const changeHandle = (e) => {
    const { name, value } = e.target;
    console.log(name, value)
    setUser((pre) => ({ ...pre, [name]: value }));
  };

  const sumbitHandle = async (e) => {
    e.preventDefault();
    setLoading(1)
    try {
      
      if (!user.id || !user.name || !user.position || !user.salary) {
        throw new Error("All field required");
      }
      console.log(user)
      const res = await axios.post(API, user);
      console.log(res)
      if (res.status == 201) {
        toast.success(`Emloyee create succesfully with id : ${res.data.id}`);
        setUser({ id:"", name: "", position: "", salary: "" });
        setLoading(0)
      } else {
        throw new Error("Employee not registered");
      }
    } catch (error) {
      toast.error(error.message);
      setLoading(0)
    }
  };
  return (
<div className="text-center mt-4 p-3">
      <h1 className="bg-info">Enter New User</h1>
     {!loading? <form onSubmit={sumbitHandle}>
        <input
          type="number"
          className="col-10 col-lg-6 my-2"
          name="id"
          placeholder="Enter the id of employee"
          value={user.id}
          onChange={changeHandle}
          required
        />
        <br />
        <input
          type="text"
          className="col-10 col-lg-6 my-2"
          name="name"
          placeholder="Enter the name of employee"
          value={user.name}
          onChange={changeHandle}
          required
        />
        <br />
        <input
          type="text"
          className="col-10 col-lg-6 my-2"
          name="position"
          placeholder="Enter the position of employee"
          value={user.position}
          onChange={changeHandle}
          required
        />
        <br />

        <input
          type="number"
          className="col-10 col-lg-6 my-2"
          name="salary"
          placeholder="Enter the salary of employee"
          value={user.salary}
          onChange={changeHandle}
          min={0}
          required
        />
        <br />
        <input type="submit" className="btn btn-primary" required />
        <div className="btn btn-primary m-3" onClick={()=>navigate("/users")}>Go to users page</div>
      </form>:<Spinner/>}
    </div>
  );
};

export default Create;
