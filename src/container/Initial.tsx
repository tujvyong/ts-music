import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles'
import firebase from '../firebase/Firebase'
import { setInitialUser } from '../store/user/actions'
import { RootState } from "../store";
import Loading from '../components/Loading'

interface Props {

}

const Initial: React.FC<Props> = ({ children }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { user } = useSelector((state: RootState) => state)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    firebase.auth().onAuthStateChanged((currentUser) => {
      if (currentUser) {
        dispatch(setInitialUser({
          username: currentUser.displayName,
          email: currentUser.email,
          photoURL: currentUser.photoURL,
          emailVerified: currentUser.emailVerified,
        }))
        setIsLoaded(true)
      } else {
        console.log("No user")
      }
    });
  }, [dispatch])

  return (
    <>
      {isLoaded ? (
        children
      ) : <Loading />}
    </>
  )
}

export default Initial

const useStyles = makeStyles((theme: Theme) =>
  createStyles({

  })
)
