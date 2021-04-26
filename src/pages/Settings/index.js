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
import { PhotoCamera } from '@material-ui/icons';
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

  return (
    <Box minHeight="100vh" className={classes.backgroundGray}>
      <NavbarBack title="Settings" link="/" />
      <Container maxWidth="xs" className={classes.container}>
        <Box className={classes.content}>
          <Grid container spacing={3}>
            <Grid item xs={3}>
              Photo
            </Grid>
            <Grid item xs={9}>
              <Avatar alt="Reza Rachmanuddin" className={classes.large} />
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
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={3}>
              Name
            </Grid>
            <Grid item xs={9}>
              <TextField
                id="name"
                variant="outlined"
                color="secondary"
                size="small"
              />
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={3}>
              Email
            </Grid>
            <Grid item xs={9}>
              <TextField
                id="email"
                variant="outlined"
                color="secondary"
                size="small"
              />
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={3} />
            <Grid item xs={9}>
              <Button
                variant="contained"
                color="primary"
                className={classes.mt1}
              >
                Save
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}

export default Settings;
