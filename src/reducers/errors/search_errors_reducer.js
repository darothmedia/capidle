import { CLEAR_ERRORS, RECEIVE_ERRORS } from "../../actions/geo_actions"

const SearchErrorsReducer = (state = {}, action) => {
  Object.freeze(state)
  switch (action.type) {
    case RECEIVE_ERRORS:
      return Object.assign({}, state, {[action.errors.status]: action.errors.data.message})
    case CLEAR_ERRORS:
      return {}
    default:
      return state
  }
}

export default SearchErrorsReducer