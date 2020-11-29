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
      <Grid container spacing={2}>
        <Grid item>
          <Typography component="h2" variant="h6">プロフィール画像</Typography>
        </Grid>
        <Grid item>
          <Button color="secondary" onClick={handleEdit}>編集する</Button>
        </Grid>
      </Grid>
      <Avatar
        alt="User Avatar"
        src={photoURL ?? ''}
        classes={{ root: classes.avatarRoot }}
      />
    </>
  )
}

export default ProfileImg

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    avatarRoot: {
      display: 'inline-block',
      width: '160px',
      height: '160px',
    },
    avatarIcon: {
      width: '100%',
      height: '100%',
    },
  })
)
