import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import classes from './authView.css';
import { useOktaAuth } from '@okta/okta-react';

import PropTypes from 'prop-types';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {Avatar, 
  Box, 
  Button,
  Container, 
  CssBaseline,
  Grid, 
  Link, 
  TextField, 
  Typography
} from '@mui/material';

// import { useDispatch } from 'react-redux';
// import { getLoggedInUser } from 'store/accountSlice';


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Raven Health
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


function LoginView({ className, onSubmitSuccess, ...rest }) {
  const { oktaAuth} = useOktaAuth();

  const history = useHistory();

  const [ username, setUsername ] = useState(process.env.REACT_APP_USERNAME )
  const [ password, setPassword ] = useState(process.env.REACT_APP_PASSWORD)

  return (
    <Container component="main" maxWidth="xs">
    <CssBaseline />
    <div className={classes.paper}>
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      <form className={classes.form} onSubmit={(e) => {
        e.preventDefault();
        oktaAuth.signInWithCredentials({ username, password })
          .then(res => {
            const sessionToken = res.sessionToken;
            // sessionToken is a one-use token, so make sure this is only called once
            oktaAuth.signInWithRedirect({ sessionToken });
        })
        .catch(err => console.log('Found an error', err));
        // TODO - dispatch setting the logged in user 
        // dispatch(getLoggedInUser({username, password}));
      }}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="username"
          label="Username"
          name="username"
          autoFocus
          value={username}
          onChange={(e) => setUsername(e.target.value)}
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
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Sign In
        </Button>
        <Grid container>
          <Grid item xs>
            <Link href="#" variant="body2">
              Forgot password?
            </Link>
          </Grid>
          <Grid item>
            <Link  
              component="button"
              variant="body2"
              onClick={() => {
                history.push('/create-account')
              }}
            >
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
        </Grid>
      </form>
    </div>
    <Box mt={8}>
      <Copyright />
    </Box>
  </Container>
  );
}
LoginView.propTypes = {
  className: PropTypes.string,
  onSubmitSuccess: PropTypes.func
};
LoginView.defaultProps = {
  onSubmitSuccess: () => {}
};
export default LoginView;