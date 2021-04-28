import { ThemeProvider } from '@material-ui/core';
import { RecoilRoot } from 'recoil';
import Routes from './routes';
import { theme } from './constants';
import { Apollo } from './services';

export default function App() {
  return (
    <Apollo>
      <RecoilRoot>
        <ThemeProvider theme={theme}>
          <Routes />
        </ThemeProvider>
      </RecoilRoot>
    </Apollo>
  );
}
