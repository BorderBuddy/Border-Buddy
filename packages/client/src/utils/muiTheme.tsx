import { createMuiTheme } from '@material-ui/core/styles'

// import { fade } from '@material-ui/core/styles/colorManipulator'

// const darkBlack = common.darkBlack
// const fullBlack = common.fullBlack

const customTheme = createMuiTheme({
  // spacing: spacing,
  // fontFamily: '"Josefin Sans", sans-serif',
  palette: {
    primary: {
      main: '#2d6ea8',
    }, // light blue
    // primary2Color: '#2d6ea8', // light blue
    // primary3Color: '#FFFFFF', // white
    // accent1Color: '#2d6ea8', // light blue
    // accent2Color: '#2d6ea8', // light blue
    // accent3Color: '#2d6ea8', // light blue
    // textColor: '#000000', // black
    // secondaryTextColor: '#2d6ea8', // light blue
    // alternateTextColor: '#FFFFFF', // white
    // canvasColor: '#FFFFFF', // white
    // borderColor: '#C0C0C0', // light grey
    // disabledColor: darkBlack,
    // pickerHeaderColor: '#2d6ea8',
    // clockCircleColor: darkBlack,
    // shadowColor: fullBlack,
  },
})

export default customTheme

// export interface ThemeOptions {
//   shape?: ShapeOptions;
//   breakpoints?: BreakpointsOptions;
//   direction?: Direction;
//   mixins?: MixinsOptions;
//   overrides?: Overrides;
//   palette?: PaletteOptions;
//   props?: ComponentsProps;
//   shadows?: Shadows;
//   spacing?: SpacingOptions;
//   transitions?: TransitionsOptions;
//   typography?: TypographyOptions | ((palette: Palette) => TypographyOptions);
//   zIndex?: ZIndexOptions;
//   unstable_strictMode?: boolean;
// }
