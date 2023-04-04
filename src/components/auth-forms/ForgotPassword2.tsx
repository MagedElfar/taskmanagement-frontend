import React, { useState } from 'react'
import { useForm, Controller } from "react-hook-form";
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import Errors from '../common/Errors';
import Typography from '@mui/material/Typography';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Success from '../common/Success';
import { apiErrorFormat } from '../../utilities/error-format';
import { forgotPasswordRest } from '../../utilities/api';
import { InputAdornment } from '@mui/material';
import { Link, useSearchParams } from 'react-router-dom';

const schema = yup.object({
    password: yup.string().required('password is required')
        .matches(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/, 'Invalid Password Format Provided ( Must be at 8 characters, 1 uppercase, 1 lowercase, 1 number, and 1 special character )'),
    password_confirmation: yup.string()
        .oneOf([yup.ref('password')], 'Passwords must match')

}).required();

const ForgotPassword2 = () => {

    const [searchParams, setSearchParams] = useSearchParams();

    const token = searchParams.get("token")

    const [err, setErrors] = useState([])
    const [success, setSuccess] = useState('')
    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false)



    const { control, handleSubmit, reset, formState: { errors, isDirty, isValid } } = useForm({
        mode: "onChange",
        resolver: yupResolver(schema),
        defaultValues: {
            password: '',
            password_confirmation: ''
        }
    });

    const onSubmit = async (data: any) => {
        try {
            setErrors([])
            setLoading(true)
            setSuccess('')

            await forgotPasswordRest({
                ...data,
                token
            });

            reset()
            setSuccess("Password is rest successfully")

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

                <Controller
                    name="password_confirmation"
                    control={control}
                    render={({ formState, field }) => <TextField
                        sx={{ display: "block", width: 350, mb: 3 }}
                        InputProps={{
                            endAdornment: <InputAdornment
                                sx={{ cursor: "pointer" }}
                                onClick={() => setShowPasswordConfirmation(!showPasswordConfirmation)}
                                position="end"
                            >
                                {!showPasswordConfirmation ? <VisibilityOffIcon /> : <VisibilityIcon />}
                            </InputAdornment>,
                        }}
                        error={!!formState.errors?.password_confirmation}
                        helperText={errors.password_confirmation?.message}
                        label="Password Confirmation"
                        variant="outlined"
                        type={showPasswordConfirmation ? "text" : "password"}
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

                <Typography
                    component="p"
                    sx={{
                        textAlign: "center",
                        marginTop: 4,
                        color: "#6d6e6f",
                        fontSize: "14px"
                    }}
                >
                    Back to

                    <Link className={`ml-2 underline text-blue-500`} to="/login">
                        Login
                    </Link>
                </Typography>

            </Box>
        </>
    )
}

export default ForgotPassword2