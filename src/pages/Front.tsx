import React, { useState, useEffect } from 'react'
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles'
import { Container } from '@material-ui/core'
interface Props {

}

const Front: React.FC<Props> = () => {
  const classes = useStyles()

  return (
    <Container>
      <p>Front page</p>
    </Container>
  )
}

export default Front

const useStyles = makeStyles((theme: Theme) =>
  createStyles({

  })
)
