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
import ProfileBasic from '../components/users/ProfileBasic'

interface Props {

}

const Profile: React.FC<Props> = () => {
  const classes = useStyles()
  const user = useSelector((state: RootStore) => state.user)
  const [edit, setEdit] = useState<ProfileEdit>({
    photo: false,
    basic: false,
    profile: false,
    skill: false,
    genrus: false,
    instruments: false
  })

  return (
    <>
      <div className={classes.profileTopBox}>
        <div style={{ backgroundColor: 'rgb(83, 83, 83)' }} className={classes.bgDefault}></div>
        <div className={classes.bgLiner}></div>
        <Container>
          <div className={classes.profileTopItems}>
            <ProfileImg
              setEdit={setEdit}
            />
            <ProfileBasic
              editable={edit.basic}
              setEdit={setEdit}
            />
          </div>
        </Container>
      </div>
      {edit.photo ? (
        <ImageUpload editable={edit.photo} setEdit={setEdit} />
      ) : null}


      <Container>
        <ProfileText
          label="プロフィール"
          itemName="profile"
          value={user.profile}
          editable={edit.profile}
          setEdit={setEdit}
          multi
        />
        <ProfileTag
          title="ジャンル"
          itemName="genrus"
          editable={edit.genrus}
          setEdit={setEdit}
        />
        <ProfileTag
          title="楽器"
          itemName="instruments"
          editable={edit.instruments}
          setEdit={setEdit}
        />
      </Container>
    </>
  )
}

export default Profile

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    profileTopBox: {
      position: 'relative',
      padding: `0 ${theme.spacing(2)}px ${theme.spacing(2)}px`,
    },
    bgDefault: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      top: 0,
      left: 0,
    },
    bgLiner: {
      background: 'linear-gradient(transparent,rgba(0,0,0,.5))',
      position: 'absolute',
      width: '100%',
      height: '100%',
      top: 0,
      left: 0,
    },
    profileTopItems: {
      display: 'flex',
      minHeight: '240px',
      alignItems: 'center',
    }
  })
)
