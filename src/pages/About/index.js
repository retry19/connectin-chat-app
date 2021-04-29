import {
  Avatar,
  Box,
  Container,
  Grid,
  IconButton,
  makeStyles,
  Typography
} from '@material-ui/core';
import { Email, Facebook, GitHub, Instagram, Twitter, WhatsApp } from '@material-ui/icons';
import { NavbarBack } from '../../components';
import photoMe from '../../assets/images/photo-me.jpg';

const useStyles = makeStyles((theme) => ({
  backgroundGray: {
    backgroundColor: '#f7f7f7'
  },
  container: {
    backgroundColor: '#ffffff',
  },
  content: {
    position: 'relative',
    minHeight: '90vh',
    paddingTop: theme.spacing(7)
  },
  avatar: {
    width: theme.spacing(14),
    height: theme.spacing(14),
    margin: '20px auto'
  },
  textCenter: {
    textAlign: 'center'
  }
}));

function About() {
  const classes = useStyles();

  return (
    <Box minHeight="100vh" className={classes.backgroundGray}>
      <NavbarBack title="About" link="/" />
      <Container maxWidth="xs" className={classes.container}>
        <Box className={classes.content}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Avatar alt="Reza Rachmanuddin" src={photoMe} className={classes.avatar} />
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={12} className={classes.textCenter}>
              <Typography component="h6" variant="h6">
                Reza Rachmanuddin
              </Typography>
              <Typography component="p" variant="subtitle2" style={{ fontWeight: '400' }}>
                Kuningan, Jawa Barat 45592
              </Typography>
            </Grid>
          </Grid>
          <Grid container spacing={3} style={{ marginTop: '20px' }}>
            <Grid item xs={12} className={classes.textCenter}>
              <a href="mailto:rezarahmanudin@gmail.com" target="_blank" rel="noreferrer">
                <IconButton>
                  <Email />
                </IconButton>
              </a>
              <a href="https://wa.me/6289661938540" target="_blank" rel="noreferrer">
                <IconButton>
                  <WhatsApp />
                </IconButton>
              </a>
              <a href="https://github.com/retry19" target="_blank" rel="noreferrer">
                <IconButton>
                  <GitHub />
                </IconButton>
              </a>
              <a href="https://instagram.com/re_try19" target="_blank" rel="noreferrer">
                <IconButton>
                  <Instagram />
                </IconButton>
              </a>
              <a href="https://twitter.com/re_try19" target="_blank" rel="noreferrer">
                <IconButton>
                  <Twitter />
                </IconButton>
              </a>
              <a href="https://www.facebook.com/reza.rachmanuddin.9/" target="_blank" rel="noreferrer">
                <IconButton>
                  <Facebook />
                </IconButton>
              </a>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}

export default About;
