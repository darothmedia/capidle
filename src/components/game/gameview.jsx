import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { searchCity } from "../../actions/geo_actions";
import {pinLoc} from "../../util/distance";
import {Capitals} from "../../util/target_cities";
import {charLineup} from "../../util/city_display";
import World from "../../img/world.png"
import Map from "./map";
import { ArrowBack, ArrowCircleRight } from "@mui/icons-material";
import { InputAdornment, IconButton, InputLabel, FormControl, Paper, Button, Input, Tooltip } from "@mui/material";
import { Link } from "react-router-dom";
import Results from "./results";
// import GuessBar from "./guessbar";


const mSTP = state => ({
  cityResults: state.entities.cities,
  errors: state.errors.search
})

const mDTP = dispatch => ({
  searchCity: searchTerm => dispatch(searchCity(searchTerm))
})

const GameView = props => {
  // const [gameInfo, setGameInfo] = useState({
  //   cities: [],
  //   mapPins: [],
  //   won: false,
  //   gaveUp: false,
  //   metric: false
  // })
  const [cities, setCities] = useState([])
  const [mapPins, setMapPins] = useState([])
  const [city, setCity] = useState("")
  const [won, setWon] = useState(false)
  const [gaveUp, setGaveUp] = useState(false)
  const [winPin, setWinPin] = useState([])
  const [targetCity, setTargetCity] = useState(Capitals[Math.floor(Math.random() * Capitals.length)])

  const {searchCity, cityResults, errors} = props
  const target = cityResults[targetCity.toLowerCase()]

  useEffect(() => {
    if (!target){
      searchCity(targetCity)
        .then(res => console.log([res.city.latitude, res.city.longitude]))
    }
  }, [targetCity, searchCity, target])

  const handleChange = e => {
    setCity(e.target.value)
  }

  const submitCity = e => {
    e.preventDefault()
    if (!cityResults[city]) {
      searchCity(city)
        .then(res => {
          if (!res.city){}
          else if (res.city.id === target.id) {
            setWon(true)
            setWinPin([pinLoc(target.latitude, target.longitude)])
          } else {
            setMapPins([...mapPins, pinLoc(res.city.latitude, res.city.longitude)])
          }
        }
        )
    } else if (!cityResults[city].id){} 
    else if (cityResults[city].id === target.id) {
      setWon(true)
      setWinPin([pinLoc(target.latitude, target.longitude)])
    } else {
      setMapPins([...mapPins, pinLoc(cityResults[city].latitude, cityResults[city].longitude)])
    }     
    setCities([city, ...cities])
    setCity("")
  }

  function reset() {
    setCities([])
    setMapPins([])
    setWinPin([])
    setWon(false)
    setGaveUp(false)
    setTargetCity(Capitals[Math.floor(Math.random() * Capitals.length)])
  }

  const giveup = e => {
      setGaveUp(true)
      setCities([targetCity, ...cities])
      setWinPin([pinLoc(target.latitude, target.longitude)])
  }

  let curCity = {}
  let dist = {}

  if (errors[429]) {
    return (
      <Paper id='paperElement'>
        <div className="titleChars">
          {charLineup("capidle")}
        </div>
        <p className="error">Error: API Limit reached!</p>
      </Paper>
    )
  }

  return (
    <Paper id="paperElement" elevation={3} >
      <div className="arrowCont">
        <IconButton className="backArrow" >
          <Link to='/'><ArrowBack /></Link>
        </IconButton>
      </div>
    <div className='inputwrap'>
        <div className='titleChars'>
          {charLineup("capidle")}
        </div>
      
      <div className="worldDiv">
          <img src={World} className="worldMap" alt="world-map" />
          <Map mapPins={mapPins} winPin={winPin} cities={cities} /> 
      </div>
        {(won === false && gaveUp === false) ? 
        <form onSubmit={submitCity}>
          <FormControl sx={{ m: 1, width: '36ch', margin: '0px' }} id="formControl" variant="standard">
            <InputLabel htmlFor="guess">Guess a City</InputLabel>
            <Input
              id='guess'
              autoComplete="off"
              onChange={handleChange}
              type="search"
              value={city}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={submitCity}
                    edge="end"
                  ><ArrowCircleRight /></IconButton>
                </InputAdornment>
              }
            />
            {cities.length > 1 ?
              <Tooltip title="Hint: the target is always a capital!">
                <Button onClick={giveup} id='giveUp'>Give Up?</Button>
              </Tooltip> : null}
          </FormControl>
        </form> 
        : null}
        
        
        {won ? <div>{`Winner with ${cities.length} guesses!`}</div> : null}
        {gaveUp ? <div>{`Target City: ${targetCity}`}</div> : null}
        <div className="replay">
          {won || gaveUp ? <Button id='muiButton' variant="contained" onClick={() => reset()}>Play Again</Button> : null}
        </div>
      <section className="cities">
        <Results 
          cities={cities} 
          curCity={curCity} 
          target={target} 
          dist={dist} 
          gaveUp={gaveUp} />
      </section>
    </div>
    </Paper>
  )
}

export default connect(mSTP, mDTP)(GameView)