import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { useAppSelector, useAppDispatch } from '../../hooks/store.hook';
import Errors from '../common/Errors';
import { Avatar, Badge } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { uploadProfilePicture } from "../../store/thunk-actions/user-action"
const UploadImageForm = () => {

    const userStat = useAppSelector((state) => state.user)
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const [file, setFile] = useState(null)

    const handelFile = (e: any) => {
        if (e.target?.files[0]) {
            setFile(e.target.files[0])
        }
    }

    const onSubmit = (e: any) => {
        e.preventDefault();
        dispatch(uploadProfilePicture(file)).unwrap().then(() => navigate("/", { replace: true }))
    }
    return (

        <>
            {userStat.errors.length > 0 && <Errors errors={userStat.errors} />}

            <Box
                component="form"
                onSubmit={onSubmit}
            >

                {/* <Box
                    component="div"
                    sx={{
                        marginBottom: 5,
                        width: "200px",
                        height: "200px",
                        overflow: "hidden",
                        borderRadius: "50%",
                        border: "1px solid #000",
                        position: "relative",
                        marginX: "auto"
                    }}
                >
                    <Avatar
                        sx={{
                            width: "200px",
                            height: "200px",
                        }}
                        sizes={"100px"}
                        className="avatar mx-auto capitalize z-bg z-text text-32 font-bold w-96 h-96"
                        src={file ? URL.createObjectURL(file) : userStat.user.image.image_url || "/user.svg"}
                        alt=""
                    >
                    </Avatar>

                    <Box
                        component="div"
                        sx={{
                            width: "100%",
                            cursor: "pointer",
                            backgroundColor: "rgba(0, 0, 0 , 0.6)",
                            display: "flex",
                            justifyContent: "center",
                            paddingY: 2,
                            position: "absolute",
                            zIndex: "9999",
                            bottom: "0",
                            right: "0"
                        }}
                    >
                        <AddIcon />
                    </Box>
                </Box> */}

                <label className='justify-center flex'>
                    <input id="file-upload" type="file" hidden onChange={handelFile} />

                    <Badge
                        overlap="circular"
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        sx={{
                            marginBottom: 4,
                            cursor: "pointer",
                        }}
                        badgeContent={

                            <AddCircleIcon
                                sx={{
                                    color: "#1565C0",
                                    width: "30px",
                                    height: "30px"
                                }} />
                        }
                    >
                        <Avatar
                            sx={{
                                backgroundColor: "#ddd",
                                marginX: "auto",
                                width: "200px",
                                height: "200px",
                                objectFit: "cover"
                            }}
                            sizes={"100px"}
                            className="avatar mx-auto capitalize z-bg z-text text-32 font-bold w-96 h-96"
                            src={file ? URL.createObjectURL(file) : userStat.user.image.image_url || "/user.svg"}
                            alt=""
                        >
                        </Avatar>
                    </Badge>
                </label>



                <Button
                    // disabled={!isValid}
                    type='submit'
                    fullWidth variant="contained"
                >
                    Continue
                    {userStat.loading && <CircularProgress
                        size={22}
                        sx={{
                            color: "#fff",
                            marginLeft: 2,
                        }}
                    />}
                </Button>

            </Box>
        </>
    )
}

export default UploadImageForm