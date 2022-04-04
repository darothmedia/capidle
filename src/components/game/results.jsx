import React, {useState} from "react"
import { cityDisplay } from "../../util/city_display";
import { Table, TableBody, TableHead, TableCell, TableRow} from "@mui/material";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { getDistance } from "../../util/distance";
import { connect } from "react-redux";
import { searchCity } from "../../util/geo_api_util";

const mSTP = state => ({
  cityResults: state.entities.cities,
  errors: state.errors.search
})

const mDTP = dispatch => ({
  searchCity: searchTerm => dispatch(searchCity(searchTerm))
})

const Results = (props) => {
  const [metric, setMetric] = useState(false)

  const toggleChange = (e, value) => {
    setMetric(value)
  }

  let {cities, dist, curCity, gaveUp, target, targetCity, cityResults} = props
  const cityArray = Object.keys(cityResults)

  const metricToggle = [
    <ToggleButton value={false} key="false" id="toggleButton">
      MI
    </ToggleButton>,
    <ToggleButton value={true} key="true" id="toggleButton">
      KM
    </ToggleButton>
  ]

  return(
    <Table id="cityTable">
      <TableHead>
        <TableRow id="headerRow">
          <TableCell id="distanceHead">Target Distance</TableCell>
          <TableCell id="cityHead">
            Guessed City 📍
            <div id="toggleCont">
              <ToggleButtonGroup size="small" id="toggle" value={metric} onChange={toggleChange} exclusive={true}>
                {metricToggle}
              </ToggleButtonGroup>
            </div>
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody id="tableBody">
        {cities.map((cityInd, i) => {
          curCity = cityResults[cityInd.toLowerCase()]
          if (cityInd === targetCity && gaveUp === true) {
            return (
              <TableRow key={i} id="cityRow">
                <TableCell id="cityInfo">
                  GAVE UP
                </TableCell>
                {cityDisplay(cityInd)}
              </TableRow>)
          } else
            if (curCity) {
              dist = getDistance(curCity.latitude, curCity.longitude, target.latitude, target.longitude)
              return (
                <TableRow key={i} id="cityRow">
                  {dist.message ?
                    <TableCell id="cityInfo">
                      {dist.message}
                    </TableCell>
                    :
                    <TableCell id="cityInfo">
                      {metric ? dist.km : dist.mi}
                      {" " + dist.card}
                    </TableCell>
                  }
                  {cityDisplay(curCity.city)}
                </TableRow>
              )
            } else if (cityArray.includes(cityInd.toLowerCase())) {
              return (
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
  )
}

export default connect(mSTP, mDTP)(Results)

