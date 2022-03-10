# [CAPIDLE](https://darothmedia.github.io/capidle/)

![Capidle Logo](https://live.staticflickr.com/65535/51924752541_d989e5f747_o.png)

## About
CAPIDLE is a geographic riff on Wordle. Narrow down possible cities by entering city names, then view their distance to the target city. Keep guessing until you succeed!

__Play the game, and invite friends to join: [CAPIDLE](https://darothmedia.github.io/capidle/)!__

## Tech Stack
Capidle is a frontend-only game that taps the GeoDB Cities API for city information.

- React.js / Redux
- GeoDB Cities API
- Material UI

## Gameplay

![Capidle Game Screen 1](https://user-images.githubusercontent.com/87622162/157563293-e1f1cd88-b841-4cff-ac86-6a636c7b424a.png)

Players start by entering a city as their opening guess. The city can be any city in the world (as long as it is included in the GeoDB Cities API database).

![Capidle Game Screen 2](https://user-images.githubusercontent.com/87622162/157563447-7efefaf0-9f19-4fb4-a2e2-9fe51958039e.png)

A target distance is shown - this is the distance from the guessed city to the target. Players keep guessing until they get the correct target city

![Capidle Game Screen 3](https://user-images.githubusercontent.com/87622162/157563892-1672c04e-47aa-4785-a9a6-b255699472c5.png)

All guessed cities and the final target city are mapped on a world map, using the Canvas API.

## Sample Code

The distance component calculates distance between a given guess city and the target city:

__Distance Function__

```javascript
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
  var mi = Math.floor(0.621371 * km) // Distance in mi
  
  let card = ""
  let lat = lat1 - lat2
  let long = lon1 - lon2

  lat > 0 ? card = "S" : card = "N"

  if ((long > 0) && card === "S") { card = "↙️" }
  if ((long < 0) && card === "S") { card = "↘️" }
  if ((long > 0) && card === "N") { card = "↖️" }
  if ((long < 0) && card === "N") { card = "↗️" }

  if (mi === 0) {return {message: "YOU WIN"}}
  else { return {mi: mi + " mi", km: km + " km", card: card};}
}

function deg2rad(deg) {
  return deg * (Math.PI / 180)
}
```
The mapping function uses Canvas API to draw guesses and the target on a world map:

__Mapping Function__
```javascript
const Map = props => {
  const mapRef = useRef(null)
  const {mapPins, winPin, cities} = props

  const drawPin = (ctx, arr) => {
    ctx.fillStyle = '#FF0000'
    ctx.strokeStyle = '#000000'
    ctx.beginPath()
    ctx.moveTo(arr[1], (arr[0] - 8))
    ctx.lineTo(arr[1], arr[0])
    ctx.lineWidth = 1
    ctx.stroke()
    ctx.moveTo(arr[1], (arr[0] - 8))
    ctx.arc(arr[1], (arr[0] - 8), 2.5, 0, 2 * Math.PI)
    ctx.fill()
  }

  const drawStar = (ctx, arr) => {
    ctx.fillStyle = '#FFD700'
    ctx.beginPath()
    ctx.moveTo(arr[1], arr[0])
    ctx.arc(arr[1], arr[0], 2.5, 0, 2 * Math.PI)
    ctx.stroke()
    ctx.fill()
  }

  const clearMap = (ctx) => {
    ctx.clearRect(0, 0, 400, 200)
  }

  useEffect(() => {
    const canvas = mapRef.current
    const context = canvas.getContext('2d')
    const latestPin = mapPins[mapPins.length - 1]

    if (latestPin){
      drawPin(context, latestPin)
    }

    if (winPin[0]) {
      drawStar(context, winPin[0])
    }
    if (cities.length < 1){
      clearMap(context)
    }
  }, [mapPins, winPin, cities])

  return(
      <canvas className="worldCanvas" ref={mapRef} />
  )
}
```

## Development
### Tools
Review all available scripts in the `package.json`.
- Run the app in dev mode: `npm start`
- Run the test runner in interactive watch mode: `npm test`
- Deploy the app (deploys to darothmedia/capidle): `npm run deploy`
