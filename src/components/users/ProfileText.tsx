import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles'
import { Button, Grid, Paper, TextField, Typography, IconButton } from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit';
import { RootStore } from '../../store'
import { BackdropUi, ErrorUi } from "../../store/ui/actions";
import { updateState } from '../../store/user/actions'
import { userUpdate, APIresponce } from '../../utils/axios'
import { ProfileEdit } from '../../utils/types'

interface Props {
  label: string
  itemName: string
  value: string | null
  editable: boolean
  setEdit: React.Dispatch<React.SetStateAction<ProfileEdit>>
  multi?: boolean
}

const ProfileText: React.FC<Props> = ({ label, itemName, value, editable, setEdit, multi = false }) => {
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
      c = window.confirm("変更が破棄されますが、よろしいですか？")
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
    if (token === null || uid === null) { return }

    dispatch(BackdropUi(true))
    const res: APIresponce = await userUpdate(token, { [itemName]: srcData })
    if (res.status !== 204) {
      dispatch(ErrorUi(res.error as string))
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
            <Typography component="h2" variant="h4">
              {label}
              <IconButton className={classes.editIcon} onClick={handelEdit}>
                <EditIcon />
              </IconButton>
            </Typography>
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

export default ProfileText

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    showBox: {
      margin: `${theme.spacing(3)}px 0`,
    },
    editBox: {
      margin: `${theme.spacing(3)}px 0`,
      padding: theme.spacing(2),
    },
    editIcon: {
      marginLeft: '4px',
    },
  })
)
