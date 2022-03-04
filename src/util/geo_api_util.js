import axios from "axios";

export const searchCity = searchTerm => (
  axios.get(`https://wft-geo-db.p.rapidapi.com/v1/geo/cities?limit=1&offset=0&namePrefix=${searchTerm}&sort=-population`)
)