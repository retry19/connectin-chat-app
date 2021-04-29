import { useAuth0 } from '@auth0/auth0-react';
import {
  Box,
  Button,
  Container,
  CssBaseline,
  makeStyles,
  Typography
} from '@material-ui/core';
import { Copyright } from '../../components';
import logo192 from '../../assets/images/logo192.png';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100vh'
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  submit: {
    margin: theme.spacing(7, 0, 2),
  },
}));

export default function Login() {
  const classes = useStyles();
  const { loginWithRedirect, getIdTokenClaims } = useAuth0();

  // eslint-disable-next-line no-console
  getIdTokenClaims().then((res) => console.log(res));

  return (
    <Container component="main" maxWidth="xs" className={classes.container}>
      <CssBaseline />
      <div className={classes.paper}>
        <img src={logo192} alt="logo connect-in" />
        <Typography component="h1" variant="h5">
          Welcome
        </Typography>
        <Typography
          component="p"
          variant="subtitle2"
          style={{ fontWeight: 400 }}
        >
          Please login before continue to app
        </Typography>
        <Button
          type="button"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={() => loginWithRedirect()}
        >
          Login
        </Button>
        <small>Powered by Auth0</small>
      </div>
      <Box mt={8} style={{ position: 'absolute', bottom: '20px' }}>
        <Copyright />
      </Box>
    </Container>
  );
}
