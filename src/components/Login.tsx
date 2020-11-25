
import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles'
import firebase from '../firebase/Firebase'


const Login = () => {
  const classes = useStyles();
  const [state, setState] = useState({
    email: '',
    password: ''
  })

  const handleLogin = async () => {
    const { email, password } = state
    const credentials = await firebase.auth().signInWithEmailAndPassword(email, password).catch((err) => {
      if (err.Code === 'auth/invalid-email') {
        alert("無効なメールアドレスです")
      } else if (err.Code === 'auth/user-not-found') {
        alert("メールアドレスが見つかりませんでした")
      } else if (err.Code === 'auth/wrong-password') {
        alert("パスワードが違うか、設定されていません")
      } else {
        alert(err.message)
      }
      console.error(err)
    })
    console.log(credentials)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [e.currentTarget.name]: e.currentTarget.value })
  }

  return (
    <>
      <Typography component="h1" variant="h5">
        Login
      </Typography>
      <form className={classes.form} noValidate>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          value={state.email}
          name="email"
          label="Email Address"
          autoComplete="email"
          autoFocus
          onChange={handleChange}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="password"
          value={state.password}
          name="password"
          label="Password"
          type="password"
          autoComplete="current-password"
          onChange={handleChange}
        />
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        />
        <Button
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={handleLogin}
        >
          Login
          </Button>
        <Grid container>
          <Grid item xs>
            <Link href="#" variant="body2">
              Forgot password?
              </Link>
          </Grid>
          <Grid item>
            <Link href="#" variant="body2">
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
        </Grid>
      </form>
    </>
  );
}

export default Login

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  })
);
