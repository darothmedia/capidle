import React, {useRef, useEffect} from "react";

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

    if (mapPins.length > 0){
      mapPins.map((pin) => {
        drawPin(context, pin)
      })
    }
    if (winPin.length > 0) {
      drawStar(context, winPin[0])
    }
    if (cities.length < 1){
      clearMap(context)
    }
  }, [mapPins, drawPin, winPin, cities])

  return(
      <canvas className="worldCanvas" ref={mapRef} />
  )
}

export default Map