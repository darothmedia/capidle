import React from "react";
import { Link } from "react-router-dom";

const Splash = props => {
  return(
    <div id='splashwrap'>
      <h1>Citadle</h1>
      <h3>The 🌎 🏙️ Guessing Game</h3>
      <Link to='/play'><button>Play</button></Link>
    </div>
  )
}

export default Splash