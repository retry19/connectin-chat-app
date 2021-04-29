/* eslint-disable react/require-default-props */
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
  Typography
} from '@material-ui/core';
import { Send } from '@material-ui/icons';
import { useEffect, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import PropTypes from 'prop-types';
import { useAuth0 } from '@auth0/auth0-react';
import { useMutation, useSubscription } from '@apollo/client';
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
    paddingBottom: theme.spacing(10)
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

  return (
    <NavbarBack link="/">
      <>
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
      </>
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
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      const boxForm = document.querySelector('#box-form');
      const bubbleChatElements = document.querySelectorAll('.bubble-chat');
      if (bubbleChatElements.length) {
        const lastBubbleChatElement = bubbleChatElements[bubbleChatElements.length - 1];
        if (lastBubbleChatElement.offsetTop >= boxForm.offsetTop) {
          window.scrollTo(0, document.body.scrollHeight);
        }
      }
    }
  }, [data]);

  let date = '';
  const checkSameDay = (d) => {
    if (date === d) {
      return true;
    }

    date = d;
    return false;
  };

  const [message, setMessage] = useState('');
  const [insertMessage] = useMutation(query.INSERT_MESSAGE, {
    variables: {
      from_user_id: user?.sub,
      message,
      to_user_id: toUser.id || null
    }
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    insertMessage();
    setMessage('');
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
              <BubbleChat key={d.id} message={d.message} time={moment(d.created_at).format('LT')} isMe={d.from_user_id === user.sub} picture={toUser.isGroup && d.picture} />
            </>
          ))}
          <Box className={classes.chatFooter} id="box-form">
            <form className={classes.messageForm} noValidate autoComplete="off" onSubmit={handleSubmit}>
              <InputBase
                placeholder="Type your message..."
                inputProps={{ 'aria-label': 'type your message' }}
                autoFocus
                className={classes.inputForm}
                onChange={(event) => setMessage(event.target.value)}
                value={message}
              />
              <IconButton onClick={handleSubmit}>
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
