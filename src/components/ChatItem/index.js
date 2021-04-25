/* eslint-disable react/require-default-props */
import {
  Avatar,
  Badge,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  makeStyles,
  Typography,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  inline: {
    display: 'inline',
  },
  touchable: {
    backgroundColor: '#ffffff',
    transition: 'background-color 100ms ease-in-out',
    '&:hover': {
      backgroundColor: '#f5f5f5',
      cursor: 'pointer',
    }
  },
  flexTop: {
    paddingTop: theme.spacing(4),
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'start',
    alignItems: 'flex-end'
  },
  badge: {
    marginRight: theme.spacing(2.5),
  }
}));

function ChatItem({ title = '', description, sender, time, isDirectMessage = false, photo = null, newMessage = 0 }) {
  const classes = useStyles();
  const history = useHistory();

  return (
    <ListItem alignItems="flex-start" className={classes.touchable} onClick={() => history.push('/chat')}>
      <ListItemAvatar>
        <Avatar alt={title || sender} src={photo} />
      </ListItemAvatar>
      <ListItemText
        primary={title || sender}
        secondary={
          isDirectMessage
            ? description
            : (
              <>
                <Typography
                  component="span"
                  variant="body2"
                  className={classes.inline}
                  color="textPrimary"
                >
                  {sender}
                </Typography>
                {` — ${description}`}
              </>
            )
        }
      />
      <ListItemSecondaryAction className={classes.flexTop}>
        <Typography component="small" color="textSecondary" variant="subtitle2">{time}</Typography>
        {newMessage ? (
          <Badge
            anchorOrigin={{
              vertical: 'center',
              horizontal: 'center',
            }}
            color="error"
            badgeContent={newMessage}
            className={classes.badge}
          />
        ) : ''}
      </ListItemSecondaryAction>
    </ListItem>
  );
}

ChatItem.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string.isRequired,
  sender: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  isDirectMessage: PropTypes.bool,
  photo: PropTypes.string,
  newMessage: PropTypes.number
};

export default ChatItem;
