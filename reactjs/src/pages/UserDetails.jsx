import axios from "axios";
import React, { useEffect, useState } from "react";
import { API } from "../api";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../Spinner";

const UserDetails = () => {
  const [user, setUser] = useState({ id: "", name: "", position: "", salary:"" });
  const [loading, setLoading] = useState(0);
  const { id } = useParams();
  const navigate = useNavigate();

  console.log(user)

  useEffect(() => {
    setLoading(1)
    axios.get(API + `/${id}`).then((res) => {
      console.log(res.data),
        setUser({
          id: res.data.id,
          name: res.data.name,
          position: res.data.postion,
          salary:res.data.salary,
        });
        setLoading(0)
    });
  }, []);
  return (
    <>
      <div className="text-center mt-4 p-3">
        <h1 className="bg-info">Employee Details (Id: {id})</h1>
        {(!loading && user)? (
          <div className=" m-auto">
           <p>Id: {user.id}</p>
           <p>Name: {user.name}</p>
           <p>Position: {user.position}</p>
           <p>Salary: {user.salary}</p>
          </div>
         ) : (
          <Spinner />
        )} 
        <br />
        <div className="btn btn-primary" onClick={()=>navigate("/users")}>Go to users page</div>
      </div>
    </>
  );
};

export default UserDetails;
