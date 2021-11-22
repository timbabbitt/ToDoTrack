export const text = (variant) => {
  let returnStyle = {}

  switch (variant) {
    case 'title':
      returnStyle = {
        fontSize: '2rem',
        fontWeight: 'bold',
        margin: '0 0 0.5rem 0',
      }
      break
    case 'subTitle':
      returnStyle = {
        fontSize: '1.25rem',
        fontWeight: '400',
      }
      break
  }

  return returnStyle
}