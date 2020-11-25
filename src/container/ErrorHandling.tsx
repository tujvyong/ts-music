import React, { useState, useEffect } from 'react'
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles'
import { Container, Typography } from "@material-ui/core";
import { useSelector } from 'react-redux';
import { RootStore } from '../store';

interface Props {

}

const ErrorHandling: React.FC<Props> = ({ children }) => {
  const classes = useStyles()
  const ui = useSelector((state: RootStore) => state.ui)

  let content
  if (ui.error !== null) {
    content = (
      <Container>
        <Typography paragraph>{ui.error.message || ui.error.name}</Typography>
        <pre className={classes.detailStyle}>
          {ui.error.stack || "Stack trace is not available."}
        </pre>
      </Container>
    )
  } else {
    content = children
  }

  return (
    <>
      {content}
    </>
  )
}

export default ErrorHandling

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    detailStyle: {
      whiteSpace: 'pre-wrap',
      color: theme.palette.grey[500],
      fontSize: '10px',
      textAlign: 'right',
    },
  })
)
