import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles'
import { Button, Typography } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add';
import PrivateRoute from "../../container/PrivateRoute";
import { ProfileEdit, Portfolio } from '../../utils/types'
import FolioEdit from './portfolios/FolioEdit';
import FolioSingle from './portfolios/FolioSingle';
import { userGetPortfolios } from '../../utils/axios';

interface Props {
  userID: string
  editable: boolean
  setEdit: React.Dispatch<React.SetStateAction<ProfileEdit>>
}


const ProfileFolio: React.FC<Props> = ({ userID, editable, setEdit }) => {
  const classes = useStyles()
  const [portfolios, setPortfolios] = useState<Portfolio[]>([])

  const handleEdit = () => {
    setEdit(state => { return { ...state, folio: !editable } })
  }

  useEffect(() => {
    (async () => {
      const res = await userGetPortfolios(userID)
      if (res.status === 401) {
        console.error(res.message)
        return
      }
      if (res.status !== 200) {
        console.error(res.error)
        return
      }
      setPortfolios(res.data)
    })()
  }, [userID])

  return (
    <>
      <div className={classes.showBox}>
        <ul className={classes.folioBox}>
          {portfolios.map((item, index) => {
            return (
              <Button
                key={item.ID}
                className={classes.folioItem}
                classes={{ label: classes.folioButtonLabel }}
                component={Link}
                to={{ pathname: `/profile/item/${item.ID}`, state: { portfolio: item } }}
              >
                <div
                  className={classes.folioImg}
                  style={{ backgroundImage: `url(${item.imageURL})` }}
                />
                <Typography>{item.title}</Typography>
              </Button>
            )
          })}
          <Button
            component="li"
            className={classes.folioItem}
            classes={{ label: classes.folioButtonLabel }}
            onClick={handleEdit}
          >
            <AddIcon />
            <Typography variant="body2">作品を追加</Typography>
          </Button>
        </ul>
      </div>

      <PrivateRoute
        path="/profile/item/:id"
        render={(e) => (
          <FolioSingle {...e} editable={editable} setEdit={setEdit} />
        )}
      />

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
    },
    folioButtonLabel: {
      display: 'block',
    },
    folioImg: {
      position: 'relative',
      height: 0,
      width: '100%',
      paddingTop: '120px',
      cursor: 'pointer',
      marginBottom: theme.spacing(1),
      borderRadius: theme.shape.borderRadius,
      backgroundColor: theme.palette.grey[500],
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center center',
      backgroundSize: 'cover',
    }
  })
)
