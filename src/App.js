import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import {
  Home,
  Login,
  NewChat,
  PrivateChat,
  Register,
  Search,
  Settings,
} from './pages';

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

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/search" component={Search} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/chat" exact component={PrivateChat} />
          <Route path="/chat/new" component={NewChat} />
          <Route path="/settings" component={Settings} />
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
}
