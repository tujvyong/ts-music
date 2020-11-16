import React, { useState, useEffect } from 'react'
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles'
import { Box } from '@material-ui/core'

interface Props {

}

const Layout: React.FC<Props> = ({ children }) => {
  const classes = useStyles()

  return (
    <Box className={classes.root}>
      {children}
    </Box>
  )
}

export default Layout

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
