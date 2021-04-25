import { Box, Container, makeStyles } from '@material-ui/core';
import ChatList from '../components/ChatList';
import Navbar from '../components/Navbar';

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

function Search() {
  const classes = useStyles();
  return (
    <Box minHeight="100vh" className={classes.backgroundGray}>
      <Navbar type="search" />
      <Container maxWidth="sm" className={classes.container}>
        <Box className={classes.content}>
          <ChatList />
        </Box>
      </Container>
    </Box>
  );
}

export default Search;
