import { List, makeStyles } from '@material-ui/core';
import { ChatItem } from '../../components';

const useStyles = makeStyles(() => ({
  zeroPadding: {
    padding: 0
  }
}));

function ChatList() {
  const classes = useStyles();

  return (
    <List className={classes.zeroPadding}>
      <ChatItem
        sender="Bambang Susatno"
        description="I'll be in your neighborhood doing errands this"
        photo="/"
        time="12:00 PM"
        newMessage={2}
        isDirectMessage
      />
      <ChatItem
        title="Pencari Jodoh"
        sender="Bambang Susatno"
        description="Wait a minutes"
        time="08:00 PM"
      />
    </List>
  );
}

export default ChatList;
