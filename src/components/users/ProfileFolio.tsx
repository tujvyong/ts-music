import React, { useState, useEffect } from 'react'
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles'
import { Button, Grid, Paper, TextField, Typography, Dialog, DialogContent, DialogActions, useRadioGroup, IconButton } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add';
import { ProfileEdit } from '../../utils/types'
import FolioEdit from './FolioEdit';

interface Props {
  editable: boolean
  setEdit: React.Dispatch<React.SetStateAction<ProfileEdit>>
}

const ProfileFolio: React.FC<Props> = ({ editable, setEdit }) => {
  // Profile Pages から投稿データを受け渡し。各投稿を編集可能に
  const classes = useStyles()
  const [tmpState, setTmpState] = useState({
    youtubeURL: '',
    isChanged: false,
  })

  const handleEdit = () => {
    setEdit(state => { return { ...state, folio: !editable } })
  }

  return (
    <>
      <div className={classes.showBox}>
        <ul className={classes.folioBox}>
          <Button className={classes.folioItem} onClick={handleEdit}>
            <AddIcon style={{ marginRight: '8px' }} />
            <Typography variant="body2">作品を追加</Typography>
          </Button>
        </ul>
      </div>

      {editable ? (
        <FolioEdit
          editable={editable}
          setEdit={setEdit}
        />
      ) : null}
    </>
  )
}

export default ProfileFolio

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    showBox: {
      margin: `${theme.spacing(3)}px 0`,
    },
    folioBox: {
      display: 'flex',
      width: '100%',
      flexWrap: 'nowrap',
      // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
      transform: 'translateZ(0)',
      overflowY: 'auto',
      listStyle: 'none',
      padding: 0,
      margin: 0,
    },
    folioItem: {
      width: 'calc(100% / 1.5)',
      height: 'auto',
      textAlign: 'center',
      flexShrink: 0,
      padding: theme.spacing(1),
      [theme.breakpoints.up('sm')]: {
        width: 'calc(100% / 3.5)',
      },
      [theme.breakpoints.up('md')]: {
        width: 'calc(100% / 4.5)',
      }
    }
  })
)
