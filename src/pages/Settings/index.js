/* eslint-disable jsx-a11y/label-has-associated-control */
import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  makeStyles,
  Snackbar,
  TextField
} from '@material-ui/core';
import { Alert, Skeleton } from '@material-ui/lab';
import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { NavbarBack } from '../../components';
import query from '../../constants/query';

const useStyles = makeStyles((theme) => ({
  backgroundGray: {
    backgroundColor: '#f7f7f7'
  },
  container: {
    backgroundColor: '#ffffff',
  },
  content: {
    paddingTop: theme.spacing(2),
    position: 'relative',
    minHeight: '90vh',
  },
  large: {
    height: theme.spacing(10),
    width: theme.spacing(10)
  },
  dNone: {
    display: 'none'
  },
  mt1: {
    marginTop: theme.spacing(1)
  }
}));

function Settings() {
  const classes = useStyles();
  const { user } = useAuth0();
  const { data, loading } = useQuery(query.GET_USER_BY_ID, {
    variables: { user_id: user.sub }
  });
  const [isOpenSnackbar, setIsOpenSnackbar] = useState(false);
  const [name, setName] = useState('');
  const [status, setStatus] = useState(null);
  const [updateUser] = useMutation(query.UPDATE_USER, {
    variables: {
      user_id: user?.sub,
      name,
      status
    }
  });

  useEffect(() => {
    if (!loading) {
      setName(data.users[0].name);
      setStatus(data.users[0].status);
    }
  }, [loading]);

  const handleOpenSnackbar = () => {
    setIsOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setIsOpenSnackbar(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    updateUser();
    handleOpenSnackbar();
  };

  return (
    <Box minHeight="100vh" className={classes.backgroundGray}>
      <NavbarBack title="Settings" link="/" />
      <Container maxWidth="xs" className={classes.container}>
        <Box className={classes.content}>
          <Grid container spacing={3}>
            <Grid item xs={3}>
              {loading
                ? <Skeleton animation="wave" height="50px" />
                : 'Picture'}
            </Grid>
            <Grid item xs={9}>
              {loading
                ? (
                  <Skeleton animation="wave" variant="circle">
                    <Avatar className={classes.large} />
                  </Skeleton>
                )
                : (
                  <Avatar
                    alt={name}
                    className={classes.large}
                    src={data.users[0].picture}
                  />
                )}
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={3}>
              {loading
                ? <Skeleton animation="wave" height="50px" />
                : 'Name'}
            </Grid>
            <Grid item xs={9}>
              {loading
                ? <Skeleton animation="wave" height="50px" />
                : (
                  <TextField
                    id="name"
                    variant="outlined"
                    color="secondary"
                    size="small"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                  />
                )}
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={3}>
              {loading
                ? <Skeleton animation="wave" height="50px" />
                : 'Status'}
            </Grid>
            <Grid item xs={9}>
              {loading
                ? <Skeleton animation="wave" height="50px" />
                : (
                  <TextField
                    id="status"
                    variant="outlined"
                    color="secondary"
                    size="small"
                    value={status || ''}
                    onChange={(event) => setStatus(event.target.value)}
                  />
                )}
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={3} />
            <Grid item xs={9}>
              {loading
                ? (
                  <Skeleton animation="wave">
                    <Button className={classes.mt1}>
                      Save
                    </Button>
                  </Skeleton>
                )
                : (
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.mt1}
                    onClick={handleSubmit}
                  >
                    Save
                  </Button>
                )}
            </Grid>
          </Grid>
          <Snackbar open={isOpenSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
            <Alert onClose={handleCloseSnackbar} severity="success">
              Data berhasil diperbaharui :D
            </Alert>
          </Snackbar>
        </Box>
      </Container>
    </Box>
  );
}

export default Settings;
