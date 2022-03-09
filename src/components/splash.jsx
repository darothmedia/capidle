import React, {useEffect} from "react";
import { Link } from "react-router-dom";
import { clearErrors } from "../actions/geo_actions";
import { connect } from "react-redux";
import { Button, Paper } from "@mui/material"
import { charLineup } from "../util/city_display";
import World from '../img/world.png'

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
        <div className="titleChars">
          {charLineup("capidle")}
        </div>
        <div className="worldDiv">
          <img src={World} className="worldMap" alt="world-map" />
        </div>
        <p className="gameinfo">
          Test your geography skills! 
          <br /><br />
          Enter a city name, and see how far away that city is from the secret target city.
          How quickly can you guess the target?
        </p>
        <div>
          <Link to='/play'><Button id='muiButton' variant="contained">Play</Button></Link>
        </div>
      </div>
    <div className="spacer"></div>
    </Paper>
  )
}

export default connect(mSTP, mDTP)(Splash)