import React, { useState } from "react";
import { connect } from "react-redux";
import { searchCity } from "../../actions/geo_actions";
import getDistance from "../../util/distance";

const mSTP = state => ({
  cityResults: state.entities.cities
})

const mDTP = dispatch => ({
  searchCity: searchTerm => dispatch(searchCity(searchTerm))
})

const Input = props => {
  const [cities, setCities] = useState([])
  const [city, setCity] = useState("")
  const {searchCity, cityResults} = props

  const handleChange = e => {
    setCity(e.target.value)
  }

  const submitCity = e => {
    e.preventDefault()
    searchCity(city)
    setCities([...cities, city])
    setCity("")
  }

  let curCity = {}

  return (
    <div id='inputwrap'>
      <h1>Citadle</h1>
      <form onSubmit={submitCity}>
        <input type="text" onChange={handleChange} value={city} />
      </form>
      <section className="cities">
        {cities.map((city, i) => {
          curCity = cityResults[city]
          return(
          <div key={i} className="citywrap">
              {curCity ? 
                getDistance(curCity.latitude, curCity.longitude, 40.730610, -73.935242) : null}
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