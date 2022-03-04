import { RECEIVE_ERRORS } from "../../actions/geo_actions"

const SearchErrorsReducer = (state = {}, action) => {
  Object.freeze(state)
  let nState = Array.from(state)
  switch (action.type) {
    case RECEIVE_ERRORS:
      return Object.assign({}, state, {[action.errors.status]: action.errors.data.message})
    default:
      return state
  }
}

export default SearchErrorsReducer