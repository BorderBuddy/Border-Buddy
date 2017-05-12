import getMuiTheme from 'material-ui/styles/getMuiTheme';

import { cyan500, darkBlack, fullBlack,
} from 'material-ui/styles/colors';
import {fade} from 'material-ui/utils/colorManipulator';
import spacing from 'material-ui/styles/spacing';


const customTheme = getMuiTheme({
  spacing: spacing,
  fontFamily: '"Josefin Sans", sans-serif',
  palette: {
    primary1Color: '#2d6ea8',   // light blue
    primary2Color: '#2d6ea8',   // light blue
    primary3Color: '#FFFFFF',   // white
    accent1Color: '#2d6ea8',    // light blue
    accent2Color: '#2d6ea8', // light blue
    accent3Color: '#2d6ea8',    // light blue
    textColor: '#000000',       // black
    secondaryTextColor: "#2d6ea8", // light blue
    alternateTextColor: "#FFFFFF", // white
    canvasColor: '#FFFFFF', // white
    borderColor: '#C0C0C0', // light grey
    disabledColor: fade(darkBlack, 0.3),
    pickerHeaderColor: '#2d6ea8',
    clockCircleColor: fade(darkBlack, 0.07),
    shadowColor: fullBlack,
  }
});

export default customTheme;
