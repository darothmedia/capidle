import { combineReducers } from "redux"
import CitiesReducer from "./cities_reducer"

const EntitiesReducer = combineReducers({
  cities: CitiesReducer
})

export default EntitiesReducer