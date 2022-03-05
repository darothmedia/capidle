import React, {useEffect} from "react";
import { Link } from "react-router-dom";
import { clearErrors } from "../actions/geo_actions";
import { connect } from "react-redux";

const mSTP = state => ({})
const mDTP = dispatch => ({
  clearErrors: () => dispatch(clearErrors())
})

const Splash = props => {
  const {clearErrors} = props
  useEffect(() => {
    clearErrors()
  }, [clearErrors])

  return(
    <div id='splashwrap'>
      <h1>Citadle</h1>
      <h3>The 🌎 🏙️ Guessing Game</h3>
      <p className="gameinfo">
        Tests your geography skills! Enter a city
        name, and see how far away that city is from the (secret!) target city.
        How quickly can you guess the target?
      </p>
      <div>
        <Link to='/play'><button>Play</button></Link>
      </div>
    </div>
  )
}

export default connect(mSTP, mDTP)(Splash)