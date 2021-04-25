import { Box, Container, InputBase, makeStyles } from '@material-ui/core';
import NavbarBack from '../components/NavbarBack';
import ChatList from '../containers/ChatList';

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
  inputSearch: {
    marginLeft: theme.spacing(1),
    flex: 1,
  }
}));

function Search() {
  const classes = useStyles();
  return (
    <Box minHeight="100vh" className={classes.backgroundGray}>
      <NavbarBack link="/">
        <InputBase
          className={classes.inputSearch}
          placeholder="Search"
          inputProps={{ 'aria-label': 'search' }}
          autoFocus="on"
        />
      </NavbarBack>
      <Container maxWidth="sm" className={classes.container}>
        <Box className={classes.content}>
          <ChatList />
        </Box>
      </Container>
    </Box>
  );
}

export default Search;
