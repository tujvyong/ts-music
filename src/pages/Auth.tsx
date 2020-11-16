import React, { useState, useEffect } from 'react'
import firebase from '../firebase/Firebase'
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles'
import Avatar from '@material-ui/core/Avatar';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Login from '../components/Login';
import Register from '../components/Register'

interface Props {

}

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const Auth: React.FC<Props> = () => {
  const classes = useStyles()
  const [value, setValue] = useState(0)

  const handleChange = (e: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue)
  }

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Box mb={3}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="Auth Navigation"
          >
            <Tab label="Login" />
            <Tab label="Register" />
          </Tabs>
        </Box>
        {value === 0 ? (
          <Login />
        ) : (
            <Register />
          )}
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  )
}

export default Auth

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      paddingTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
  })
)
