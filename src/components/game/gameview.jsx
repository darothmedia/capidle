import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { searchCity } from "../../actions/geo_actions";
import {getDistance, pinLoc} from "../../util/distance";
import Targets from "../../util/target_cities";
import cityDisplay from "../../util/city_display";
import World from "../../img/world.png"
import Map from "./map";
import { ArrowBack, ArrowCircleRight } from "@mui/icons-material";
import { InputAdornment, IconButton, InputLabel, FormControl, FilledInput, Table, TableBody, TableHead, TableCell, TableRow, Paper, Button, Input } from "@mui/material";
import { Link } from "react-router-dom";


const mSTP = state => ({
  cityResults: state.entities.cities,
  errors: state.errors.search
})

const mDTP = dispatch => ({
  searchCity: searchTerm => dispatch(searchCity(searchTerm))
})

const GameView = props => {
  const [cities, setCities] = useState([])
  const [mapPins, setMapPins] = useState([])
  const [city, setCity] = useState("")
  const [won, setWon] = useState(false)
  const [winPin, setWinPin] = useState([])
  const [targetCity, setTargetCity] = useState(Targets[Math.floor(Math.random() * Targets.length)])

  const [gameState, setGameState] = useState({
    cities: [],
    mapPins: [],
    winPin: [],
    guess: "",
    won: false,
    targetCity: Targets[Math.floor(Math.random() * Targets.length)]
  })


  const {searchCity, cityResults, errors} = props
  const cityArray = Object.keys(cityResults)
  const target = cityResults[targetCity]

  useEffect(() => {
    if (!target){
      searchCity(targetCity)
    }
  }, [targetCity, won])

  const handleChange = e => {
    // setGameState({...gameState, guess: e.target.value})
    setCity(e.target.value)
  }

  const submitCity = e => {
    e.preventDefault()
    if (!cityResults[city]) {
      searchCity(city)
        .then(res => {
          if (!res.city){}
          else if (res.city.id === target.id) {
            // setGameState({...gameState, won: true, winPin: [pinLoc(target.latitude, target.longitude)]})
            setWon(true)
            setWinPin()
          } else {
            // setGameState({...gameState, mapPins: [...mapPins, pinLoc(res.city.latitude, res.city.longitude)]})
            setMapPins([...mapPins, pinLoc(res.city.latitude, res.city.longitude)])
          }
        }
        )
    } else if (!cityResults[city].id){} 
    else if (cityResults[city].id === target.id) {
      setWon(true)
      setWinPin([pinLoc(target.latitude, target.longitude)])
      // setGameState({ ...gameState, won: true, winPin: [pinLoc(target.latitude, target.longitude)] })
    } 
    // setGameState({ ...gameState, cities: [...cities, city]})
    // console.log(gameState)
    
    setCities([city, ...cities])
    // setGameState({...gameState, guess: ""})
    setCity("")

  }

  function reset() {
    // setGameState({ ...gameState, cities: [], mapPins: [], winPin: [], won: false, targetCity: Targets[Math.floor(Math.random() * Targets.length)]})
    setCities([])
    setMapPins([])
    setWinPin([])
    setWon(false)
    setTargetCity(Targets[Math.floor(Math.random() * Targets.length)])
  }

  let curCity = {}
  let dist = {}

  if (errors[429]) {
    return (
      <div>
        <h1>Citadle</h1>
        <p className="error">Error: Daily API Limit reached!</p>
      </div>
    )
  }

  return (
    <Paper className="paperElement" elevation={3}>
      <div className="arrowCont">
        <IconButton className="backArrow" >
          <Link to='/'><ArrowBack /></Link>
        </IconButton>
      </div>
    <div className='inputwrap'>
      <h1>Citadle</h1>
      {won === false ? <form onSubmit={submitCity}>
      <FormControl sx={{ m: 1, width: '28ch', margin: '0px' }} variant="standard">
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
          </FormControl>
        
        
        </form> : <div>{`Winner with ${cities.length} guesses!`}</div>}
        <div className="replay">
          {won ? <Button variant="contained" onClick={() => reset()}>Play Again</Button> : null}
        </div>

      <div className="worldDiv">
          <img src={World} className="worldMap" alt="world-map" />
          <Map mapPins={mapPins} winPin={winPin} cities={cities} /> 
      </div>
      <section className="cities">
        <Table className="cityTable">
          <TableHead>
            <TableRow id="headerRow">
              <TableCell id="distanceHead">Target Distance 📍</TableCell>
              <TableCell id="cityHead">Guessed City 🏙️</TableCell>
            </TableRow>
          </TableHead>
        <TableBody id="tableBody">
        {cities.map((cityInd, i) => {
          curCity = cityResults[cityInd]
          if (curCity) {
            dist = getDistance(curCity.latitude, curCity.longitude, target.latitude, target.longitude)
            return(
              <TableRow key={i} id="cityRow">
                  {dist.message ? 
                  <TableCell id="cityInfo">
                    {dist.message}
                  </TableCell>
                  : <TableCell id="cityInfo">
                    {dist.mi} {dist.card}
                  </TableCell>
                  }
                {cityDisplay(curCity.city)}
              </TableRow>
            )
          } else if (cityArray.includes(cityInd)) {
            return(
              <TableRow key={i} id="cityRow">
                <TableCell id="cityInfo">
                  City not found
                </TableCell>
                {cityDisplay(cityInd)}
              </TableRow>
            )
          } else {
            return (
              <TableRow key={i} id="cityRow">
                <TableCell id="cityInfo">
                  Searching
                </TableCell>
                {cityDisplay(cityInd)}
              </TableRow>
            )
          }
        })}
      </TableBody>
      </Table>
      </section>
    </div>
    </Paper>
  )
}

export default connect(mSTP, mDTP)(GameView)