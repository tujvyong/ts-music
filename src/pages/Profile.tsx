import React, { useState, useEffect } from 'react'
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles'
import { Button, Container, TextField, Typography } from '@material-ui/core'
import { UserStore } from '../store/user/types'
import { useDispatch, useSelector } from 'react-redux'
import { RootStore } from '../store'
import { updateState } from '../store/user/actions'
import { clientAxios } from '../utils/axios'
import { ErrorUi } from '../store/ui/actions'

interface Props {

}

const Profile: React.FC<Props> = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const user = useSelector((state: RootStore) => state.user)
  const [edit, setEdit] = useState({
    username: false,
    profile: false,
    skill: false,
  })

  // const handleEditable = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
  //   let buttonEl = e.target as HTMLButtonElement
  //   let name: string = buttonEl.name
  //   console.log(name)
  //   // setEdit({ ...edit, [name]: edit[name] })
  // }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateState(e.target.name, e.target.value))
  }

  const updateSubmit = async () => {
    const { token, uid, username, profile, skill } = user
    const resp = await clientAxios.put(
      "/user",
      { uid: uid, column: "username", src: username },
      { headers: { 'Authorization': 'Bearer ' + token } }
    )
    if (resp.status !== 204) {
      console.error(resp.data.error)
    }
  }

  return (
    <Container>
      <div className={classes.editBox}>
        {/* <Button name="username" color="secondary" onClick={handleEditable}>編集する</Button> */}
        <TextField
          variant={edit.username ? "standard" : "outlined"}
          margin="normal"
          // required
          fullWidth
          id="username"
          value={user.username}
          name="username"
          label="User Name"
          inputProps={{
            readOnly: edit.username
          }}
          onChange={handleChange}
        />
        <Button onClick={updateSubmit}>Send</Button>
      </div>
      <TextField
        variant={edit.profile ? "standard" : "outlined"}
        margin="normal"
        required
        fullWidth
        id="profile"
        value={user.profile}
        name="profile"
        label="Profile"
        inputProps={{
          readOnly: edit.profile
        }}
        onChange={handleChange}
      />
      <TextField
        variant={edit.skill ? "standard" : "outlined"}
        margin="normal"
        required
        fullWidth
        id="skill"
        value={user.skill}
        name="skill"
        label="Skill"
        inputProps={{
          readOnly: edit.skill
        }}
        onChange={handleChange}
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
