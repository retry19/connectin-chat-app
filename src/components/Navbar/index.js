import {
  AppBar,
  Avatar,
  Container,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  SwipeableDrawer,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { ExitToApp, Help, Menu, Search, Settings } from '@material-ui/icons';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  container: {
    paddingRight: 0,
    paddingLeft: 0,
  },
  title: {
    flexGrow: 1,
    fontWeight: 'bolder',
  },
  list: {
    width: 250,
    [theme.breakpoints.down('600')]: {
      width: 300
    }
  },
  drawerHeading: {
    padding: theme.spacing(2)
  },
  bolder: {
    fontWeight: 600,
  },
  large: {
    width: theme.spacing(10),
    height: theme.spacing(10),
    marginBottom: theme.spacing(2)
  },
}));

function Navbar() {
  const classes = useStyles();
  const [isDrawerOpened, setIsDrawerOpened] = useState(false);

  const toggleDrawer = (isOpen) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setIsDrawerOpened(isOpen);
  };

  function drawer() {
    return (
      <div
        className={classes.list}
        role="presentation"
        onClick={toggleDrawer(false)}
        onKeyDown={toggleDrawer(false)}
      >
        <div className={classes.drawerHeading}>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" className={classes.large} />
          <Typography component="p" color="#000000" variant="body1" className={classes.bolder}>Reza Rachmanuddin</Typography>
          <Typography component="span" color="#151515" variant="subtitle2">rezarahmanudin@gmail.com</Typography>
        </div>
        <Divider />
        <List>
          <ListItem button>
            <ListItemIcon><Settings /></ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItem>
          <ListItem button>
            <ListItemIcon><ExitToApp /></ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem button>
            <ListItemIcon><Help /></ListItemIcon>
            <ListItemText primary="About Us" />
          </ListItem>
        </List>
      </div>
    );
  }

  return (
    <AppBar position="sticky" color="primary" elevation={0}>
      <Container maxWidth="xs" className={classes.container}>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
            <Menu />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Connect-in
          </Typography>
          <Link to="/search">
            <IconButton edge="end" color="inherit" aria-label="search">
              <Search htmlColor="#ffffff" />
            </IconButton>
          </Link>
        </Toolbar>
        <SwipeableDrawer
          anchor="left"
          open={isDrawerOpened}
          onClose={toggleDrawer(false)}
          onOpen={toggleDrawer(true)}
        >
          {drawer()}
        </SwipeableDrawer>
      </Container>
    </AppBar>
  );
}

export default Navbar;
