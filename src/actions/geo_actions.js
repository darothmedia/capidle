import * as GeoUtil from '../util/geo_api_util'

export const RECEIVE_CITY = 'RECEIVE_CITY'
export const RECEIVE_ERRORS = 'RECEIVE_ERRORS'
export const CLEAR_ERRORS = 'CLEAR_ERRORS'

export const receiveCity = (city, searchTerm) => ({
  type: RECEIVE_CITY,
  city,
  searchTerm
})

export const receiveErrors = errors => ({
  type: RECEIVE_ERRORS,
  errors
})

export const clearErrors = () => ({
  type: CLEAR_ERRORS
})

export const searchCity = searchTerm => dispatch => 
  GeoUtil.searchCity(searchTerm)
    .then((city) => dispatch(receiveCity(city.data.data[0], searchTerm)),
      errors => dispatch(receiveErrors(errors.response))
    );