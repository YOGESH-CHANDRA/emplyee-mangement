import axios from "axios";
import React, { useEffect, useState } from "react";
import { API } from "../api";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../Spinner";

const Update = () => {
  const [user, setUser] = useState({ id: "", name: "", position: "", salary:"" });
  const [loading, setLoading] = useState(0);
  const { id } = useParams();
  const navigate = useNavigate();



  const changeHandle = (e) => {
    const { name, value } = e.target;
    setUser((pre) => ({ ...pre, [name]: value }));
  };

  const sumbitHandle = async (e) => {
    e.preventDefault();
    setLoading(1);
    try {
      if (!user.name || !user.position || !user.salary) {
        throw new Error("All field required");
      }
      const res = await axios.patch(API + `/${id}`, user);
      console.log(res)
      if (res.status == 200) {
        toast.success(`User id :  ${res.data.updatedEmployee.id} update succesfully `);
        setUser({ name: "", position: "", salary: "" });
        setLoading(0);
        navigate("/users");
      } else {
        throw new Error("Error during register");
      }
    } catch (error) {
      toast.error(error.message);
      setLoading(0);
    }
  };

  useEffect(() => {
    axios.get(API + `/${id}`).then((res) => {
      console.log(res.data),
        setUser({
          name: res.data.name,
          position: res.data.position,
          salary: res.data.salary,
        });
    });
  }, []);
  return (
    <>
      <div className="text-center mt-4 p-3">
        <h1 className="bg-info">Update Details (User id : {id})</h1>
        {!loading ? (
          <form onSubmit={sumbitHandle} className="m-auto">
            <input
              type="text"
              className="col-10 col-lg-6 my-2"
              name="name"
              placeholder="Enter the name"
              value={user.name}
              onChange={changeHandle}
            />
            <br />
            <input
              type="text"
              className="col-10 col-lg-6 my-2"
              name="position"
              placeholder="Enter the position"
              value={user.position}
              onChange={changeHandle}
                required
            />
            <br />

            <input
              type="number"
              className="col-10 col-lg-6 my-2"
              name="salary"
              placeholder="Enter the salary"
              value={user.salary}
              onChange={changeHandle}
              min={0}
            />
            <br />
            <input
              type="submit"
              className="btn btn-primary"
              required
              autoComplete="true"
            />
             <div className="btn btn-primary m-3" onClick={()=>navigate("/users")}>Go to users page</div>
          </form>
        ) : (
          <Spinner />
        )}
      </div>
    </>
  );
};

export default Update;
