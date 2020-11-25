import React, { useState, useEffect } from 'react'
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles'
import { Button, Typography } from '@material-ui/core'
import firebase from '../firebase/Firebase'

interface Props {

}

const Footer: React.FC<Props> = () => {
  const classes = useStyles()

  const handleLogout = () => {
    firebase.auth().signOut().then((res) => {
      console.log("Logged out", res)
    }).catch((err) => {
      console.error("action=Logout", err)
    });
  }

  return (
    <Typography align="center">
      <Button
        onClick={handleLogout}
      >
        Logout
    </Button>
    </Typography>
  )
}

export default Footer

const useStyles = makeStyles((theme: Theme) =>
  createStyles({

  })
)
