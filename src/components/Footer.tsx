import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles'
import { Button, Typography } from '@material-ui/core'
import { RootStore } from '../store';
import firebase from '../firebase/Firebase'

interface Props {

}

const Footer: React.FC<Props> = () => {
  const classes = useStyles()
  const isAuthed = useSelector((state: RootStore) => state.user.isLoaded)

  const handleLogout = () => {
    firebase.auth().signOut().then((res) => {
      console.log("Logged out", res)
    }).catch((err) => {
      console.error("action=Logout", err)
    });
  }

  return (
    <Typography align="center">
      {isAuthed ? (
        <Button
          onClick={handleLogout}
        >
          Logout
        </Button>
      ) : null}
    </Typography>
  )
}

export default Footer

const useStyles = makeStyles((theme: Theme) =>
  createStyles({

  })
)
