import { useAuth0 } from '@auth0/auth0-react';
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
import { Skeleton } from '@material-ui/lab';
import { ExitToApp, Help, Menu, Settings } from '@material-ui/icons';
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
    width: 300
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
  listLink: {
    color: '#5f2727',
    textDecoration: 'none !important'
  }
}));

function Navbar() {
  const classes = useStyles();
  const [isDrawerOpened, setIsDrawerOpened] = useState(false);
  const { logout, user, isLoading } = useAuth0();

  const toggleDrawer = (isOpen) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setIsDrawerOpened(isOpen);
  };

  const handleLogout = () => {
    logout();
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
          {isLoading
            ? <Skeleton animation="wave" variant="circle" className={classes.large} />
            : <Avatar alt={user.name} src={user.picture} className={classes.large} />}
          {isLoading
            ? <Skeleton animation="wave" variant="text" width="100%" />
            : <Typography component="p" variant="body1" className={classes.bolder}>{user.name}</Typography>}
          {isLoading
            ? <Skeleton animation="wave" variant="text" width="100%" />
            : <Typography component="span" color="initial" variant="subtitle2" style={{ fontWeight: 400 }}>{user.email}</Typography>}

        </div>
        <Divider />
        <List>
          {isLoading
            ? (
              <>
                <Skeleton animation="wave" width="90%" height="50px" style={{ margin: '0 15px' }} />
                <Skeleton animation="wave" width="90%" height="50px" style={{ margin: '0 15px' }} />
              </>
            )
            : (
              <>
                <Link to="/settings" className={classes.listLink}>
                  <ListItem button>
                    <ListItemIcon><Settings /></ListItemIcon>
                    <ListItemText primary="Settings" />
                  </ListItem>
                </Link>
                <ListItem button onClick={handleLogout}>
                  <ListItemIcon><ExitToApp /></ListItemIcon>
                  <ListItemText primary="Logout" />
                </ListItem>
              </>
            )}
        </List>
        <Divider />
        <List>
          {isLoading
            ? <Skeleton animation="wave" width="90%" height="50px" style={{ margin: '0 15px' }} />
            : (
              <Link to="/about" className={classes.listLink}>
                <ListItem button>
                  <ListItemIcon><Help /></ListItemIcon>
                  <ListItemText primary="About" />
                </ListItem>
              </Link>

            )}
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
