import { Box, Container, Fab, makeStyles } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import Navbar from '../../components/Navbar';
import ChatList from '../../containers/ChatList';

const useStyles = makeStyles((theme) => ({
  backgroundGray: {
    backgroundColor: '#f7f7f7',
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
  fab: {
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    position: 'absolute',
  },
}));

export default function Home() {
  const classes = useStyles();
  return (
    <Box minHeight="100vh" className={classes.backgroundGray}>
      <Navbar type="home" />
      <Container maxWidth="sm" className={classes.container}>
        <Box className={classes.content}>
          <ChatList />
          <Fab aria-label="New Chat" className={classes.fab} color="primary">
            <Add />
          </Fab>
        </Box>
      </Container>
    </Box>
  );
}
