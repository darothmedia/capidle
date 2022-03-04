import axios from "axios";
import { APIkey } from "../config";

//REMEMBER: You need to update the config file if pushing to production

const options = (searchTerm) => {
  return({
    method: 'GET',
    url: `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?limit=1&offset=0&namePrefix=${searchTerm}&sort=-population`,
    headers: {
      'x-rapidapi-key': APIkey,
      'x-rapidapi-host': 'wft-geo-db.p.rapidapi.com'
    }
  })
  
}

export const searchCity = searchTerm => (
  axios.request(options(searchTerm))
)