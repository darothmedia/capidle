import { TableCell } from "@mui/material"

const cityDisplay = city => (
  <TableCell id='cityName'>
    {city.toUpperCase().split('').map(
      (char, i) => {
        if (char === " ") {
          return (
            <p key={`c${i}`} className="blank">{char}</p>
          )
        }
        return (
          <p key={`c${i}`} className="char">{char}</p>
        )
      }
    )}
  </TableCell>
)

export default cityDisplay