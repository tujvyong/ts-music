import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles'
import { Dialog, DialogActions, DialogContent, IconButton } from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'
import { DialogTitle } from '../../../css/custom'
import YouTube, { Options, YouTubeProps } from 'react-youtube'
import { YouTubePlayer } from 'youtube-player/dist/types'
import { FolioSingleState, ProfileEdit } from '../../../utils/types'

interface Props {
  editable: boolean
  setEdit: React.Dispatch<React.SetStateAction<ProfileEdit>>
}

const opts: Options = {
  height: '360',
  width: '640',
  playerVars: {
    // https://developers.google.com/youtube/player_parameters
    autoplay: 1,
  },
};

const FolioSingle: React.FC<Props> = ({ editable, setEdit }) => {
  let history = useHistory()
  const location = useLocation<FolioSingleState>()
  const classes = useStyles()
  const [open, setOpen] = useState(true)
  const { portfolio } = location.state

  const _onReady = (e: { target: YouTubePlayer }) => {
    e.target.pauseVideo()
  }

  const handleClose = () => {
    history.goBack()
  }

  const handleEdit = () => {
    setOpen(false)
    setEdit(state => { return { ...state, folio: !editable } })
  }

  return (
    <Dialog open={open} fullWidth maxWidth="sm" onClose={handleClose}>
      <DialogTitle id="portfolio-single-title" onClose={handleClose}>
        {portfolio.title}
      </DialogTitle>
      <DialogContent>
        <YouTube
          videoId={portfolio.youtubeID}
          containerClassName={classes.youtubeContainer}
          opts={opts}
          onReady={_onReady}
        />
      </DialogContent>
      <DialogActions>
        <IconButton onClick={handleEdit}>
          <EditIcon />
        </IconButton>
      </DialogActions>
    </Dialog>
  )
}

export default FolioSingle

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    youtubeContainer: {
      textAlign: 'center',
    },
  })
)
