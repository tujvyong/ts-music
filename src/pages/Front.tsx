import React, { useState, useEffect } from 'react'
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles'
import { Container, Typography } from '@material-ui/core'
import { clientAxios } from "../utils/axios";
import { useSelector } from 'react-redux';
import { RootStore } from '../store';
import { UserStore } from '../store/user/types';

interface Props {

}

const Front: React.FC<Props> = () => {
  const classes = useStyles()
  const token = useSelector((state: RootStore) => state.user.token)
  // const [state, setState] = useState<UserStore[]>([])

  // useEffect(() => {
  //   (async () => {
  //     const res = await clientAxios.get("/userlist", { headers: { 'Authorization': 'Bearer ' + token } })
  //     if (res) {
  //       console.log(res)
  //     }
  //   })()
  // }, [token])

  return (
    <Container>
      <Typography color="inherit">Front page</Typography>
    </Container>
  )
}

export default Front

const useStyles = makeStyles((theme: Theme) =>
  createStyles({

  })
)
