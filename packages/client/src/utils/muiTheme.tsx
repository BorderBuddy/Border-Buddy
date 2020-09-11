import { createMuiTheme } from '@material-ui/core/styles'

const customTheme = createMuiTheme({
  typography: {
    fontFamily: '"Josefin Sans", sans-serif',
  },
  palette: {
    primary: {
      main: '#2d6ea8',
      dark: '#1A4061',
      light: '#3683C7',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#25A8A0', // teal can be made to be a warm color too, but a few sprites also had teal
      dark: '#176963',
      light: '#28B5AC',
      contrastText: '#FFFFFF',
    },
  },
})

export default customTheme

