export const getDistance = (lat1, lon1, lat2, lon2) => {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2 - lat1);  // deg2rad below
  var dLon = deg2rad(lon2 - lon1);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2)
    ;
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var km = Math.floor(R * c); // Distance in km
  var mi = Math.floor(0.621371 * km)
  let card = ""
  let lat = lat1 - lat2
  let long = lon1 - lon2

  lat > 0 ? card = "S" : card = "N"

  // if (card = "WE") {
  //   if ((long > 0) && card === "WE") { card = "⬅" }
  //   if ((long < 0) && card === "WE") { card = "➡️" }
  // } else if (-50 < long < 50) {
  //   if ((-50 < long < 50) && card === "S") { card = "⬇" }
  //   if ((-50 < long < 50) && card === "N") { card = "⬆" }
  // } else {
    if ((long > 0) && card === "S") { card = "↙️" }
    if ((long < 0) && card === "S") { card = "↘️" }
    if ((long > 0) && card === "N") { card = "↖️" }
    if ((long < 0) && card === "N") { card = "↗️" }
  // }
  
  if (mi === 0) {return {message: "YOU WIN"}}
  else { return {mi: mi + " mi", km: km + " km", card: card};}
}

function deg2rad(deg) {
  return deg * (Math.PI / 180)
}

export const pinLoc = (lat, long) => {
  let pin = []
  lat > 0 ? 
    pin.push(88 - (lat / 90 * 88)) :
    pin.push(88 + ((lat * -1) / 90 * 88))
  long < 0 ?
    pin.push(125 - ((long * -1) / 180 * 150)) :
    pin.push(125 + ((long / 180) * 150))
  if (pin[1] < 0) {pin[1] = pin[1] * -1}
  return pin
}