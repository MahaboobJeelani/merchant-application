import React from 'react';
import { Routes, Route } from 'react-router-dom';
import CreateData from "../Components/CreateData";
import FetchData from "../Components/FetchData";
import Home from "../Components/Home";
import EditData from "../Components/EditData";
import Profile from './Profile';

const Merchantmain = () => {
  return (
    <div>
      <Home />
      <Routes>
        <Route path="/create" element={<CreateData />} />
        <Route path="/fetch" element={<FetchData />} />
        <Route path="/edit/:_id" element={<EditData />} />
        <Route path='/profile' element={<Profile />} />
      </Routes>
    </div>
  );
};

export default Merchantmain;
