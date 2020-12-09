import React, { useState, useEffect } from 'react'
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles'
import { useLocation, useHistory } from 'react-router-dom'
import { Container, Grid, Paper, Typography } from '@material-ui/core'

interface Props {

}

const Post: React.FC<Props> = () => {
  const location = useLocation()
  let history = useHistory()
  const classes = useStyles()

  return (
    <Container>
      <Typography
        component="h1"
        variant="h4"
        align="center"
        paragraph
      >
        Title
      </Typography>
      <Grid container spacing={2}>
        <Grid item md={8}>
          <Paper>
            <Typography component="h2" variant="h6" gutterBottom>
              募集内容
            </Typography>
            <Typography paragraph>
              テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト
            </Typography>
            <Typography component="h2" variant="h6" gutterBottom>
              どんな人がいい？
            </Typography>
            <Typography paragraph>
              テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト
            </Typography>
          </Paper>
        </Grid>
        <Grid item md={4}>
          <Paper>
            <Typography component="h3" variant="h6" gutterBottom>
              ジャンル
            </Typography>
            <Typography paragraph>
              ジャンルだよー
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Post

const useStyles = makeStyles((theme: Theme) =>
  createStyles({

  })
)
