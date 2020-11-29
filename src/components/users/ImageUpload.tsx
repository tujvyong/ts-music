import React, { useState, useCallback } from 'react'
import { useTheme } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles'
import { Avatar, Button, FormControlLabel, Checkbox, Dialog, DialogContent, DialogActions, LinearProgress } from '@material-ui/core'
import PersonIcon from '@material-ui/icons/Person';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { ErrorUi } from '../../store/ui/actions';
import { RootStore } from '../../store'
import firebase, { storage } from "../../firebase/Firebase";
import { updateState } from '../../store/user/actions';
import { userUpdate, APIresponce } from '../../utils/axios'
import { ProfileEdit } from '../../utils/types';


interface Image {
  imgRef: HTMLImageElement | null
  crop: ReactCrop.Crop
  croppedImageUrl: string | null
  croppedImage: File | null
}

interface State {
  file: File | null
  imagePreviewUrl: string | null
}

interface Props {
  editable: boolean
  setEdit: React.Dispatch<React.SetStateAction<ProfileEdit>>
}

export const ImageUpload: React.FC<Props> = ({ editable, setEdit }) => {
  const theme = useTheme();
  const classes = useStyles()
  const dispatch = useDispatch()
  const { photoURL, uid, token } = useSelector((state: RootStore) => state.user)
  // image status
  const [state, setState] = useState<State>({
    file: null,
    imagePreviewUrl: photoURL
  })
  const [image, setImage] = useState<Image>({
    imgRef: null,
    crop: {
      unit: '%',
      width: 40,
      height: 40,
      aspect: 1 / 1,
    },
    croppedImageUrl: null,
    croppedImage: null
  })
  // component status
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [isCroping, setIsCroping] = useState(false)
  const [isDelete, setIsDelete] = useState(false)
  const [progress, setProgress] = useState({
    isUploading: false,
    result: 0,
  })

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files === null) { return }

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      setState({
        file: file,
        imagePreviewUrl: reader.result as string
      });
      setIsCroping(true)
    }
    if (file) {
      reader.readAsDataURL(file)
    }
  }

  const onLoad = useCallback(img => {
    const aspect = 1 / 1;
    const width = img.width / aspect < img.height * aspect ? 100 : ((img.height * aspect) / img.width) * 100;
    const height = img.width / aspect > img.height * aspect ? 100 : (img.width / aspect / img.height) * 100;
    const y = (100 - height) / 2;
    const x = (100 - width) / 2;

    setImage({
      imgRef: img,
      crop: {
        unit: '%',
        width,
        height,
        x,
        y,
        aspect,
      },
      croppedImageUrl: state.imagePreviewUrl,
      croppedImage: state.file
    });

    return false; // Return false if you set crop state in here.
  }, [state.file, state.imagePreviewUrl]);

  const onCropComplete = (crop: ReactCrop.Crop) => {
    if (image.imgRef && image.crop.width && image.crop.height) {
      getCroppedImg(image.imgRef, crop)
    }
  }

  const getCroppedImg = (img: HTMLImageElement, crop: ReactCrop.Crop) => {
    if (crop.x === undefined || crop.y === undefined || crop.width === undefined || crop.height === undefined) { return }
    const canvas = document.createElement("canvas");
    const scaleX = img.naturalWidth / img.width;
    const scaleY = img.naturalHeight / img.height;
    canvas.width = crop.width ?? 40;
    canvas.height = crop.height ?? 40;
    const ctx = canvas.getContext("2d");
    if (ctx === null) { return }

    ctx.drawImage(
      img,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    )

    const reader = new FileReader()
    canvas.toBlob(blob => {
      if (blob === null) { return }
      reader.readAsDataURL(blob)
      reader.onloadend = () => {
        dataURLtoFile(reader.result, 'cropped.jpeg')
      }
    })
  }

  // https://levelup.gitconnected.com/crop-images-on-upload-in-your-react-app-with-react-image-crop-5f3cd0ad2b35
  const dataURLtoFile = (dataurl: string | ArrayBuffer | null, filename: string) => {
    if (dataurl === null) { return }
    dataurl = dataurl as string
    let arr = dataurl.split(','),
      matched = arr[0].match(/:(.*?);/)
    if (matched === null) { return }
    let mime = matched[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    let croppedImage = new File([u8arr], filename, { type: mime });
    setImage({ ...image, croppedImage: croppedImage, croppedImageUrl: dataurl })
  }

  const handleSetImage = () => {
    setState({ file: image.croppedImage, imagePreviewUrl: image.croppedImageUrl })
    setIsCroping(false)
  }

  const handleUpload = () => {
    if (token === null || uid === null) { return }
    if (isDelete) {
      storage.child(`images/users/${uid}.jpg`).delete().then(async () => {
        console.log("success delete image")
        const res: APIresponce = await userUpdate(token, uid, 'photo_url', null)
        if (res.status !== 204) {
          dispatch(ErrorUi(res.error as string))
          return
        }
        dispatch(updateState('photoURL', ''))
        setEdit(state => { return { ...state, photo: false } })
      }).catch((err) => {
        console.error(err)
      })
      return
    }

    if (state.file === null) { return }

    let metadata = { contentType: 'image/jpeg' }
    const uploadTask = storage.child(`images/users/${uid}.jpg`).put(state.file, metadata)
    uploadTask.on('state_changed',
      (snapshot) => {
        let prog = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        setProgress({ isUploading: true, result: prog })
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED: // or 'paused'
            console.log('Upload is paused');
            break;
          case firebase.storage.TaskState.RUNNING: // or 'running'
            console.log('Upload is running');
            break;
        }
      },
      (err) => {
        switch (err.code) {
          case 'storage/unauthorized':
            // User doesn't have permission to access the object
            console.error(err.message)
            break;
          case 'storage/canceled':
            // User canceled the upload
            console.error(err.message)
            break;
          case 'storage/unknown':
            // Unknown error occurred, inspect error.serverResponse
            console.error(err.message)
            break;
        }
      },
      async () => {
        const filePath = uploadTask.snapshot.ref.fullPath
        const res: APIresponce = await userUpdate(token, uid, 'photo_url', filePath)
        if (res.status !== 204) {
          dispatch(ErrorUi(res.error as string))
          return
        }
        dispatch(updateState('photoURL', process.env.REACT_APP_STORAGE_PATH as string + filePath))
        setEdit(state => { return { ...state, photo: false } })
      }
    )
  }

  let { imagePreviewUrl } = state;
  let $imagePreview = null;
  if (progress.isUploading) {
    $imagePreview = (
      <LinearProgress variant="determinate" value={Math.round(progress.result)} />
    )
  } else if (isCroping && imagePreviewUrl) {
    $imagePreview = (
      <ReactCrop
        src={imagePreviewUrl}
        crop={image.crop}
        onChange={newCrop => setImage({ ...image, crop: newCrop })}
        onImageLoaded={onLoad}
        onComplete={onCropComplete}
        circularCrop
      />
    )
  } else if (imagePreviewUrl) {
    $imagePreview = (
      <div style={{ textAlign: 'center' }}>
        <Avatar
          alt="User Avatar"
          src={image.croppedImageUrl || state.imagePreviewUrl as string}
          classes={{ root: classes.avatarRoot }}
        />
        <FormControlLabel
          control={<Checkbox checked={isDelete} onChange={() => setIsDelete(!isDelete)} color="primary" />}
          label="画像を削除する"
        />
      </div>
    )
  } else {
    $imagePreview = (
      <div style={{ textAlign: 'center' }}>
        <Avatar alt="User image is none" classes={{ root: classes.avatarRoot }} >
          <PersonIcon classes={{ root: classes.avatarIcon }} />
        </Avatar>
      </div>
    )
  }

  return (
    <Dialog open={editable} fullWidth maxWidth={isMobile ? "xl" : "md"} >
      <DialogContent>
        {$imagePreview}
      </DialogContent>
      <DialogActions>
        <input id="image-upload" type="file" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} />
        <label htmlFor="image-upload" >
          <Button variant="contained" color="secondary" component="span">
            写真を選択
          </Button>
        </label>
        {isCroping ? (
          <Button variant="contained" color="secondary" onClick={handleSetImage}>
            決定
          </Button>
        ) : (
            <Button variant="contained" color="secondary" startIcon={<CloudUploadIcon />} onClick={handleUpload}>
              更新
            </Button>
          )}
      </DialogActions>
    </Dialog>
  )
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    avatarRoot: {
      display: 'inline-block',
      width: '160px',
      height: '160px',
    },
    avatarIcon: {
      width: '100%',
      height: '100%',
    },
  })
)
