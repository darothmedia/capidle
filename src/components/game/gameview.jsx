import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { searchCity } from "../../actions/geo_actions";
import {getDistance, pinLoc} from "../../util/distance";
import {Capitals} from "../../util/target_cities";
import cityDisplay from "../../util/city_display";
import World from "../../img/world.png"
import Map from "./map";
import { ArrowBack, ArrowCircleRight } from "@mui/icons-material";
import { InputAdornment, IconButton, InputLabel, FormControl, Table, TableBody, TableHead, TableCell, TableRow, Paper, Button, Input } from "@mui/material";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
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
  const [gaveUp, setGaveUp] = useState(false)
  const [winPin, setWinPin] = useState([])
  const [metric, setMetric] = useState(false)
  const [targetCity, setTargetCity] = useState(Capitals[Math.floor(Math.random() * Capitals.length)])

  // const [gameState, setGameState] = useState({
  //   cities: [],
  //   mapPins: [],
  //   winPin: [],
  //   guess: "",
  //   won: false
  // })

  const {searchCity, cityResults, errors} = props
  const cityArray = Object.keys(cityResults)
  const target = cityResults[targetCity.toLowerCase()]

  useEffect(() => {
    if (!target){
      searchCity(targetCity)
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

  const metricToggle = [
    <ToggleButton value={false} key="false">
      MI
    </ToggleButton>,
    <ToggleButton value={true} key="true">
      KM
    </ToggleButton>
  ]

  function reset() {
    setCity("")
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

  const toggleChange = (e, value) => {
    setMetric(value)
  }

  if (errors[429]) {
    return (
      <Paper id='errorPaper'>
        <h1>CAPIDLE</h1>
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
      <h1>CAPIDLE</h1>
      <div id="toggleCont">
          <ToggleButtonGroup id="toggle" value={metric} onChange={toggleChange} exclusive={true}>
            {metricToggle}
          </ToggleButtonGroup>
      </div>
      <div className="worldDiv">
          <img src={World} className="worldMap" alt="world-map" />
          <Map mapPins={mapPins} winPin={winPin} cities={cities} /> 
      </div>
        {won === false && gaveUp === false ? <form onSubmit={submitCity}>
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
            <Button onClick={giveup}>Give Up?</Button>

          </FormControl>
        </form> : null}
        {won ? <div>{`Winner with ${cities.length} guesses!`}</div> : null}
        {gaveUp ? <div>{`Target City: ${targetCity}`}</div> : null}
        <div className="replay">
          {won || gaveUp ? <Button variant="contained" onClick={() => reset()}>Play Again</Button> : null}
        </div>
      <section className="cities">
        <Table id="cityTable">
          <TableHead>
            <TableRow id="headerRow">
              <TableCell id="distanceHead">Target Distance</TableCell>
                <TableCell id="cityHead">Guessed City 📍</TableCell>
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
                    {metric ? dist.km : dist.mi}
                    {" " + dist.card}
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
          } else if (!cityArray.includes(cityInd) && gaveUp === true) {
            return (
            <TableRow key={i} id="cityRow">
              <TableCell id="cityInfo">
                GAVE UP
              </TableCell>
              {cityDisplay(cityInd)}
            </TableRow>)
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