import React from "react";
import { Route, Routes } from "react-router-dom";
import Splash from "./splash";

const App = props => {
  return(
    <div className="outerwrap">
      <div className="bodywrap">
        <Routes>
          <Route path='/' element={<Splash/>}/>
        </Routes>
      </div>
    </div>
  )
}

export default App