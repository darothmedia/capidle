import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { searchCity } from "../../actions/geo_actions";
import getDistance from "../../util/distance";
import Targets from "../../util/target_cities";


const mSTP = state => ({
  cityResults: state.entities.cities
})

const mDTP = dispatch => ({
  searchCity: searchTerm => dispatch(searchCity(searchTerm))
})

const Input = props => {
  const [cities, setCities] = useState([])
  const [city, setCity] = useState("")
  const [won, setWon] = useState(false)
  const [targetCity, setTargetCity] = useState(Targets[Math.floor(Math.random() * Targets.length)])
  const {searchCity, cityResults} = props

  useEffect(() => {
    searchCity(targetCity)
  }, [])

  const handleChange = e => {
    setCity(e.target.value)
  }

  const submitCity = e => {
    e.preventDefault()
    if (cityResults[city]) {
      setWon(true)
    } else {
      searchCity(city)
    }
    setCities([city, ...cities])
    setCity("")
  }

  let curCity = {}
  const target = cityResults[targetCity]

  return (
    <div id='inputwrap'>
      <h1>Citadle</h1>
      {!won ? <form onSubmit={submitCity}>
        <input type="text" onChange={handleChange} value={city} />
      </form> : `Winner with ${cities.length} guesses!`}
      
      <section className="cities">
        {cities.map((city, i) => {
          curCity = cityResults[city]
          return(
          <div key={i} className="citywrap">
              {curCity ? 
                getDistance(curCity.latitude, curCity.longitude, target.latitude, target.longitude) : null}
            {city.toUpperCase().split('').map(
            (char, i) => {
              if (char === " ") {
                return (
                  <div key={`c${i}`} className="blank">{char}</div>
                )
              }
              return (
                <div key={`c${i}`} className="char">{char}</div>
              )
            }
          )}</div>
        )})}
      </section>
    </div>
  )
}

export default connect(mSTP, mDTP)(Input)