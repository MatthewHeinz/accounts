import React from "react";
import {Routes, Route} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ShowAccounts from "./pages/ShowAccounts";
import EditAccount from "./pages/EditAccount";
import DeleteAccount from "./pages/DeleteAccount";

const App = () => {
  return (
    <Routes>
      <Route path="/" element = {<Login />} />                            
      <Route path="/Register" element = {<Register />} />                 {/* Create */}
      <Route path="/accounts/show/:id" element = {<ShowAccounts />} />    {/* Read */}
      <Route path="/accounts/edit/:id" element = {<EditAccount />} />     {/* Update */}
      <Route path="/accounts/delete/:id" element = {<DeleteAccount />} /> {/* Delete */}
    </Routes>
  );
}

export default App;
