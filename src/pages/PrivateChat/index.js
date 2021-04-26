import {
  Avatar,
  Box,
  Container,
  IconButton,
  InputBase,
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
import { BgChatBlue } from '../../assets';
import { NavbarBack, BubbleChat } from '../../components';

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
}));

function PrivateChat() {
  const classes = useStyles();
  const [moreMenu, setMoreMenu] = useState(null);

  const handleShowMoreMenu = (event) => {
    setMoreMenu(event.currentTarget);
  };

  const handleHideMoreMenu = () => {
    setMoreMenu(null);
  };

  return (
    <Box minHeight="100vh" className={classes.backgroundGray}>
      <NavbarBack link="/">
        <ListItem alignItems="flex-start" className={classes.noPadding}>
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

      <Container maxWidth="xs" className={classes.container}>
        <Box className={classes.content}>
          <BubbleChat message="Assalamualaikum" time="7:19 PM" isMe={1} />
          <BubbleChat message="Waalaikumsalam" time="7:22 PM" isMe={0} />
          <Box className={classes.chatFooter}>
            <form className={classes.messageForm} noValidate autoComplete="off">
              <InputBase
                placeholder="Type your message..."
                inputProps={{ 'aria-label': 'type your message' }}
                autoFocus="on"
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
