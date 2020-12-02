import React, { useState, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import { RootStore } from '../../store'
import { updateState } from '../../store/user/actions'
import { APIresponce, clientAxios, userUpdateTags } from '../../utils/axios';
import { ProfileEdit, ChipData } from '../../utils/types'
import { ErrorUi, BackdropUi } from '../../store/ui/actions'
import { throttle } from "lodash";

interface Props {
  title: string
  itemName: "genrus" | "instruments"
  editable: boolean
  setEdit: React.Dispatch<React.SetStateAction<ProfileEdit>>
}

interface Newer extends ChipData {
  isTyped: boolean
}

const ProfileTag: React.FC<Props> = ({ title, editable, itemName, setEdit }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const user = useSelector((state: RootStore) => state.user)
  const [newer, setNewer] = useState<Newer>({
    label: '',
    isTyped: false,
  })
  const [isChanged, setIsChanged] = useState(false)
  const [chipData, setChipData] = useState<ChipData[]>([]);
  const [searchData, setSearchData] = useState<ChipData[]>([]);

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
      setNewer({ label: '', isTyped: false })
      setIsChanged(true)
    }
  }

  const handleClickAdd = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setChipData((chips) => {
      chips.push({ label: e.currentTarget.textContent as string })
      return chips
    })
    setNewer({ label: '', isTyped: false })
    setIsChanged(true)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewer({ label: e.target.value, isTyped: true })
    searchTags(e.target.value)
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

  const searchTags = useCallback(throttle(async (keyword) => {
    const { token } = user
    const res = await clientAxios.post(
      `/${itemName}/search`,
      { keyword: keyword },
      { headers: { 'Authorization': 'Bearer ' + token }, withCredentials: true }
    )
    if (res.status !== 200) {
      dispatch(ErrorUi(res.data.error))
      return
    }
    console.log(res.data)
    setSearchData(res.data)
  }, 3000), [user.token])

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
        <div className={classes.searchedBox} style={{ display: newer.isTyped ? 'block' : 'none' }}>
          <Typography component="span" variant="caption">もしかして</Typography>
          <ul className={classes.tagRoot}>
            {searchData.map((data, index) => {
              return (
                <li key={index}>
                  <Chip
                    label={data.label}
                    onClick={handleClickAdd}
                    className={classes.chip}
                    variant="outlined"
                  />
                </li>
              );
            })}
          </ul>
        </div>
        <Button variant="outlined" color="primary" onClick={updateSubmit}>更新する</Button>
        <Button onClick={handleCancel}>キャンセル</Button>
      </Paper>
    )
  } else {
    content = (
      <div className={classes.showBox}>
        <Grid container spacing={2}>
          <Grid item>
            <Typography component="h2" variant="h4">
              {title}
              <IconButton className={classes.editIcon} onClick={handelEdit}>
                <EditIcon />
              </IconButton>
            </Typography>
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
    editIcon: {
      marginLeft: '4px',
    },
    searchedBox: {
      borderRadius: theme.shape.borderRadius,
      backgroundColor: theme.palette.background.default,
    },
    tagRoot: {
      display: 'flex',
      // justifyContent: 'center',
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
