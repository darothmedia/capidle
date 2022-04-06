import React, {useState} from "react";
import { connect } from "react-redux";
import { InputAdornment, IconButton, InputLabel, FormControl, Button, Input, Tooltip } from "@mui/material";
import { ArrowCircleRight } from "@mui/icons-material";
import { searchCity } from "../../actions/geo_actions";

const mSTP = state => ({
  cityResults: state.entities.cities
})

const mDTP = dispatch => ({
  searchCity: searchTerm => dispatch(searchCity(searchTerm))
})

const GuessBar = props => {
  const {searchCity, cityResults, pinLoc, setMapPins, setCities, setWinPin, target, mapPins, cities, giveup} = props
  const [guessInfo, setGuessInfo] = useState({
    won: false,
    city: ""
  })
  const {city} = guessInfo

  const submitCity = e => {
    e.preventDefault()
    if (!cityResults[city]) {
      searchCity(city)
        .then(res => {
          if (!res.city) { }
          else if (res.city.id === target.id) {
            setGuessInfo({...guessInfo, won: true})
            setWinPin([pinLoc(target.latitude, target.longitude)])
          } else {
            setMapPins([...mapPins, pinLoc(res.city.latitude, res.city.longitude)])
          }
        }
        )
    } else if (!cityResults[city].id) { }
    else if (cityResults[city].id === target.id) {
      setGuessInfo({ ...guessInfo, won: true })
      setWinPin([pinLoc(target.latitude, target.longitude)])
    } else {
      setMapPins([...mapPins, pinLoc(cityResults[city].latitude, cityResults[city].longitude)])
    }
    setCities([city, ...cities])
    setGuessInfo({ ...guessInfo, city: "" })
  }

  const handleChange = e => {
    setGuessInfo({ ...guessInfo, city: e.target.value })
  }

  return (
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
  )
}

export default connect(mSTP, mDTP)(GuessBar)