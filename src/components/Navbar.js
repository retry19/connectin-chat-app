import {
  AppBar,
  Container,
  IconButton,
  makeStyles,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { Menu, Search } from '@material-ui/icons';

const useStyles = makeStyles(() => ({
  title: {
    flexGrow: 1,
    fontWeight: 'bolder',
  },
}));

function Navbar() {
  const classes = useStyles();

  return (
    <AppBar position="static" color="primary" elevation={0}>
      <Container maxWidth="sm">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <Menu />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Connect-in
          </Typography>
          <IconButton edge="end" color="inherit" aria-label="search">
            <Search />
          </IconButton>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
