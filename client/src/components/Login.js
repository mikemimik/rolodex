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
} from '@material-ui/core';
import { LockOutlined as LockOutlinedIcon } from '@material-ui/icons';

import { setToken } from '../services/tokenService';

const styles = (theme) => ({
  root: {},
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});

class Login extends PureComponent {
  constructor (props) {
    super(props);
    this.state = {
      email: '',
      password: '',
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
      const { data } = await loginResponse.json();
      const [ tokenData ] = data;
      const { token } = tokenData;
      setToken(token);
      this.props.fetchUser();
    } catch (e) {
      console.error('error:', e);
    }
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
    return (
      <main className={classes.main}>
        <Paper className={classes.paper}>
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
