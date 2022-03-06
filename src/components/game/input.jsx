import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { searchCity } from "../../actions/geo_actions";
import {getDistance, pinLoc} from "../../util/distance";
import Targets from "../../util/target_cities";
import cityDisplay from "../../util/city_display";
import World from "../../img/world.png"
import Map from "./map";


const mSTP = state => ({
  cityResults: state.entities.cities,
  errors: state.errors.search
})

const mDTP = dispatch => ({
  searchCity: searchTerm => dispatch(searchCity(searchTerm))
})

const Input = props => {
  const [cities, setCities] = useState([])
  const [mapPins, setMapPins] = useState([])
  const [city, setCity] = useState("")
  const [won, setWon] = useState(false)
  const [winPin, setWinPin] = useState([])
  const [targetCity, setTargetCity] = useState(Targets[Math.floor(Math.random() * Targets.length)])
  const {searchCity, cityResults, errors} = props
  const cityArray = Object.keys(cityResults)
  const searchBar = useRef()
  const target = cityResults[targetCity]

  useEffect(() => {
    if (!target){
      searchCity(targetCity)
    }
    if (searchBar.current) {
      searchBar.current.focus()
    }
  }, [targetCity, won])

  const handleChange = e => {
    setCity(e.target.value)
  }

  const submitCity = e => {
    e.preventDefault()
    if (cityResults[city] === target) {
      setWon(true)
      setWinPin([target.latitude, target.longitude])
    } else if (!cityResults[city]) {
      searchCity(city)
        .then(res => {
          setMapPins([...mapPins, pinLoc(res.city.latitude, res.city.longitude)])
        }
        )
    }
    setCities([city, ...cities])
    setCity("")
  }

  function reset() {
    setCities([])
    setWon(false)
    setTargetCity(Targets[Math.floor(Math.random() * Targets.length)])
  }

  let curCity = {}

  if (errors[429]) {
    return (
      <div>
        <h1>Citadle</h1>
        <p className="error">Error: Daily API Limit reached!</p>
      </div>
    )
  }

  return (
    <>
    <div className='inputwrap'>
      <h1>Citadle</h1>
      
      {won === false ? <form onSubmit={submitCity}>
        <label htmlFor="city">Guess a City:</label>
        <input type="text" onChange={handleChange} value={city} ref={searchBar} />
        <button onClick={submitCity}>Guess</button>
        </form> : <div>{`Winner with ${cities.length} guesses!`}</div>}

      <div className="worldDiv">
          <img src={World} className="worldMap" alt="world-map" />
          <Map mapPins={mapPins} winPin={winPin} /> 
      </div>
      <section className="cities">
        <table className="cityTable">
          <thead>
            <tr className="headerRow">
              <th className="distanceHead">Target Distance 📍</th>
              <th className="cityHead">Guessed City 🏙️</th>
            </tr>
          </thead>
        <tbody>
        {cities.map((cityInd, i) => {
          curCity = cityResults[cityInd]
          if (curCity) {
            return(
              <tr key={i} className="cityRow">
                  <td className="cityInfo">{ 
                    getDistance(curCity.latitude, curCity.longitude, target.latitude, target.longitude)
                  }
                  </td>
                {cityDisplay(curCity.city)}
              </tr>
            )
          } else if (cityArray.includes(cityInd)) {
            return(
              <tr key={i} className="cityRow">
                <td className="cityInfo">
                  City not found
                </td>
                {cityDisplay(cityInd)}
              </tr>
            )
          } else {
            return (
              <tr key={i} className="cityRow">
                <td className="cityInfo">
                  Searching
                </td>
                {cityDisplay(cityInd)}
              </tr>
            )
          }
        })}
      </tbody>
      </table>
      </section>
      <div className="replay">
        {won ? <button onClick={() => reset()}>Play Again</button> : null}
      </div>
    </div>
    </>
  )
}

export default connect(mSTP, mDTP)(Input)