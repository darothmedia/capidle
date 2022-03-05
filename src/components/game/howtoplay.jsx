import React from "react";
import { Link } from "react-router-dom";

const HowToPlay = props => {
  return(
    <div>
      <h1>How to Play Citadle</h1>
      <p className="gameinfo">
        Citadle tests your knowledge of geography and global cities. Enter a city
        name, and see how far away that city is from the (secret!) target city.
        Arrows indicate the general direction from your guess to the target.
        How quickly can you guess the target city?
      </p>
      <Link to='/play'><button>Play</button></Link>
    </div>
  )
}

export default HowToPlay