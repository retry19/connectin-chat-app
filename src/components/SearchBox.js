import { Container, InputBase, makeStyles } from '@material-ui/core';
import { Search } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  search: {
    marginTop: theme.spacing(1),
    position: 'relative',
    borderRadius: 30,
    backgroundColor: theme.palette.grey['100'],
    '&:hover': {
      backgroundColor: theme.palette.grey['200'],
    },
    height: '45px',
    [theme.breakpoints.up('sm')]: {
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    padding: theme.spacing(1.8, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    height: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '100%',
      '&:focus': {
        width: '100%',
      },
    },
  },
}));

function SearchBox() {
  const classes = useStyles();

  return (
    <Container maxWidth="sm">
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <Search />
        </div>
        <InputBase
          placeholder="Search"
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          inputProps={{ 'aria-label': 'search' }}
        />
      </div>
    </Container>
  );
}

export default SearchBox;
