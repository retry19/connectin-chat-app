import {
  Avatar,
  Box,
  Container,
  IconButton,
  InputBase,
  LinearProgress,
  ListItem,
  ListItemAvatar,
  ListItemText,
  makeStyles,
  Menu,
  MenuItem,
  Typography
} from '@material-ui/core';
import { Delete, MoreVert, Send } from '@material-ui/icons';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import PropTypes from 'prop-types';
import { useAuth0 } from '@auth0/auth0-react';
import { useSubscription } from '@apollo/client';
import moment from 'moment';
import { BgChatBlue } from '../../assets';
import { NavbarBack, BubbleChat } from '../../components';
import { recoilState } from '../../services';
import { query } from '../../constants';

const useStyles = makeStyles((theme) => ({
  backgroundGray: {
    backgroundColor: '#f7f7f7'
  },
  onlineStatus: {
    display: 'inline',
    color: '#f0f0f0'
  },
  container: {
    paddingRight: 0,
    paddingLeft: 0
  },
  content: {
    background: `url(${BgChatBlue}) no-repeat fixed center`,
    position: 'relative',
    minHeight: '90vh',
    maxWidth: '444px',
    width: '100%',
  },
  noPadding: {
    padding: 0
  },
  chatFooter: {
    background: '#fff',
    position: 'fixed',
    width: 'inherit',
    maxWidth: '444px',
    bottom: 0,
  },
  messageForm: {
    overflow: 'hidden',
    display: 'flex',
    margin: theme.spacing(1),
    paddingLeft: theme.spacing(1)
  },
  inputForm: {
    flex: 1,
  },
  info: {
    fontSize: '0.7rem',
    color: theme.palette.secondary.dark,
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    textAlign: 'center',
    opacity: 0.5
  },
}));

function Header({ user }) {
  const { name, picture, status } = user;
  const classes = useStyles();
  const [moreMenu, setMoreMenu] = useState(null);

  const handleShowMoreMenu = (event) => {
    setMoreMenu(event.currentTarget);
  };

  const handleHideMoreMenu = () => {
    setMoreMenu(null);
  };

  return (
    <NavbarBack link="/">
      <ListItem alignItems="flex-start" className={classes.noPadding}>
        <ListItemAvatar>
          <Avatar alt={name} src={picture} />
        </ListItemAvatar>
        <ListItemText
          primary={name}
          secondary={(
            <Typography
              component="small"
              variant="subtitle2"
              className={classes.onlineStatus}
            >
              {status}
            </Typography>
            )}
        />
      </ListItem>
      <IconButton edge="end" color="inherit" aria-label="more" onClick={handleShowMoreMenu}>
        <MoreVert />
      </IconButton>
      <Menu
        id="more-menu"
        anchorEl={moreMenu}
        keepMounted
        open={moreMenu}
        onClose={handleHideMoreMenu}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem>
          <Delete style={{ marginRight: '5px' }} />
          Remove Chat
        </MenuItem>
      </Menu>
    </NavbarBack>
  );
}

Header.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    picture: PropTypes.string.isRequired,
    status: PropTypes.string,
  }).isRequired,
};

function HeaderDate({ date }) {
  const classes = useStyles();
  return (
    <div className={classes.info}>
      {date}
    </div>
  );
}

HeaderDate.propTypes = {
  date: PropTypes.string.isRequired
};

function PrivateChat() {
  const classes = useStyles();
  const toUser = useRecoilState(recoilState.toUser)[0];
  const { user, isLoading } = useAuth0();
  const params = { where: {} };
  if (!isLoading && user) {
    if (toUser && !toUser.id) {
      params.where = {
        _and: [
          {
            deleted_at: {
              _is_null: true
            }
          },
          {
            to_user_id: {
              _is_null: true,
            },
          }
        ]
      };
    } else if (toUser && toUser.id) {
      params.where = {
        _and: [
          {
            deleted_at: {
              _is_null: true
            }
          },
          {
            _or: [
              {
                from_user_id: {
                  _eq: user.sub,
                },
                to_user_id: {
                  _eq: toUser.id,
                },
              },
              {
                from_user_id: {
                  _eq: toUser.id,
                },
                to_user_id: {
                  _eq: user.sub,
                },
              },
            ],
          }
        ],
      };
    }
  }
  const { loading, data } = useSubscription(query.GET_CHAT, { variables: params });
  let date = '';

  const checkSameDay = (d) => {
    if (date === d) {
      return true;
    }

    date = d;
    return false;
  };

  return (
    <Box minHeight="100vh" className={classes.backgroundGray}>
      <Header user={toUser} />
      <Container maxWidth="xs" className={classes.container}>
        <Box className={classes.content}>
          {loading && <LinearProgress />}
          {data?.messages?.map((d) => (
            <>
              {!checkSameDay(moment(d.created_at).format('L')) && <HeaderDate date={moment(d.created_at).format('LL')} />}
              <BubbleChat message={d.message} time={moment(d.created_at).format('LT')} isMe={d.from_user_id === user.sub} />
            </>
          ))}
          <Box className={classes.chatFooter}>
            <form className={classes.messageForm} noValidate autoComplete="off">
              <InputBase
                placeholder="Type your message..."
                inputProps={{ 'aria-label': 'type your message' }}
                autoFocus
                className={classes.inputForm}
              />
              <IconButton>
                <Send />
              </IconButton>
            </form>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default PrivateChat;
