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
    marginRight: theme.spacing(1.2),
    marginTop: theme.spacing(1.3),
  },
  time: {
    fontSize: '0.8rem',
    fontWeight: 400
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
        primary={(
          <Typography component="p" variant="body1">
            {title || sender}
          </Typography>
        )}
        secondary={
          isDirectMessage
            ? (
              <Typography component="small" variant="caption" style={{ color: '#7f7f7f' }}>
                {description}
              </Typography>
            )
            : (
              <>
                <Typography
                  component="span"
                  variant="caption"
                  className={classes.inline}
                  color="textPrimary"
                >
                  {sender}
                </Typography>
                <Typography component="small" variant="caption" style={{ color: '#7f7f7f' }}>
                  {` - ${description}`}
                </Typography>
              </>
            )
        }
      />
      <ListItemSecondaryAction className={classes.flexTop}>
        <Typography
          component="small"
          color="textSecondary"
          variant="subtitle2"
          className={classes.time}
        >
          {time}
        </Typography>
        {newMessage ? (
          <Badge
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
