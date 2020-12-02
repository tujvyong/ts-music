import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles'
import { Button, Grid, Avatar, Typography } from '@material-ui/core'
import { RootStore } from '../../store'
import { ProfileEdit } from '../../utils/types'

interface Props {
  setEdit: React.Dispatch<React.SetStateAction<ProfileEdit>>
}

const ProfileImg: React.FC<Props> = ({ setEdit }) => {
  const classes = useStyles()
  const photoURL = useSelector((state: RootStore) => state.user.photoURL)

  const handleEdit = () => {
    setEdit((edit) => {
      return { ...edit, photo: true }
    })
  }

  return (
    <>
      <Button onClick={handleEdit} className={classes.root}>
        <Avatar
          alt="User Avatar"
          src={photoURL ?? ''}
          classes={{ root: classes.avatarRoot, colorDefault: classes.avatarColor }}
        />
      </Button>
    </>
  )
}

export default ProfileImg

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      alignSelf: 'flex-end',
      marginRight: '24px',
    },
    avatarRoot: {
      display: 'flex',
      width: '160px',
      height: '160px',
    },
    avatarColor: {
      color: theme.palette.background.paper,
      backgroundColor: theme.palette.background.default,
    }
  })
)
