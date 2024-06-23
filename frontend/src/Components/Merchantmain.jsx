// import React from 'react'
// import { BrowserRouter, Route, Routes } from 'react-router-dom'
// import CreateData from "../Components/CreateData";
// import FetchData from "../Components/FetchData";
// import Home from "../Components/Home";
// import EditData from "../Components/EditData";

// const Merchantmain = () => {
//     return (
//         <div>
//             <Home />
//             <Routes>
//                 <Route path="/create" element={<CreateData />} />
//                 <Route path="/fetch" element={<FetchData />} />
//                 <Route path="/edit/:_id" element={<EditData />} />
//             </Routes>

//         </div>
//     )
// }

// export default Merchantmain

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import CreateData from "../Components/CreateData";
import FetchData from "../Components/FetchData";
import Home from "../Components/Home";
import EditData from "../Components/EditData";

const Merchantmain = () => {
  return (
    <div>
      <Home />
      <Routes>
        <Route path="/create" element={<CreateData />} />
        <Route path="/fetch" element={<FetchData />} />
        <Route path="/edit/:_id" element={<EditData />} />
      </Routes>
    </div>
  );
};

export default Merchantmain;
