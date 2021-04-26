/* eslint-disable jsx-a11y/label-has-associated-control */
import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  makeStyles,
  TextField
} from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { PhotoCamera } from '@material-ui/icons';
import { useAuth0 } from '@auth0/auth0-react';
import { useState } from 'react';
import { NavbarBack } from '../../components';

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
  const { user, isLoading } = useAuth0();
  const [, setName] = useState('');
  const [, setEmail] = useState('');
  const [, setStatus] = useState('');

  return (
    <Box minHeight="100vh" className={classes.backgroundGray}>
      <NavbarBack title="Settings" link="/" />
      <Container maxWidth="xs" className={classes.container}>
        <Box className={classes.content}>
          <Grid container spacing={3}>
            <Grid item xs={3}>
              {isLoading
                ? <Skeleton animation="wave" height="50px" />
                : 'Picture'}
            </Grid>
            <Grid item xs={9}>
              {isLoading
                ? (
                  <>
                    <Skeleton animation="wave" variant="circle">
                      <Avatar className={classes.large} />
                    </Skeleton>
                    <Skeleton animation="wave">
                      <Button
                        className={classes.mt1}
                        startIcon={<PhotoCamera />}
                      >
                        Upload
                      </Button>
                    </Skeleton>
                  </>
                )
                : (
                  <>
                    <Avatar alt={user.name} className={classes.large} src={user.picture} />
                    <input
                      accept="image/*"
                      className={classes.dNone}
                      id="contained-button-file"
                      type="file"
                    />
                    <label htmlFor="contained-button-file">
                      <Button
                        variant="outlined"
                        color="secondary"
                        size="small"
                        className={classes.mt1}
                        startIcon={<PhotoCamera />}
                      >
                        Upload
                      </Button>
                    </label>
                  </>
                )}
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={3}>
              {isLoading
                ? <Skeleton animation="wave" height="50px" />
                : 'Name'}
            </Grid>
            <Grid item xs={9}>
              {isLoading
                ? <Skeleton animation="wave" height="50px" />
                : (
                  <TextField
                    id="name"
                    variant="outlined"
                    color="secondary"
                    size="small"
                    value={user.name}
                    onChange={(event) => setName(event.target.value)}
                  />
                )}
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={3}>
              {isLoading
                ? <Skeleton animation="wave" height="50px" />
                : 'Email'}
            </Grid>
            <Grid item xs={9}>
              {isLoading
                ? <Skeleton animation="wave" height="50px" />
                : (
                  <TextField
                    id="email"
                    variant="outlined"
                    color="secondary"
                    size="small"
                    value={user.email}
                    onChange={(event) => setEmail(event.target.value)}
                  />
                )}
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={3}>
              {isLoading
                ? <Skeleton animation="wave" height="50px" />
                : 'Status'}
            </Grid>
            <Grid item xs={9}>
              {isLoading
                ? <Skeleton animation="wave" height="50px" />
                : (
                  <TextField
                    id="status"
                    variant="outlined"
                    color="secondary"
                    size="small"
                    value={user.status}
                    onChange={(event) => setStatus(event.target.value)}
                  />
                )}
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={3} />
            <Grid item xs={9}>
              {isLoading
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
                  >
                    Save
                  </Button>
                )}
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}

export default Settings;
