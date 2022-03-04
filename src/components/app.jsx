import React from "react";
import { Route, Routes } from "react-router-dom";
import Input from "./game/input";
import Splash from "./splash";

const App = props => {
  return(
    <div className="outerwrap">
      <div className="bodywrap">
        <Routes>
          <Route path='/' element={<Splash/>}/>
          <Route path='/play' element={<Input/>}/>
        </Routes>
      </div>
    </div>
  )
}

export default App