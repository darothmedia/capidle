import * as GeoUtil from '../util/geo_api_util'

export const RECEIVE_CITY = 'RECEIVE_CITY'
export const RECEIVE_ERRORS = 'RECEIVE_ERRORS'

export const receiveCity = city => ({
  type: RECEIVE_CITY,
  city
})

export const receiveErrors = errors => ({
  type: RECEIVE_ERRORS,
  errors
})

export const searchCity = searchTerm => dispatch => 
  GeoUtil.searchCity(searchTerm)
    .then((city) => dispatch(receiveCity(city)),
      errors => dispatch(receiveErrors(errors))
    );