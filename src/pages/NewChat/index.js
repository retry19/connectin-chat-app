import {
  Avatar,
  Box,
  Container,
  IconButton,
  InputBase,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  makeStyles,
  Typography
} from '@material-ui/core';
import { Search, Sort } from '@material-ui/icons';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { NavbarBack } from '../../components';

const useStyles = makeStyles((theme) => ({
  backgroundGray: {
    backgroundColor: '#f7f7f7'
  },
  inputSearch: {
    marginLeft: theme.spacing(1),
    color: 'inherit',
    flex: 1,
  },
  flexGrow: {
    flexGrow: 1
  },
  container: {
    backgroundColor: '#ffffff',
    paddingRight: 0,
    paddingLeft: 0,
  },
  content: {
    backgroundColor: '#ffffff',
    position: 'relative',
    minHeight: '90vh',
  },
  info: {
    fontSize: '0.8rem',
    color: theme.palette.secondary.light,
    backgroundColor: '#f0f0f0',
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  touchable: {
    backgroundColor: '#ffffff',
    transition: 'background-color 100ms ease-in-out',
    '&:hover': {
      backgroundColor: '#f5f5f5',
      cursor: 'pointer',
    }
  },
}));

function Contact({ name, status }) {
  const classes = useStyles();
  return (
    <List style={{ padding: 0 }}>
      <ListItem alignItems="flex-start" className={classes.touchable} onClick={() => {}}>
        <ListItemAvatar>
          <Avatar alt={name} src="/" />
        </ListItemAvatar>
        <ListItemText primary={name} secondary={status} />
      </ListItem>
    </List>
  );
}

Contact.propTypes = {
  name: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
};

function NewChat() {
  const classes = useStyles();
  const [isSearch, setIsSearch] = useState(false);

  const handleClickSearch = () => {
    setIsSearch(true);
  };

  return (
    <Box minHeight="100vh" className={classes.backgroundGray}>
      <NavbarBack link="/">
        {isSearch
          ? (
            <InputBase
              className={classes.inputSearch}
              placeholder="Search"
              inputProps={{ 'aria-label': 'search' }}
              autoFocus="on"
            />
          )
          : (
            <>
              <Typography variant="h6" className={classes.flexGrow}>
                New Message
              </Typography>
              <IconButton color="inherit" onClick={handleClickSearch}>
                <Search />
              </IconButton>
              <IconButton color="inherit">
                <Sort />
              </IconButton>
            </>
          )}
      </NavbarBack>
      <Container maxWidth="xs" className={classes.container}>
        <Box className={classes.content}>
          {!isSearch && <div className={classes.info}>Sort by name</div>}
          <Contact name="Lord Za" status="Sedang sibuk" />
        </Box>
      </Container>
    </Box>
  );
}

export default NewChat;
