import React from 'react'
import { useForm, Controller } from "react-hook-form";
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

const schema = yup.object({
    email: yup.string().required("email is required").email("invalid email format"),
    password: yup.string().required('password is required')
}).required();

const LoginForm = () => {

    const { control, handleSubmit, formState: { errors, isDirty, isValid } } = useForm({
        mode: "onChange",
        resolver: yupResolver(schema),
        defaultValues: {
            email: '',
            password: '',

        }
    });

    const onSubmit = (data: any) => {

        console.log(data)
    }
    return (
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
                    autoComplete='off'
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
                    autoComplete='off'
                    label="Password"
                    variant="outlined"
                    type="password"
                    fullWidth
                    {...field}
                />
                }
            />

            <Button disabled={!isValid} type='submit' fullWidth variant="contained">Continue</Button>


        </Box>
    )
}

export default LoginForm