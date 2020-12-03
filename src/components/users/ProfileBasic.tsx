import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles'
import EditIcon from '@material-ui/icons/Edit';
import RoomIcon from '@material-ui/icons/Room';
import { Button, Grid, Paper, TextField, Typography, Dialog, DialogContent, DialogActions, useRadioGroup, IconButton } from '@material-ui/core'
import { RootStore } from '../../store'
import { BackdropUi, ErrorUi } from "../../store/ui/actions";
import { updateBasic, updateState } from '../../store/user/actions'
import { userUpdate, APIresponce } from '../../utils/axios'
import { ProfileEdit } from '../../utils/types'
import { BgUpload } from './BgUpload';

interface Props {
  editable: boolean
  setEdit: React.Dispatch<React.SetStateAction<ProfileEdit>>
}

const ProfileBasic: React.FC<Props> = ({ editable, setEdit }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const user = useSelector((state: RootStore) => state.user)
  const [editBg, setEditBg] = useState(false)
  const [tmpState, setTmpState] = useState({
    username: user.username,
    bio: user.bio,
    place: user.place,
    isChanged: false
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTmpState({ ...tmpState, [e.target.name]: e.target.value, isChanged: true })
  }

  const handleCancel = () => {
    let c
    if (tmpState.isChanged) {
      c = window.confirm("変更が破棄されますが、よろしいですか？")
      if (c) {
        setTmpState({
          username: user.username,
          bio: user.bio,
          place: user.place,
          isChanged: false
        })
      } else {
        return
      }
    }
    setEdit(state => {
      return {
        ...state,
        basic: false
      }
    })
  }

  const handelEdit = () => {
    setEdit(state => {
      return {
        ...state,
        basic: true
      }
    })
  }

  const handleEditBg = () => {
    setEditBg(!editBg)
  }

  const updateSubmit = async () => {
    const { token, uid } = user
    let validUsername = tmpState.username.trim()
    let validBio = tmpState.bio.trim()
    let validPlace = tmpState.place.trim()
    if (validUsername === undefined || validUsername === '') { return }
    if (token === null || uid === null) { return }

    dispatch(BackdropUi(true))
    const res: APIresponce = await userUpdate(token, { "username": validUsername, "bio": validBio, "place": validPlace })
    if (res.status !== 204) {
      dispatch(ErrorUi(res.error as string))
      return
    }
    dispatch(updateBasic({ username: validUsername, bio: validBio, place: validPlace }))
    setTmpState({ ...tmpState, isChanged: false })
    setEdit(state => {
      return {
        ...state,
        basic: false
      }
    })
    dispatch(BackdropUi(false))
  }

  let content
  if (editBg) {
    content = (
      <BgUpload
        editable={editBg}
        setEdit={setEditBg}
      />
    )
  } else if (editable) {
    content = (
      <Dialog open={editable} fullWidth maxWidth="xs" className={classes.editBox}>
        <div
          style={{ backgroundImage: `url(${user.bgURL})` }}
          className={classes.bgShape}
          onClick={handleEditBg}
        >
          <div className={classes.bgLiner}></div>
          <Typography color="textSecondary" variant="body2" className={classes.bgText}>カバー写真を変更</Typography>
        </div>
        <DialogContent>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            value={tmpState.username}
            name="username"
            label="ユーザー名"
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="bio"
            value={tmpState.bio}
            name="bio"
            label="キャッチコピー"
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="place"
            value={tmpState.place}
            name="place"
            label="現在地"
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" color="primary" onClick={updateSubmit}>更新する</Button>
          <Button onClick={handleCancel}>キャンセル</Button>
        </DialogActions>
      </Dialog>
    )
  } else {
    content = (
      <div className={classes.showBox}>
        <Grid container spacing={2}>
          <Grid item>
            <Typography component="h1" variant="h3" gutterBottom>
              {tmpState.username}
              <IconButton className={classes.editIcon} onClick={handelEdit}>
                <EditIcon />
              </IconButton>
            </Typography>
            <Typography gutterBottom>{tmpState.bio}</Typography>
            <Typography color="textSecondary">
              <RoomIcon className={classes.roomIcon} />{tmpState.place}
            </Typography>
          </Grid>
        </Grid>
      </div>
    )
  }

  return (
    <>
      {content}
    </>
  )
}

export default ProfileBasic

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    showBox: {
      marginBottom: theme.spacing(2),
      alignSelf: 'flex-end',
      zIndex: 0,
    },
    editBox: {
      marginBottom: theme.spacing(3),
      padding: theme.spacing(2),
    },
    editIcon: {
      marginLeft: '4px',
    },
    roomIcon: {
      verticalAlign: 'text-bottom',
      marginRight: '4px',
    },
    bgShape: {
      position: 'relative',
      height: 0,
      width: '100%',
      paddingTop: '100px',
      cursor: 'pointer',
    },
    bgLiner: {
      background: 'linear-gradient(transparent,rgba(0,0,0,.5))',
      position: 'absolute',
      width: '100%',
      height: '100%',
      top: 0,
      left: 0,
    },
    bgText: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    }
  })
)
