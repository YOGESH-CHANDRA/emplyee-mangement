import React from "react";
import { useNavigate } from "react-router-dom";

const Page404 = () => {
    const navigate=useNavigate();
  return (
    <>
      <div className="container vh-100 d-flex flex-column justify-content-center align-items-center">
        <h1>404</h1>
        <h2>Page Not Found</h2>
        <div className="btn btn-primary" onClick={()=>navigate("/users")}>Return to users page</div>
      </div>
    </>
  );
};

export default Page404;