import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import LockOpenIcon from '@material-ui/icons/LockOpen';

import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link
        color="inherit"
        href="https://www.happiestminds.com/mindful-it-company/"
      >
        Happiest Minds
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1)
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

const Register = ({ setAlert, register, isAuthenticated }) => {
  const classes = useStyles();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  const { name, email, password, password2 } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert('Passwords do not match', 'danger');
    } else {
      register({ name, email, password });
    }
  };

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <React.Fragment>
      <div>
        <nav>
          <div
            style={{
              backgroundColor: ' #D3D3D3',
              width: '100%',
              top: '0',
              left: '0',
              marginBottom: '10px'
            }}
          >
            <img
              src="https://www.happiestminds.com/wp-content/themes/hmtheme/images/happiest_mind_logo.png"
              alt="Happiest Minds"
            />
          </div>
        </nav>
        <div
          style={{
            height: '84vh',
            display: 'flex',
            width: '42%',
            margin: 'auto',
            marginTop: '1.5%',
            borderRadius: '20px',
            boxShadow: '5px 5px 20px 2px rgba(0,0,0,0.75)'
          }}
        >
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
              <LockOpenIcon fontSize="large" className={classes.avatar} />

              <Typography component="h1" variant="h5">
                Register
              </Typography>
              <form className={classes.form} noValidate onSubmit={onSubmit}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="name"
                  label="Username"
                  name="name"
                  autoComplete="name"
                  value={name}
                  onChange={onChange}
                  autoFocus
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={onChange}
                  autoFocus
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  value={password}
                  onChange={onChange}
                  autoComplete="current-password"
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password2"
                  label="Confirm Password"
                  type="password2"
                  id="password2"
                  value={password2}
                  onChange={onChange}
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  value="Register"
                  className={classes.submit}
                >
                  Sign Up
                </Button>
                <Button variant="contained" color="secondary" fullWidth>
                  Reset
                </Button>
                <Grid container>
                  <Grid item xs></Grid>
                  <Grid item>
                    <Link href="/Login" variant="body2">
                      {'Already have an account? Login'}
                    </Link>
                  </Grid>
                </Grid>
              </form>
            </div>
            <Box mt={7}>
              <Copyright />
            </Box>
          </Container>
        </div>
      </div>
    </React.Fragment>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { setAlert, register })(Register);