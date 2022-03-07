import React, {useEffect} from "react";
import { Link } from "react-router-dom";
import { clearErrors } from "../actions/geo_actions";
import { connect } from "react-redux";
import { Button, Paper } from "@mui/material"

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
    <Paper>
      <div className="splashwrap">
        <h1>CAPIDLE</h1>
        <h3>The 🌎 🏙️ Guessing Game</h3>
        <p className="gameinfo">
          Test your geography skills! Enter a city
          name, and see how far away that city is from the (secret!) target city.
          How quickly can you guess the target?
        </p>
        <div>
          <Link to='/play'><Button variant="contained">Play</Button></Link>
        </div>
      </div>
    <div className="spacer"></div>
    </Paper>
  )
}

export default connect(mSTP, mDTP)(Splash)