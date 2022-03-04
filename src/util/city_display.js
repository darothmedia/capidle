const cityDisplay = city => (
  <td className='cityName'>
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
  </td>
)

export default cityDisplay