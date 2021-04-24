import {
  Avatar,
  Badge,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  makeStyles,
  Typography,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  inline: {
    display: 'inline',
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

function ChatList() {
  const classes = useStyles();

  return (
    <List>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Pencari Jodoh" src="/static/images/avatar/1.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary="Pencari Jodoh"
          secondary={(
            <>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
                Kaito Za
              </Typography>
              {" — I'll be in your neighborhood doing errands this…"}
            </>
          )}
        />
        <ListItemSecondaryAction className={classes.flexTop}>
          <Typography component="small" color="textSecondary" variant="subtitle2">05:00 PM</Typography>
          <Badge
            anchorOrigin={{
              vertical: 'center',
              horizontal: 'center',
            }}
            color="error"
            badgeContent={1}
            className={classes.badge}
          />
        </ListItemSecondaryAction>
      </ListItem>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Reza Rachmanuddin" src="/static/images/avatar/1.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary="Reza Rachmanuddin"
          secondary="I'll be in your neighborhood doing errands this…"
        />
        <ListItemSecondaryAction className={classes.flexTop}>
          <Typography component="small" color="textSecondary" variant="subtitle2">01:00 PM</Typography>
        </ListItemSecondaryAction>
      </ListItem>
    </List>
  );
}

export default ChatList;
