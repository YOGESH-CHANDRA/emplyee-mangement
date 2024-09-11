import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { API } from "../api";
import axios from "axios";
import { MdOutlineDeleteForever } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import Spinner from "../Spinner";
import { toast } from "react-toastify";
import { FcViewDetails } from "react-icons/fc";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(0);
  const navigate = useNavigate();

  const editHandle = (id) => {
    navigate(`/update/${id}`);
  };

  const deleteHandle = async (id) => {
    setLoading(1);
    try {
      const restData = users.filter((user) => user.id !== id);
      setUsers(restData);
      const res = await axios.delete(API + `/${id}`);

      if (res.status == 200) {
        const restData = users.filter((user) => user.id !== id);
        setUsers(restData);
        setLoading(0);
        toast.success(`User id: ${id} delete succesfully`);
      } else {
        throw new Error("User not deleted");
      }
    } catch (err) {
      toast.error(err.message);
      setLoading(0);
    }
  };

  useEffect(() => {
    axios.get(API).then((res) => setUsers(res.data));
  }, []);
  return (
    <div className="container">
      <h1 className="my-4 text-center bg-info">List of Users</h1>

      <div className="btn btn-primary" onClick={() => navigate("/create")}>
        Add User +
      </div>
      <div>
        {users.length > 0 && !loading ? (
          <div className="table-responsive">
            <table className="table table-striped my-3">
              <thead>
                <tr>
                  <th scope="col">Id</th>
                  <th scope="col" >Name</th>
                  <th scope="col" >Position</th>
                  <th scope="col">Salary (Monthly)</th>
                  {/* <th scope="col">Details</th>
                  <th scope="col">Edit</th>
                  <th scope="col">Delete</th> */}
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={user.id}>
                    <th scope="row">{user.id}</th>

                    <td className="text-capatilize">{user.name}</td>
                    <td className="text-capatilize"> {user.position}</td>

                    <td>Rs. {user.salary} /-</td>
                    <td
                      className="btn text-primary"
                      onClick={() => navigate(`/users/${user.id}`)}
                    >
                      <FcViewDetails size={"2rem"} />
                    </td>
                    <td
                      className="text-primary btn"
                      onClick={() => editHandle(user.id)}
                    >
                      <FaRegEdit size={"1.3rem"} />
                    </td>
                    <td
                      className="text-danger btn"
                      onClick={() => deleteHandle(user.id)}
                    >
                      <MdOutlineDeleteForever size={"1.6rem"} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  );
};

export default Users;
