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
  const [targetCity] = useState(Targets[Math.floor(Math.random() * Targets.length)])
  const {searchCity, cityResults} = props

  useEffect(() => {
    searchCity(targetCity)
  }, [])

  const handleChange = e => {
    setCity(e.target.value)
  }

  const submitCity = e => {
    e.preventDefault()
    if (cityResults[city] === cityResults[targetCity]) {
      setWon(true)
    } else if (!cityResults[city]) {
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
        <label htmlFor="city">Guess a City:</label>
        <input type="text" onChange={handleChange} value={city} />
        <button onClick={submitCity}>Guess</button>
      </form> : `Winner with ${cities.length} guesses!`}
      
      <section className="cities">
        <table className="cityTable">
          <thead>
            <tr>
              <th className="distanceCell">Target Distance</th>
              <th className="cityCell">Guessed City</th>
            </tr>
          </thead>
        <tbody>
        {cities.map((city, i) => {
          curCity = cityResults[city]
          return(
          <tr key={i}>
          {/* <div className="citywrap"> */}
              <td className="cityInfo">{curCity ? 
                getDistance(curCity.latitude, curCity.longitude, target.latitude, target.longitude) : null}</td>
            <td className='cityName'>
            {city.toUpperCase().split('').map(
            (char, i) => {
              if (char === " ") {
                return (
                  <p key={`c${i}`} className="blank">{char}</p>
                )
              }
              return (
                <p key={`c${i}`} className="char">{char}</p>
              )
            }
          )}
              </td>
          {/* </div> */}
          </tr>
        )})}
      </tbody>
      </table>
      </section>
    </div>
  )
}

export default connect(mSTP, mDTP)(Input)