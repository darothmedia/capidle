import { TableCell } from "@mui/material"

export const charLineup = word => (
    word.toUpperCase().split('').map(
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
    )
)

export const cityDisplay = city => (
  <TableCell id='cityName'>
    {charLineup(city)}
  </TableCell>
)