import React, {useRef, useEffect} from "react";

const Map = props => {
  const mapRef = useRef(null)
  const {mapPins} = props

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
    ctx.arc(arr[1], (arr[0]), 2.5, 0, 2 * Math.PI)
    ctx.fill()
  }

  useEffect(() => {
    const canvas = mapRef.current
    const context = canvas.getContext('2d')

    if (mapPins.length > 0){
      mapPins.map((pin) => {
        drawPin(context, pin)
      })
    }
  }, [mapPins, drawPin])

  return(
      <canvas className="worldCanvas" ref={mapRef} />
  )
}

export default Map