import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { RootStore } from '../../store'
import { updateState } from '../../store/user/actions'
import { APIresponce, clientAxios, userUpdateTags } from '../../utils/axios';
import { ProfileEdit, ChipData } from '../../utils/types'
import { ErrorUi, BackdropUi } from '../../store/ui/actions'

interface Props {
  title: string
  itemName: "genrus" | "instruments"
  editable: boolean
  setEdit: React.Dispatch<React.SetStateAction<ProfileEdit>>
}

const ProfileTag: React.FC<Props> = ({ title, editable, itemName, setEdit }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const user = useSelector((state: RootStore) => state.user)
  const [newer, setNewer] = useState<ChipData>({
    label: '',
  })
  const [isChanged, setIsChanged] = useState(false)
  const [chipData, setChipData] = useState<ChipData[]>([]);

  const handleDelete = (chipToDelete: ChipData) => () => {
    setChipData((chips) => chips.filter((chip) => chip.label !== chipToDelete.label));
    setIsChanged(true)
  };

  const handleAdd = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (newer.label.trim() === '') { return }
    if (e.key === 'Enter') {
      setChipData((chips) => {
        chips.push({ label: newer.label })
        return chips
      })
      setNewer({ label: '' })
      setIsChanged(true)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewer({ ...newer, label: e.target.value })
  }

  const handelEdit = () => {
    setEdit(state => {
      return {
        ...state,
        [itemName]: true
      }
    })
  }

  const handleCancel = () => {
    let c
    if (isChanged) {
      c = window.confirm("変更が破棄されますが、よろしいですか？")
      if (c) {
        setIsChanged(false)
      } else {
        return
      }
    }
    setEdit(state => {
      return {
        ...state,
        [itemName]: false
      }
    })
  }

  const updateSubmit = async () => {
    const { token, uid } = user
    if (token === null || uid === null) { return }

    dispatch(BackdropUi(true))
    const res: APIresponce = await userUpdateTags(token, chipData, itemName)
    if (res.status !== 204) {
      dispatch(ErrorUi(res.error as string))
      return
    }
    dispatch(updateState(itemName, chipData))
    setEdit(state => {
      return {
        ...state,
        [itemName]: false
      }
    })
    dispatch(BackdropUi(false))
  }

  useEffect(() => {
    (async () => {
      const resp = await clientAxios.get(`/${itemName}`, { withCredentials: true })
      if (resp.status !== 200) {
        console.error(resp.data.error)
        return
      }
      setChipData(resp.data)
    })()
  }, [itemName])

  let content
  if (editable) {
    content = (
      <Paper className={classes.editBox}>
        <ul className={classes.tagRoot}>
          {chipData.map((data, index) => {
            let icon;

            return (
              <li key={index}>
                <Chip
                  icon={icon}
                  label={data.label}
                  onDelete={data.label === 'React' ? undefined : handleDelete(data)}
                  className={classes.chip}
                />
              </li>
            );
          })}
          <li className={classes.newTagWrap}>
            <input
              type="text"
              placeholder="タグを追加"
              value={newer.label}
              className={classes.newTag}
              onChange={handleChange}
              onKeyPress={handleAdd}
            />
          </li>
        </ul>
        <Button variant="outlined" color="primary" onClick={updateSubmit}>更新する</Button>
        <Button onClick={handleCancel}>キャンセル</Button>
      </Paper>
    )
  } else {
    content = (
      <div className={classes.showBox}>
        <Grid container spacing={2}>
          <Grid item>
            <Typography component="h2" variant="h6">{title}</Typography>
          </Grid>
          <Grid item>
            <Button name={itemName} color="secondary" onClick={handelEdit}>編集する</Button>
          </Grid>
        </Grid>
        <ul className={classes.tagRoot}>
          {chipData.map((data, index) => {
            let icon;

            return (
              <li key={index}>
                <Chip
                  icon={icon}
                  label={data.label}
                  className={classes.chip}
                  variant="outlined"
                />
              </li>
            );
          })}
        </ul>
      </div>
    )
  }

  return (
    <>
      {content}
    </>
  )
}

export default ProfileTag

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    showBox: {
      marginBottom: theme.spacing(3),
    },
    editBox: {
      marginBottom: theme.spacing(3),
      padding: theme.spacing(2),
    },
    tagRoot: {
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap',
      listStyle: 'none',
      padding: theme.spacing(0.5),
      margin: 0,
    },
    chip: {
      margin: theme.spacing(0.5),
    },
    newTagWrap: {
      margin: '4px',
    },
    newTag: {
      display: 'inline-flex',
      minWidth: '100px',
      height: '100%',
      fontSize: theme.typography.body2.fontSize,
      backgroundColor: 'inherit',
      color: 'inherit',
      border: 'none',
      padding: '0 2px',
      margin: 0,
      '&:focus': {
        outline: 'none',
      },
    },
  })
)
