import React from "react";
import { Route, Routes } from "react-router-dom";
import Input from "./game/input";
import Nav from "./nav";
import Splash from "./splash";
import HowToPlay from "./game/howtoplay";

const App = props => {
  return(
    <div className="outerwrap">
      <Nav />
      <div className="bodywrap">
        <Routes>
          <Route path='/' element={<Splash/>}/>
          <Route path='/play' element={<Input/>}/>
          <Route path='/howtoplay' element={<HowToPlay/>}/>
        </Routes>
      </div>
    </div>
  )
}

export default App