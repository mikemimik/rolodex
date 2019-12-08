import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import { debounce } from 'lodash';
import {
  Avatar,
  Button,
  FormControl,
  FormControlLabel,
  Checkbox,
  Input,
  InputLabel,
  Paper,
  Typography,
  IconButton,
  Snackbar,
  SnackbarContent,
} from '@material-ui/core';
import {
  LockOutlined as LockOutlinedIcon,
  Error as ErrorIcon,
  Close as CloseIcon,
} from '@material-ui/icons';

import { setToken } from '../services/tokenService';

const styles = (theme) => ({
  root: {},
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    [theme.breakpoints.up(400 + theme.spacing(3) * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(3)}px`,
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    marginTop: theme.spacing(3),
  },
  snackError: {
    backgroundColor: theme.palette.error.dark,
  },
  snackIcon: {
    fontSize: 20,
    opacity: 0.9,
    marginRight: theme.spacing(1),
  },
  snackMessage: {
    display: 'flex',
    alignItems: 'center',
  },
});

class Login extends PureComponent {
  constructor (props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      error: {},
    };

    this.debounceChange = debounce(this.handleInputChange, 300);
  }

  submit = async () => {
    try {
      const { email, password } = this.state;
      const loginResponse = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('loginResponse:', loginResponse);
      const { ok, status, statusText } = loginResponse;
      if (ok) {
        const { data } = await loginResponse.json();
        const [ tokenData ] = data;
        const { token } = tokenData;
        setToken(token);
        this.props.fetchUser();
      } else {
        this.setState({
          error: {
            status,
            message: statusText,
          },
        });
      }
    } catch (e) {
      console.error('error:', e);
    }
  }

  handleClose = () => {
    this.setState({
      error: {},
    });
  }

  handleInputChange = (id, value) => {
    this.setState({ [id]: value });
  }

  componentDidMount () {
    console.group('Login::componentDidMount');
    console.groupEnd();
  }

  render () {
    const { classes } = this.props;
    const { error } = this.state;
    return (
      <main className={classes.main}>
        <Paper className={classes.paper}>
          <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            open={!!Object.keys(error).length}
            onClose={this.handleClose}
            ContentProps={{ 'aria-describedby': 'message-id' }}
            autoHideDuration={6000}
          >
            <SnackbarContent
              className={classes.snackError}
              aria-describedby='client-snackbar'
              message={
                <span id='client-snackbar' className={classes.snackMessage}>
                  <ErrorIcon
                    className={classes.snackIcon}
                  />
                  {error.message || ''}
                </span>
              }
              action={[
                <IconButton
                  key='close'
                  aria-label='Close'
                  color='inherit'
                  onClick={this.handleClose}
                >
                  <CloseIcon className={classes.icon} />
                </IconButton>,
              ]}
            />
          </Snackbar>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Sign in
          </Typography>
          <form className={classes.form}>
            <FormControl margin='normal' required fullWidth>
              <InputLabel htmlFor='email'>Email Address</InputLabel>
              <Input
                autoFocus
                id='email'
                name='email'
                type='email'
                autoComplete='email'
                onChange={({ target: { id, value } }) => {
                  this.debounceChange(id, value);
                }}
              />
            </FormControl>
            <FormControl margin='normal' required fullWidth>
              <InputLabel htmlFor='password'>Password</InputLabel>
              <Input
                id='password'
                name='password'
                type='password'
                autoComplete='current-password'
                onChange={({ target: { id, value } }) => {
                  this.debounceChange(id, value);
                }}
              />
            </FormControl>
            <FormControlLabel
              control={<Checkbox value='remember' color='primary' />}
              label='Remember me'
            />
            <Button
              fullWidth
              variant='contained'
              color='primary'
              className={classes.submit}
              onClick={this.submit}
            >
              Sign in
            </Button>
          </form>
        </Paper>
      </main>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object,
  fetchUser: PropTypes.func,
};

export default withStyles(styles)(Login);
