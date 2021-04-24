import {
  AppBar,
  Container,
  IconButton,
  makeStyles,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { MoreVert } from '@material-ui/icons';

const useStyles = makeStyles(() => ({
  title: {
    flexGrow: 1,
    fontWeight: 'bolder',
  },
}));

function Navbar() {
  const classes = useStyles();

  return (
    <AppBar position="static" color="transparent" elevation="0">
      <Container maxWidth="sm">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Connectin
          </Typography>
          <IconButton edge="end" color="inherit" aria-label="menu">
            <MoreVert />
          </IconButton>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
