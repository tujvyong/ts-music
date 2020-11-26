import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles'
import { Backdrop, CircularProgress } from '@material-ui/core'
import { RootStore } from '../store'

interface Props {

}

const BackDrop: React.FC<Props> = () => {
  const classes = useStyles()
  const isShow = useSelector((state: RootStore) => state.ui.backdrop)

  return (
    <Backdrop className={classes.backdrop} open={isShow} >
      <CircularProgress color="inherit" />
    </Backdrop>
  )
}

export default BackDrop

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
  })
)
