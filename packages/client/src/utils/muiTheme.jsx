import spacing, { createMuiTheme } from '@material-ui/core/styles'

import common from '@material-ui/core/colors/common'
// import { fade } from '@material-ui/core/styles/colorManipulator'

const darkBlack = common.darkBlack
const fullBlack = common.fullBlack

const customTheme = createMuiTheme({
  spacing: spacing,
  fontFamily: '"Josefin Sans", sans-serif',
  palette: {
    primary1Color: '#2d6ea8', // light blue
    primary2Color: '#2d6ea8', // light blue
    primary3Color: '#FFFFFF', // white
    accent1Color: '#2d6ea8', // light blue
    accent2Color: '#2d6ea8', // light blue
    accent3Color: '#2d6ea8', // light blue
    textColor: '#000000', // black
    secondaryTextColor: '#2d6ea8', // light blue
    alternateTextColor: '#FFFFFF', // white
    canvasColor: '#FFFFFF', // white
    borderColor: '#C0C0C0', // light grey
    // disabledColor: fade(darkBlack, 0.3),
    disabledColor: darkBlack,
    pickerHeaderColor: '#2d6ea8',
    // clockCircleColor: fade(darkBlack, 0.07),
    clockCircleColor: darkBlack,
    shadowColor: fullBlack
  }
})

export default customTheme
