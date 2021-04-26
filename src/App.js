import { ThemeProvider } from '@material-ui/core';
import Routes from './routes';
import { theme } from './constants';
import { Apollo } from './services';

export default function App() {
  return (
    <Apollo>
      <ThemeProvider theme={theme}>
        <Routes />
      </ThemeProvider>
    </Apollo>
  );
}
