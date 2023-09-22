import logo from "./logo.svg";
import "./App.css";
import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/@fortawesome/fontawesome-free/css/all.min.css";
import { Routes, Route } from "react-router-dom";
import StudentList from "./components/student/StudentList";
import StudentDetail from "./components/student/StudentDetail";
import CreateStudent from "./components/student/CreateStudent";
import Layout from './components/layout'
import EditStudent from "./components/student/EditStudent";

function App() {
  return (
    <>
      <Routes>
        <Route path="" element={<Layout />}> 
          <Route path="/" element={<StudentList />} />
          <Route path="/student/list" element={<StudentList />} />
          <Route
            path="/student/detail/:studentId"
            element={<StudentDetail />}
          />
          <Route path="/student/create" element={<CreateStudent />} />
          <Route path="/student/edit/:studentId" element={<EditStudent />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
