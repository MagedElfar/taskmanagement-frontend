import React from 'react'
import { useForm, Controller } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useAppSelector, useAppDispatch } from '../../hooks/store.hook';
import { login } from '../../store/thunk-actions/auth-actions';
import Errors from '../layouts/Errors';
import Typography from '@mui/material/Typography';

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

                <Typography
                    component="p"
                    sx={{
                        textAlign: "center",
                        marginTop: 4,
                        color: "#6d6e6f",
                        fontSize: "14px"
                    }}
                >

                    <Link className={`ml-2 underline text-blue-500`} to={"/forgot-password"}>
                        Forgot Password
                    </Link>
                </Typography>

                <Typography
                    component="p"
                    sx={{
                        textAlign: "center",
                        marginTop: 4,
                        color: "#6d6e6f",
                        fontSize: "14px"
                    }}
                >
                    Don't have an account?

                    <Link className={`ml-2 underline text-blue-500`} to="/signup">
                        Sign up
                    </Link>
                </Typography>
            </Box>
        </>
    )
}

export default LoginForm