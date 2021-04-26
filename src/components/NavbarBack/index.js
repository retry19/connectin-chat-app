/* eslint-disable react/require-default-props */
import {
  AppBar,
  Container,
  IconButton,
  makeStyles,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { ArrowBack } from '@material-ui/icons';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles(() => ({
  flexGrow: {
    flexGrow: 1
  },
  container: {
    paddingRight: 0,
    paddingLeft: 0,
  }
}));

function NavbarBack({ title, children, link, color }) {
  const classes = useStyles();
  const history = useHistory();
  return (
    <AppBar position="sticky" color={color || 'primary'} elevation={0} style={{ borderBottom: '1px solid rgb(232, 232, 232)' }}>
      <Container maxWidth="xs" className={classes.container}>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="back" onClick={() => history.push(link)}>
            <ArrowBack />
          </IconButton>
          { title ? (
            <Typography variant="h6" className={classes.flexGrow}>
              {title}
            </Typography>
          ) : children }
        </Toolbar>
      </Container>
    </AppBar>
  );
}

NavbarBack.propTypes = {
  title: PropTypes.string,
  children: PropTypes.element,
  link: PropTypes.string.isRequired,
  color: PropTypes.string,
};

export default NavbarBack;
