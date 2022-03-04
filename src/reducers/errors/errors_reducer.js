import { combineReducers } from "redux"
import SearchErrorsReducer from "./search_errors_reducer"

const ErrorsReducer = combineReducers({
  search: SearchErrorsReducer
})

export default ErrorsReducer