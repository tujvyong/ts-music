import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles'
import { Container, Grid, Typography, Avatar, Button } from '@material-ui/core'
import { RootStore } from '../store'
import ProfileText from '../components/users/ProfileText'
import ProfileImg from '../components/users/ProfileImg'
import { ImageUpload } from '../components/users/ImageUpload'
import ProfileTag from '../components/users/ProfileTag'
import { ProfileEdit } from '../utils/types'

interface Props {

}

const Profile: React.FC<Props> = () => {
  const classes = useStyles()
  const user = useSelector((state: RootStore) => state.user)
  const [edit, setEdit] = useState<ProfileEdit>({
    photo: false,
    username: false,
    profile: false,
    skill: false,
    genrus: false,
  })

  return (
    <Container>
      {edit.photo ? (
        <ImageUpload editable={edit.photo} setEdit={setEdit} />
      ) : null}
      <ProfileImg
        setEdit={setEdit}
      />

      <ProfileText
        label="ユーザー名"
        itemName="username"
        value={user.username}
        editable={edit.username}
        setEdit={setEdit}
      />
      <ProfileText
        label="プロフィール"
        itemName="profile"
        value={user.profile}
        editable={edit.profile}
        setEdit={setEdit}
        multi
      />
      <ProfileText
        label="演奏できるもの"
        itemName="skill"
        value={user.skill}
        editable={edit.skill}
        setEdit={setEdit}
        multi
      />
      <ProfileTag
        editable={edit.genrus}
        setEdit={setEdit}
      />
    </Container>
  )
}

export default Profile

const useStyles = makeStyles((theme: Theme) =>
  createStyles({

  })
)
