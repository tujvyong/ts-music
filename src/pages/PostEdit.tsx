import React, { useState, useEffect } from 'react'
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles'
import { Container, Grid, Paper, TextField, Typography } from '@material-ui/core'

interface Props {

}

const PostEdit: React.FC<Props> = () => {
  const classes = useStyles()
  const [state, setState] = useState({
    postType: '',
    title: '',
    body: '',
    detail: '',
    place: '',
    url: '',
    genrus: '',
  })

  return (
    <Container>
      <TextField
        fullWidth
        id="title"
        value={state.title}
        name="title"
        placeholder="Title"
      />
      <Grid container spacing={2}>
        <Grid item md={8}>
          <Paper>
            <Typography component="h2" variant="h6" gutterBottom>
              募集内容
            </Typography>
            <TextField
              multiline
              id="body"
              value={state.body}
              name="body"
              placeholder="投稿の内容をここに記入"
            />

            <Typography component="h2" variant="h6" gutterBottom>
              どんな人がいい？
            </Typography>
            <TextField
              multiline
              id="detail"
              value={state.detail}
              name="detail"
              placeholder="どんな人を募集しているか記入"
            />
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

export default PostEdit

const useStyles = makeStyles((theme: Theme) =>
  createStyles({

  })
)
