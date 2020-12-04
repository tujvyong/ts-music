import React, { useState, useEffect } from 'react'
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles'
import { Container, Typography } from '@material-ui/core'

interface Props {

}

const Front: React.FC<Props> = () => {
  const classes = useStyles()

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
