import { createMuiTheme } from '@material-ui/core';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#00aeef',
      light: '#66e0ff',
      dark: '#007fbc',
      contrastText: '#ffffff'
    },
    secondary: {
      main: '#00838f',
      light: '#4fb3bf',
      dark: '#005662',
      contrastText: '#ffffff'
    }
  },
  typography: {
    fontFamily: 'Poppins'
  }
});

export default theme;
