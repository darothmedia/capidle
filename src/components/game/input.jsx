import React, { useState } from "react";

const Input = props => {
  const [cities, setCities] = useState([])
  const [city, setCity] = useState("")

  const handleChange = e => {
    setCity(e.target.value)
  }

  const submitCity = e => {
    e.preventDefault()
    setCities([...cities, city])
    setCity("")
  }

  return (
    <div id='inputwrap'>
      <h1>Citadle</h1>
      <form onSubmit={submitCity}>
        <input type="text" onChange={handleChange} value={city} />
      </form>
      <section className="cities">
        {cities.map((city, i) => {
          if (city.length % 2 !== 0) {city = city + " "}
          return(
          <div key={i} className="citywrap">{city.toUpperCase().split('').map(
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

export default Input