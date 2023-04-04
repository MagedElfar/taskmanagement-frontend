import React, { useState } from 'react'
import { useForm, Controller } from "react-hook-form";
import { Link, useSearchParams } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import CircularProgress from '@mui/material/CircularProgress';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAppSelector, useAppDispatch } from '../../hooks/store.hook';
import * as yup from "yup";
import { signup } from '../../store/thunk-actions/auth-actions';
import Errors from '../common/Errors';
import { Typography } from '@mui/material';

const schema = yup.object({
    username: yup.string().required("username is required"),
    password: yup.string().required('password is required')
        .matches(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/, 'Invalid Password Format Provided ( Must be at 8 characters, 1 uppercase, 1 lowercase, 1 number, and 1 special character )')
}).required();

const InviteSignup = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    const token = searchParams.get("token")


    const authState = useAppSelector((state) => state.auth)
    const dispatch = useAppDispatch()

    const [showPassword, setShowPassword] = useState(false)

    const { control, handleSubmit, formState: { errors, isDirty, isValid } } = useForm({
        mode: "onChange",
        resolver: yupResolver(schema),
        defaultValues: {
            username: '',
            password: '',

        }
    });

    const onSubmit = (data: any) => {
        dispatch(signup({ credentials: data, query: `?token=${token}` }))
    }
    return (

        <>
            {authState.errors.length > 0 && <Errors errors={authState.errors} />}

            <Box
                component="form"
                onSubmit={handleSubmit(onSubmit)}
            >

                <Controller
                    name="username"
                    control={control}
                    render={({ formState, field }) => <TextField
                        error={!!formState.errors?.username}
                        helperText={errors.username?.message}
                        sx={{ display: "block", width: 350, mb: 3 }}
                        label="Username"
                        variant="outlined"
                        type="text"
                        fullWidth
                        {...field}
                    />
                    }
                />

                <Controller
                    name="password"
                    control={control}
                    render={({ formState, field }) => <TextField
                        sx={{ display: "block", width: 350, mb: 3 }}
                        InputProps={{
                            endAdornment: <InputAdornment
                                sx={{ cursor: "pointer" }}
                                onClick={() => setShowPassword(!showPassword)}
                                position="end"
                            >
                                {!showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                            </InputAdornment>,
                        }}
                        error={!!formState.errors?.password}
                        helperText={errors.password?.message}
                        label="Password"
                        variant="outlined"
                        type={showPassword ? "text" : "password"}
                        fullWidth
                        {...field}
                    />
                    }
                />

                <Button
                    disabled={!isValid}
                    type='submit'
                    fullWidth variant="contained"
                >
                    Continue
                    {authState.loading && <CircularProgress
                        size={22}
                        sx={{
                            color: "#fff",
                            marginLeft: 2
                        }}
                    />}
                </Button>

                <Typography
                    component="p"
                    sx={{
                        textAlign: "center",
                        marginTop: 4,
                        color: "#6d6e6f",
                        fontSize: "14px"
                    }}
                >
                    Do have an account?

                    <Link className={`ml-2 underline text-blue-500`} to="/login">
                        Login
                    </Link>
                </Typography>

            </Box>
        </>
    )
}

export default InviteSignup
