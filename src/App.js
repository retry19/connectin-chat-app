import { ThemeProvider } from '@material-ui/core';
import { theme } from './constants';
import Routes from './routes';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Routes />
    </ThemeProvider>
  );
}
