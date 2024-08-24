// import './App.css'
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Home from "./components/Home";
import Student from "./components/Student";
import Result from "./components/Result";
import Trackfee from "./components/Trackfee";
import Signup from "./components/Signup";
import View from "./components/View";
import Edit from "./components/ResultGenerate";
import Logout from "./components/Logout";
import ResultGenerate from "./components/ResultGenerate";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signup />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="" element={<Home />}></Route>
          <Route path="/dashboard/student" element={<Student />}></Route>
          <Route path="/dashboard/result" element={<Result />}></Route>
          <Route path="/dashboard/trackfee" element={<Trackfee />}></Route>
          <Route path="/dashboard/logout" element={<Logout/>}></Route>
          <Route path="/dashboard/student/View/:id" element={<View />}></Route>
          <Route
            path="/dashboard/student/view/edit/:id"
            element={<Edit />}
          ></Route>
              <Route path="/dashboard/result/resultgenerate/:id" element={<ResultGenerate />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
