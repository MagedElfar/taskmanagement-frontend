import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { useAppSelector, useAppDispatch } from '../../hooks/store.hook';
import Errors from '../common/Errors';
import { Avatar, Badge, Grid } from '@mui/material';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import { uploadProfilePicture, deleteProfilePicture } from "../../store/thunk-actions/user-action"
import Success from '../common/Success';
const ProfilePhotoForm = () => {

    const userStat = useAppSelector((state) => state.user)
    const dispatch = useAppDispatch()

    const [file, setFile] = useState(null)

    const [success, setSuccess] = useState('')
    const [update, setUpdate] = useState(false)

    const [del, setDelete] = useState(false)


    useEffect(() => {
        if (success === "") return;

        const successTimeOut = setTimeout(() => setSuccess(""), 10000)

        return () => clearTimeout(successTimeOut)
    }, [success])


    const handelFile = (e: any) => {
        if (e.target?.files[0]) {
            setFile(e.target.files[0])
        }
    }

    const onSubmit = (e: any) => {
        e.preventDefault();
        setUpdate(true)
        setSuccess("");
        dispatch(uploadProfilePicture(file)).unwrap().then(() => setSuccess("Photo is Updated")).finally(() => setUpdate(false))
    }

    const deleteImage = (e: any) => {
        e.preventDefault();
        setSuccess("");
        setDelete(true)
        dispatch(deleteProfilePicture()).unwrap().then(() => setSuccess("Photo is Deleted")).finally(() => setDelete(false))
    }
    return (

        <>
            {userStat.errors.length > 0 && <Errors errors={userStat.errors} />}
            <Success text={success} />

            <Box
                component="form"
                onSubmit={onSubmit}
            >
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <Avatar
                            sx={{
                                backgroundColor: "#ddd",
                                marginX: "0",
                                width: "250px",
                                height: "250px",
                                objectFit: "cover",
                                mb: 3,
                                borderRadius: "12px"
                            }}
                            sizes={"100px"}
                            className="avatar mx-auto capitalize z-bg z-text text-32 font-bold w-96 h-96"
                            src={file ? URL.createObjectURL(file) : userStat.user.image.image_url || "/user.svg"}
                            alt=""
                        >
                        </Avatar>

                    </Grid>
                    <Grid
                        item xs={6}
                        sx={{
                            alignItems: "flex-start",
                            display: "flex",
                            justifyContent: "center",
                            gap: "20px",
                            flexDirection: "column"
                        }}
                    >
                        <Box
                            component="div"
                            sx={{
                                alignItems: "center",
                                display: "flex",
                                justifyContent: "center",
                                gap: "20px"
                            }}>
                            <Button sx={{ mx: "auto" }} variant="contained" color="warning" component="label">
                                <DriveFolderUploadIcon sx={{ mr: 2 }} />
                                Upload
                                <input hidden accept="image/*" onChange={handelFile} type="file" />
                            </Button>
                            <Button
                                type='submit'
                                variant="contained"
                            >
                                <AddToPhotosIcon sx={{ mr: 2 }} />
                                Update
                                {(userStat.loading && update) && <CircularProgress
                                    size={22}
                                    sx={{
                                        color: "#fff",
                                        marginLeft: 2,
                                    }}
                                />}
                            </Button>
                        </Box>

                        <Button
                            type='button'
                            onClick={deleteImage}
                            variant="contained"
                            color='error'
                        >
                            <DeleteIcon sx={{ mr: 2 }} />
                            Remove
                            {(userStat.loading && del) && <CircularProgress
                                size={22}
                                sx={{
                                    color: "#fff",
                                    marginLeft: 2,
                                }}
                            />}
                        </Button>
                    </Grid>
                </Grid>




            </Box>
        </>
    )
}

export default ProfilePhotoForm