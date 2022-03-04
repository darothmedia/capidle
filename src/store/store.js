import RootReducer from "../reducers/root_reducer";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { applyMiddleware, createStore } from "redux";

const configureStore = (pState = {}) => (
  createStore(RootReducer, pState, applyMiddleware(thunk, logger))
)

export default configureStore