import React from 'react'
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useAppSelector, useAppDispatch } from '../../hooks/store.hook';
import { login } from '../../store/slices/auth.slice';
import Errors from '../errors/Errors';

const schema = yup.object({
    email: yup.string().required("email is required").email("invalid email format"),
    password: yup.string().required('password is required')
}).required();

const LoginForm = () => {

    const navigate = useNavigate();

    const authState = useAppSelector((state) => state.auth)
    const dispatch = useAppDispatch()

    const { control, handleSubmit, formState: { errors, isDirty, isValid } } = useForm({
        mode: "onChange",
        resolver: yupResolver(schema),
        defaultValues: {
            email: '',
            password: '',
        }
    });

    const onSubmit = (data: any) => {
        dispatch(login(data)).unwrap().then(() => navigate("/", { replace: true }))
    }
    return (
        <>
            {authState.errors.length > 0 && <Errors errors={authState.errors} />}
            <Box
                component="form"
                onSubmit={handleSubmit(onSubmit)}
            >

                <Controller
                    name="email"
                    control={control}
                    render={({ formState, field }) => <TextField
                        sx={{ display: "block", width: 350, mb: 3 }}
                        error={!!formState.errors?.email}
                        helperText={errors.email?.message}
                        // autoComplete='off'
                        label="Email"
                        variant="outlined"
                        type="email"
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
                        error={!!formState.errors?.password}
                        helperText={errors.password?.message}
                        // autoComplete='off'
                        label="Password"
                        variant="outlined"
                        type="password"
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
            </Box>
        </>
    )
}

export default LoginForm