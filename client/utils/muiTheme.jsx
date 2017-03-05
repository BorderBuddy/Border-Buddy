import getMuiTheme from 'material-ui/styles/getMuiTheme';

import { cyan500,
  white, darkBlack, fullBlack,
} from 'material-ui/styles/colors';
import {fade} from 'material-ui/utils/colorManipulator';
import spacing from 'material-ui/styles/spacing';


const customTheme = getMuiTheme({
  spacing: spacing,
  fontFamily: '"Josefin Sans", sans-serif',
  palette: {
    primary1Color: '#0b2035',   // dark blue
    primary2Color: '#868362',   // gold
    primary3Color: '#7e8d85',   // medium green
    accent1Color: '#7e8d85',    // medium green
    accent2Color: cyan500, //'#b3bfb8',    // light grey
    accent3Color: '#f0f7f4',    // offwhite
    textColor: '#363836',       // dark olive
    secondaryTextColor: fade('#363836', 0.54),
    alternateTextColor: white,
    canvasColor: white,
    borderColor: '#b3bfb8',
    disabledColor: fade(darkBlack, 0.3),
    pickerHeaderColor: '#8078a5',
    clockCircleColor: fade(darkBlack, 0.07),
    shadowColor: fullBlack,
  },
});

export default customTheme;
