import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import firebase from '../firebase/Firebase'
import { useHistory } from 'react-router-dom';

interface Props {

}

const Register: React.FC<Props> = () => {
  const classes = useStyles()
  let history = useHistory()
  const [state, setState] = useState({
    email: '',
    password: ''
  })
  const [errors, setErrors] = useState([])

  const handleSubmit = async () => {
    const res = await firebase.auth().createUserWithEmailAndPassword(state.email, state.password).catch(err => {
      let errorCode = err.code
      let errorMessage = err.message
      // setErrors(errors => errors.push(errorMessage))
      if (errorCode === 'auth/weak-password') {
        console.log("The password is too weak.")
      } else {
        console.log(errorCode)
        console.log(errorMessage)
      }
    })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [e.currentTarget.name]: e.currentTarget.value })
  }

  const handleKeydown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleSubmit()
    }
  }

  return (
    <>
      <Typography component="h1" variant="h5">
        Register
      </Typography>
      <form className={classes.form} noValidate>
        {errors.length > 0 ? (
          <div className={classes.errors}>
            <ul>
              {errors.map((err, index) => (
                <li>{err}</li>
              ))}
            </ul>
          </div>
        ) : null}
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          value={state.email}
          label="Email Address"
          name="email"
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
          label="Password"
          name="password"
          type="password"
          autoComplete="current-password"
          onChange={handleChange}
          onKeyDown={handleKeydown}
        />
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label=""
        />
        <Button
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={handleSubmit}
        >
          Register
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
  )
}

export default Register

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    errors: {
      border: `1px solid ${theme.palette.secondary.main}`,
      borderRadius: theme.shape.borderRadius,
      padding: theme.spacing(2),
    }
  })
)
