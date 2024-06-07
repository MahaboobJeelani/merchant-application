import { useEffect, useState } from "react";
import axios from 'axios';
import CreateData from "./Components/CreateData";
import FetchData from "./Components/FetchData";
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from "./Components/Home";
import EditData from "./Components/EditData";
import LoginPage from "./Components/LoginPage";
function App() {


  return (
    <div>
      <BrowserRouter>
        <Home />
        <Routes>
          <Route path="/" element={<CreateData />} />
          <Route path="/fetch" element={<FetchData />} />
          <Route path="/edit/:_id" element={<EditData />} />
        </Routes>
      </BrowserRouter>


      {/* <LoginPage/> */}
    </div>
  );
}

export default App;
