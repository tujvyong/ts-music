import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles'
import { Container } from '@material-ui/core'
import { RootStore } from '../store'
import ProfileItem from '../components/users/ProfileItem'

interface Props {

}

const Profile: React.FC<Props> = () => {
  const classes = useStyles()
  const user = useSelector((state: RootStore) => state.user)
  const [edit, setEdit] = useState({
    username: false,
    profile: false,
    skill: false,
  })

  return (
    <Container>
      <ProfileItem
        label="ユーザー名"
        itemName="username"
        value={user.username}
        editable={edit.username}
        setEdit={setEdit}
      />
      <ProfileItem
        label="プロフィール"
        itemName="profile"
        value={user.profile}
        editable={edit.profile}
        setEdit={setEdit}
        multi
      />
      <ProfileItem
        label="演奏できるもの"
        itemName="skill"
        value={user.skill}
        editable={edit.skill}
        setEdit={setEdit}
        multi
      />
    </Container>
  )
}

export default Profile

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    editBox: {
      '&:hover': {

      }
    }
  })
)
