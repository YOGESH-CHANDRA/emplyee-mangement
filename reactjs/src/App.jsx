import Home from "../src/pages/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import Users from "./pages/Users";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Create from "./pages/Create";
import Update from "./pages/Update";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Page404 from "./pages/Page404";
import UserDetails from "./pages/UserDetails";

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<UserDetails />} />
        <Route path="/create" element={<Create />} />
        <Route path="/update/:id" element={<Update />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </BrowserRouter>
      <ToastContainer/>
    </>
  );
}

export default App;
