/* eslint-disable react/require-default-props */
/* eslint-disable max-len */
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
import { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { Skeleton } from '@material-ui/lab';
import { useHistory } from 'react-router-dom';
import Fuse from 'fuse.js';
import { useRecoilState } from 'recoil';
import { useAuth0 } from '@auth0/auth0-react';
import { NavbarBack } from '../../components';
import { query } from '../../constants';
import { recoilState } from '../../services';

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
  rotate180: {
    transform: 'rotate(180deg)'
  }
}));

function Contact({ user }) {
  const { name, picture, status } = user;
  const classes = useStyles();
  // eslint-disable-next-line no-unused-vars
  const history = useHistory();
  const setToUser = useRecoilState(recoilState.toUser)[1];

  const handleClick = () => {
    setToUser(user);
    return history.push('/chat');
  };

  return (
    <List style={{ padding: 0 }}>
      <ListItem alignItems="flex-start" className={classes.touchable} onClick={handleClick}>
        <ListItemAvatar>
          <Avatar alt={name} src={picture} />
        </ListItemAvatar>
        <ListItemText primary={name} secondary={status || 'Ada'} />
      </ListItem>
    </List>
  );
}

Contact.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    picture: PropTypes.string.isRequired,
    status: PropTypes.string,
  }),
};

function SkeletonLoading() {
  return (
    <>
      {Array.from(Array(5), (e, i) => (
        <div key={i} style={{ padding: '10px 16px', display: 'flex' }}>
          <Skeleton animation="wave" variant="circle" width={40} height={40} style={{ marginTop: '6px' }} />
          <div style={{ padding: '0 16px' }}>
            <Skeleton animation="wave" variant="text" width={250} />
            <Skeleton animation="wave" variant="text" width={150} />
          </div>
        </div>
      ))}
    </>
  );
}

function NewChat() {
  const classes = useStyles();
  const [isSearch, setIsSearch] = useState(false);
  const [isAscending, setIsAscending] = useState(true);
  const [users, setUsers] = useState([]);
  const [usersFound, setUsersFound] = useState([]);
  const [usersArray, setusersArray] = useState([]);
  const { user: userLogged, isLoading } = useAuth0();
  const params = (!isLoading && userLogged)
    ? { user_id: userLogged.sub }
    : {};
  const { loading, error, data } = useQuery(query.GET_MY_CONTACTS, { variables: params });

  useEffect(() => {
    if (data) {
      setUsers(data.users);
    }
  }, [data]);

  useEffect(() => {
    setusersArray(usersFound.length ? usersFound : users);
  }, [users, usersFound]);

  const handleClickSearch = () => {
    setIsSearch(true);
  };

  const handleReverseList = () => {
    setUsers([].concat(users).reverse());
    setIsAscending(!isAscending);
  };

  const handleSearch = (event) => {
    const keyword = event.target.value;
    const fuse = new Fuse(users, { keys: ['name'] });
    const result = fuse.search(keyword);
    const found = [];
    result.forEach((res) => {
      found.push(res.item);
    });
    setUsersFound(found);
  };

  if (error) return `Error! ${error}`;

  return (
    <Box minHeight="100vh" className={classes.backgroundGray}>
      <NavbarBack link="/">
        {isSearch
          ? (
            <InputBase
              className={classes.inputSearch}
              placeholder="Search"
              inputProps={{ 'aria-label': 'search' }}
              autoFocus
              onChange={handleSearch}
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
              <IconButton color="inherit" onClick={handleReverseList}>
                <Sort className={!isAscending ? classes.rotate180 : null} />
              </IconButton>
            </>
          )}
      </NavbarBack>
      <Container maxWidth="xs" className={classes.container}>
        <Box className={classes.content}>
          {!isSearch && (
          <div className={classes.info}>
            Sort by name (
            {isAscending ? 'A-Z' : 'Z-A'}
            )
          </div>
          )}
          {loading && <SkeletonLoading />}
          {usersArray && usersArray.map((user) => <Contact key={user.id} user={user} />)}
        </Box>
      </Container>
    </Box>
  );
}

export default NewChat;
