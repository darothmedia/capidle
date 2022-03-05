import React from "react";
import { Link } from "react-router-dom";

const Nav = props => {
  return(
    <div className="nav">
    <Link to='/'><button>Home</button></Link>
    {/* <Link to='/howtoplay'><button>How to Play</button></Link> */}
    </div>
  )
}

export default Nav