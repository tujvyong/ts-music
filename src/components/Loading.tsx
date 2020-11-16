import React, { useState, useEffect } from 'react'
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles'

interface Props {

}

const Loading: React.FC<Props> = () => {
  const classes = useStyles()

  return (
    <div className={classes.loading}>
      <div></div>
      <div className={classes.rect2}></div>
      <div className={classes.rect3}></div>
      <div className={classes.rect4}></div>
      <div className={classes.rect5}></div>
    </div>
  )
}

export default Loading

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    loading: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '50px',
      height: '20px',
      margin: '0 auto',
      fontSize: 0,
      textAlign: 'center',
      '& div': {
        display: 'inline-block',
        width: '6px',
        height: '100%',
        margin: '0 2px',
        backgroundColor: '#fff',
        transformOrigin: 'center bottom',
        animation: '$rectY 1.2s infinite linear',
      }
    },
    rect2: {
      animationDelay: '-1s',
    },
    rect3: {
      animationDelay: '-2s',
    },
    rect4: {
      animationDelay: '-3s',
    },
    rect5: {
      animationDelay: '-4s',
    },

    '@keyframes rectY': {
      '0%, 50%, 100%': {
        transform: 'scaleY(0.5)',
      },
      '30%': {
        transform: 'scaleY(2)',
      }
    }
  })
)
