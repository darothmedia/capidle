import { RECEIVE_CITY } from "../actions/geo_actions"

const CitiesReducer = (state = {}, action) => {
  Object.freeze(state)
  switch(action.type) {
    case RECEIVE_CITY:
      return Object.assign({}, state, {[action.searchTerm.toLowerCase()]: action.city} )
    default:
      return state
  }
}

export default CitiesReducer