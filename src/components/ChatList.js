import {
  Avatar,
  Container,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  makeStyles,
  Typography,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(3),
  },
  inline: {
    display: 'inline',
  },
}));

function ChatList() {
  const classes = useStyles();

  return (
    <Container maxWidth="sm" className={classes.container}>
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
        </ListItem>
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt="Reza Rachmanuddin" src="/static/images/avatar/1.jpg" />
          </ListItemAvatar>
          <ListItemText
            primary="Reza Rachmanuddin"
            secondary="I'll be in your neighborhood doing errands this…"
          />
        </ListItem>
      </List>
    </Container>
  );
}

export default ChatList;
