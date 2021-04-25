import {
  Avatar,
  Box,
  Container,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
  makeStyles,
  Typography
} from '@material-ui/core';
import { MoreVert } from '@material-ui/icons';
import { NavbarBack } from '../../components';

const useStyles = makeStyles((theme) => ({
  backgroundGray: {
    backgroundColor: '#f7f7f7'
  },
  onlineStatus: {
    display: 'inline',
    color: '#f0f0f0'
  },
  container: {
    backgroundColor: 'none',
    [theme.breakpoints.down('600')]: {
      backgroundColor: '#ffffff'
    }
  },
  content: {
    backgroundColor: '#ffffff',
    position: 'relative',
    minHeight: '90vh',
  },
}));

function PrivateChat() {
  const classes = useStyles();
  return (
    <Box minHeight="100vh" className={classes.backgroundGray}>
      <NavbarBack link="/">
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt="Bambang Susatno" src="/" />
          </ListItemAvatar>
          <ListItemText
            primary="Bambang Susatno"
            secondary={(
              <Typography
                component="small"
                variant="subtitle2"
                className={classes.onlineStatus}
              >
                Online
              </Typography>
            )}
          />
        </ListItem>
        <IconButton edge="end" color="inherit" aria-label="more">
          <MoreVert />
        </IconButton>
      </NavbarBack>

      <Container maxWidth="sm" className={classes.container}>
        <Box className={classes.content} />
      </Container>
    </Box>
  );
}

export default PrivateChat;
