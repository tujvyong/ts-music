import React, { useState, useEffect } from 'react'
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles'
import { Button, TextField, Typography, Dialog, DialogContent, DialogActions, IconButton, DialogTitle, InputBase } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add';
import { ProfileEdit, PortfolioState, FolioSingleState } from '../../../utils/types'
import { userUpdatePortfolios } from '../../../utils/axios';
import { useDispatch } from 'react-redux';
import { ErrorUi } from '../../../store/ui/actions';
import { useHistory, useLocation } from 'react-router-dom';

interface Props {
  editable: boolean
  setEdit: React.Dispatch<React.SetStateAction<ProfileEdit>>
}

const FolioEdit: React.FC<Props> = ({ editable, setEdit }) => {
  const location = useLocation<FolioSingleState>()
  let history = useHistory()
  const classes = useStyles()
  const dispatch = useDispatch()
  const [tmpState, setTmpState] = useState<PortfolioState>({
    ID: location.state?.portfolio.ID ?? 0,
    title: location.state?.portfolio.title ?? '',
    imageURL: location.state?.portfolio.imageURL ?? '',
    linkURL: location.state?.portfolio.linkURL ?? '',
    description: location.state?.portfolio.description ?? '',
    youtubeID: location.state?.portfolio.youtubeID ?? '',
    // below are statements for react DOM
    youtubeURL: '',
    isChanged: false,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTmpState({ ...tmpState, [e.target.name]: e.target.value })
  }

  const handleRenderThum = () => {
    let valid = tmpState.youtubeURL.includes('https://www.youtube.com/watch?v=')
    if (valid) {
      const youtubeID = tmpState.youtubeURL.replace('https://www.youtube.com/watch?v=', '').replace(/&.*$/g, '')
      setTmpState({
        ...tmpState,
        imageURL: `https://i.ytimg.com/vi/${youtubeID}/maxresdefault.jpg`,
        youtubeID: youtubeID,
      })
    }
  }

  const handleImageChange = () => {

  }

  const handleUpdate = async () => {
    const res = await userUpdatePortfolios(tmpState)
    if (res.status !== 204) {
      dispatch(ErrorUi(res.error))
      return
    }
  }

  const handleCancel = () => {
    let c
    if (tmpState.isChanged) {
      c = window.confirm("変更が破棄されますが、よろしいですか？")
      if (c) {
        // will unmount
      } else {
        return
      }
    }
    setEdit(state => { return { ...state, folio: false } })
    history.push("/profile")
  }

  return (
    <Dialog open={editable} fullWidth maxWidth="sm">
      <DialogTitle>
        <InputBase
          fullWidth
          id="title"
          value={tmpState.title}
          name="title"
          placeholder="作品のタイトル"
          onChange={handleChange}
          className={classes.title}
        />
      </DialogTitle>
      <DialogContent>
        {tmpState.imageURL !== '' ? (
          <img className={classes.thumbnail} src={tmpState.imageURL ?? undefined} alt="" />
        ) : (
            <>
              <input id="image-upload" type="file" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} />
              <label htmlFor="image-upload" >
                <Button
                  className={classes.upload}
                  classes={{ label: classes.uploadLabel }}
                  component="span"
                  disableFocusRipple
                  disableRipple
                >
                  写真を選択<br />もしくは<br />
                  <TextField
                    variant="outlined"
                    margin="normal"
                    // fullWidth
                    id="youtubeURL"
                    value={tmpState.youtubeURL}
                    name="youtubeURL"
                    placeholder="Youtube リンク"
                    onChange={handleChange}
                    InputProps={{
                      endAdornment: (
                        <IconButton onClick={handleRenderThum}>
                          <AddIcon />
                        </IconButton>
                      ),
                    }}
                  />
                </Button>
              </label>
            </>
          )}
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          id="linkURL"
          value={tmpState.linkURL}
          name="linkURL"
          placeholder="URL"
          onChange={handleChange}
        />
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          id="description"
          value={tmpState.description}
          name="description"
          multiline
          rows={8}
          rowsMax={8}
          placeholder="どんな作品ですか？"
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" color="primary" onClick={handleUpdate}>更新する</Button>
        <Button onClick={handleCancel}>キャンセル</Button>
      </DialogActions>
    </Dialog>
  )
}

export default FolioEdit

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      fontSize: theme.typography.h4.fontSize,
    },
    upload: {
      width: '100%',
      height: '200px',
      border: `dashed ${theme.palette.text.hint}`,
    },
    uploadLabel: {
      display: 'flex',
      flexDirection: 'column',
    },
    thumbnail: {
      width: '100%',
    }
  })
)
