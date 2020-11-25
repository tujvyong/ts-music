import React, { useState, useEffect } from 'react'
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles'
import { Box } from '@material-ui/core'
import Footer from './Footer'

interface Props {

}

const Layout: React.FC<Props> = ({ children }) => {
  const classes = useStyles()

  return (
    <Box>
      {children}
      <Footer />
    </Box>
  )
}

export default Layout

const useStyles = makeStyles((theme: Theme) =>
  createStyles({

  })
)
