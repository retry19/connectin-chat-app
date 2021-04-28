import {
  Box,
  Container,
  Fab,
  makeStyles
} from '@material-ui/core';
import { Create } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { Navbar } from '../../components';
import { ChatList } from '../../containers';

const useStyles = makeStyles((theme) => ({
  backgroundGray: {
    backgroundColor: '#f7f7f7',
  },
  container: {
    backgroundColor: '#ffffff',
    paddingRight: 0,
    paddingLeft: 0,
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
      <Container maxWidth="xs" className={classes.container}>
        <Box className={classes.content}>
          <ChatList />
          <Link to="/chat/new">
            <Fab aria-label="New Chat" className={classes.fab} color="primary">
              <Create />
            </Fab>
          </Link>
        </Box>
      </Container>
    </Box>
  );
}
