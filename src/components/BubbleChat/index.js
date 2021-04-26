import { Box, makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  bubbleWrapper: {
    display: 'flex',
    paddingTop: theme.spacing(1),
  },
  bubble: {
    display: 'inline-block',
    padding: theme.spacing(1),
    borderRadius: '10px',
    fontSize: '0.8rem',
  },
  me: {
    justifyContent: 'flex-end',
    paddingRight: theme.spacing(1),
    paddingLeft: theme.spacing(3),
    '& + $me': {
      paddingTop: '3px',
      '& > $zeroTopRightRadius': {
        borderTopRightRadius: '10px'
      }
    }
  },
  you: {
    justifyContent: 'flex-start',
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(3),
    '& + $you': {
      paddingTop: '3px',
      '& > $zeroTopLeftRadius': {
        borderTopLeftRadius: '10px'
      }
    }
  },
  zeroTopRightRadius: {
    backgroundColor: '#f2f2f2',
    borderTopRightRadius: 0,
    '& > $time': {
      color: theme.palette.secondary.light,
      position: 'relative',
      marginLeft: '5px',
      bottom: '-4px',
    }
  },
  zeroTopLeftRadius: {
    backgroundColor: theme.palette.secondary.light,
    color: '#ffffff',
    borderTopLeftRadius: 0,
    '& > $time': {
      color: '#e1d7ff',
      position: 'relative',
      marginLeft: '5px',
      bottom: '-4px',
    }
  },
  time: {}
}));

function BubbleChat({ message, time, isMe }) {
  const classes = useStyles();

  return (
    <Box className={[classes.bubbleWrapper, (isMe ? classes.me : classes.you)]}>
      <Box className={[
        classes.bubble,
        (isMe
          ? classes.zeroTopRightRadius
          : classes.zeroTopLeftRadius
        )
      ]}
      >
        {message}
        <small className={classes.time}>{time}</small>
      </Box>
    </Box>
  );
}

BubbleChat.propTypes = {
  message: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  isMe: PropTypes.bool.isRequired,
};

export default BubbleChat;
