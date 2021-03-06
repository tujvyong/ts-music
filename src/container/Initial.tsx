import React, { useState, useEffect } from 'react'
import { clientAxios } from '../utils/axios'
import { useDispatch } from 'react-redux'
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles'
import { Box } from '@material-ui/core'
import firebase from '../firebase/Firebase'
import { setInitialUser } from '../store/user/actions'
import Loading from '../components/Loading'
import { ErrorUi } from '../store/ui/actions';

interface Props {

}

const Initial: React.FC<Props> = ({ children }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [isLoaded, setIsLoaded] = useState(false)

  const backendAuth = async (id: string) => {
    const authed = await clientAxios.post(
      "/authorization",
      { data: {} },
      { headers: { 'Authorization': 'Bearer ' + id } },
    ).catch(err => {
      dispatch(ErrorUi(err))
      console.log(err)
    })
    if (authed) {
      dispatch(setInitialUser(authed.data))
      setIsLoaded(true)
    }
  }

  useEffect(() => {
    firebase.auth().onAuthStateChanged((currentUser) => {
      if (currentUser) {
        currentUser.getIdToken(true).then((idToken) => {
          backendAuth(idToken)
        }).catch((err) => {
          dispatch(ErrorUi(err))
          console.error(err)
        })
      } else {
        setIsLoaded(true)
        console.log("No user")
      }
    });
  }, [dispatch])

  return (
    <Box className={classes.root}>
      {isLoaded ? (
        children
      ) : <Loading />}
    </Box>
  )
}

export default Initial

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'relative',
      backgroundColor: theme.palette.background.default,
      minHeight: '100vh',
      maxWidth: '100vw',
      // padding: `${theme.spacing(2)}px 0`,
    },
  })
)
