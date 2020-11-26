import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles'
import { Button, Grid, Paper, TextField, Typography } from '@material-ui/core'
import { RootStore } from '../../store'
import { BackdropUi } from "../../store/ui/actions";
import { updateState } from '../../store/user/actions'
import { clientAxios } from '../../utils/axios'

interface Props {
  label: string
  itemName: string
  value: string | null
  editable: boolean
  setEdit: React.Dispatch<React.SetStateAction<{ username: boolean; profile: boolean; skill: boolean; }>>
  multi?: boolean
}

const ProfileItem: React.FC<Props> = ({ label, itemName, value, editable, setEdit, multi = false }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const user = useSelector((state: RootStore) => state.user)
  const [tmpState, setTmpState] = useState({
    body: value,
    isChanged: false
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTmpState({ body: e.target.value, isChanged: true })
  }

  const handleCancel = () => {
    let c
    if (tmpState.isChanged) {
      c = window.confirm("変更が破棄されまっせ？")
      if (c) {
        setTmpState({ body: value, isChanged: false })
      } else {
        return
      }
    }
    setEdit(state => {
      return {
        ...state,
        [itemName]: false
      }
    })
  }

  const handelEdit = () => {
    setEdit(state => {
      return {
        ...state,
        [itemName]: true
      }
    })
  }

  const updateSubmit = async () => {
    const { token, uid } = user
    let srcData = tmpState.body?.trim()
    if (srcData === undefined || srcData === '') { return }

    dispatch(BackdropUi(true))
    const resp = await clientAxios.put(
      "/user",
      { u: uid, c: itemName, s: srcData },
      { headers: { 'Authorization': 'Bearer ' + token }, withCredentials: true }
    )
    if (resp.status !== 204) {
      console.error(resp.data.error)
      dispatch(BackdropUi(false))
      return
    }
    dispatch(updateState(itemName, srcData))
    setTmpState({ ...tmpState, isChanged: false })
    setEdit(state => {
      return {
        ...state,
        [itemName]: false
      }
    })
    dispatch(BackdropUi(false))
  }

  let content
  if (editable) {
    content = (
      <Paper className={classes.editBox}>
        <TextField
          variant="outlined"
          margin="normal"
          // required
          fullWidth
          multiline={multi}
          rows={6}
          rowsMax={6}
          id={itemName}
          value={tmpState.body}
          name={itemName}
          label={label}
          onChange={handleChange}
        />
        <Button variant="outlined" color="primary" onClick={updateSubmit}>更新する</Button>
        <Button onClick={handleCancel}>キャンセル</Button>
      </Paper>
    )
  } else {
    content = (
      <div className={classes.showBox}>
        <Grid container spacing={2}>
          <Grid item>
            <Typography component="h2" variant="h6">{label}</Typography>
          </Grid>
          <Grid item>
            <Button name={itemName} color="secondary" onClick={handelEdit}>編集する</Button>
          </Grid>
        </Grid>
        <Typography>{value}</Typography>
      </div>
    )
  }

  return (
    <>
      {content}
    </>
  )
}

export default ProfileItem

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    showBox: {
      marginBottom: theme.spacing(3),
    },
    editBox: {
      marginBottom: theme.spacing(3),
      padding: theme.spacing(2),
    },
  })
)
