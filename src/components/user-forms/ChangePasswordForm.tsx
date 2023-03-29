import React, { useEffect, useState } from 'react'
import { useForm, Controller } from "react-hook-form";
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import Errors from '../layouts/Errors';
import Typography from '@mui/material/Typography';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Success from '../layouts/Success';
import { apiErrorFormat } from '../../utilities/error-format';
import { changeUserPassword } from '../../utilities/api';
import { InputAdornment } from '@mui/material';
import { useAppSelector } from '../../hooks/store.hook';

const schema = yup.object({
    password: yup.string().required('password is required'),
    new_password: yup.string().required('password is required')
        .matches(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/, 'Invalid Password Format Provided ( Must be at 8 characters, 1 uppercase, 1 lowercase, 1 number, and 1 special character )'),
    new_password_confirmation: yup.string()
        .oneOf([yup.ref('new_password')], 'Passwords must match')

}).required();

const ChangePasswordForm = () => {

    const { them } = useAppSelector(s => s)

    const [err, setErrors] = useState([])
    const [success, setSuccess] = useState('')
    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [showNewPassword, setNewShowPassword] = useState(false)
    const [showNewPasswordConfirmation, setNewShowPasswordConfirmation] = useState(false)

    useEffect(() => {
        if (success === "") return;

        const successTimeOut = setTimeout(() => setSuccess(""), 10000)

        return () => clearTimeout(successTimeOut)
    }, [success])

    const { control, handleSubmit, reset, formState: { errors, isDirty, isValid } } = useForm({
        mode: "onChange",
        resolver: yupResolver(schema),
        defaultValues: {
            password: '',
            new_password: '',
            new_password_confirmation: ''
        }
    });

    const onSubmit = async (data: any) => {
        try {
            setErrors([])
            setLoading(true)
            setSuccess('')

            await changeUserPassword(data);

            reset()
            setSuccess("Password is changed successfully")

        } catch (error) {
            setErrors(apiErrorFormat(error))
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            {err.length > 0 && <Errors errors={err} />}
            <Success text={success} />
            <Box
                component="form"
                onSubmit={handleSubmit(onSubmit)}
            >

                <Typography
                    variant="h6"
                    component="h6"
                    sx={{
                        color: them.colors.fourthColor,
                        backgroundColor: "transparent",
                        fontSize: "18px",
                        mb: 2
                    }}
                >
                    Change Password:
                </Typography>

                <Controller
                    name="password"
                    control={control}
                    render={({ formState, field }) => <TextField
                        sx={{ display: "block", mb: 3 }}
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
                        label="New Password"
                        variant="outlined"
                        type={showPassword ? "text" : "password"}
                        fullWidth
                        {...field}
                    />
                    }
                />

                <Controller
                    name="new_password"
                    control={control}
                    render={({ formState, field }) => <TextField
                        sx={{ display: "block", mb: 3 }}
                        InputProps={{
                            endAdornment: <InputAdornment
                                sx={{ cursor: "pointer" }}
                                onClick={() => setNewShowPassword(!showNewPassword)}
                                position="end"
                            >
                                {!showNewPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                            </InputAdornment>,
                        }}
                        error={!!formState.errors?.new_password}
                        helperText={errors.new_password?.message}
                        label="New Password"
                        variant="outlined"
                        type={showNewPassword ? "text" : "password"}
                        fullWidth
                        {...field}
                    />
                    }
                />

                <Controller
                    name="new_password_confirmation"
                    control={control}
                    render={({ formState, field }) => <TextField
                        sx={{ display: "block", mb: 3 }}
                        InputProps={{
                            endAdornment: <InputAdornment
                                sx={{ cursor: "pointer" }}
                                onClick={() => setNewShowPasswordConfirmation(!showNewPasswordConfirmation)}
                                position="end"
                            >
                                {!showNewPasswordConfirmation ? <VisibilityOffIcon /> : <VisibilityIcon />}
                            </InputAdornment>,
                        }}
                        error={!!formState.errors?.new_password_confirmation}
                        helperText={errors.new_password_confirmation?.message}
                        label="New Password Confirmation"
                        variant="outlined"
                        type={showNewPasswordConfirmation ? "text" : "password"}
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
                    {loading && <CircularProgress
                        size={22}
                        sx={{
                            color: "#fff",
                            marginLeft: 2
                        }}
                    />}
                </Button>
            </Box>
        </>
    )
}

export default ChangePasswordForm