import React, { useState } from 'react'
import { useForm, Controller } from "react-hook-form";
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

const schema = yup.object({
    username: yup.string().required("username is required"),
    email: yup.string().required("email is required").email("invalid email format"),
    password: yup.string().required('password is required')
        .matches(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/, 'Invalid Password Format Provided ( Must be at 8 characters, 1 uppercase, 1 lowercase, 1 number, and 1 special character )')
}).required();

const SingupForm = () => {

    const [showPassword, setShowPassword] = useState(false)

    const { control, handleSubmit, formState: { errors, isDirty, isValid } } = useForm({
        mode: "onChange",
        resolver: yupResolver(schema),
        defaultValues: {
            username: '',
            email: '',
            password: '',

        }
    });

    const onSubmit = data => {

        console.log(data)
    }
    return (
        <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
        >

            <Controller
                name="username"
                control={control}
                classNamee
                render={({ formState, field }) => <TextField
                    error={!!formState.errors?.username}
                    helperText={errors.username?.message}
                    sx={{ display: "block", width: 350, mb: 3 }}
                    autoComplete='off'
                    label="Username"
                    variant="outlined"
                    type="text"
                    fullWidth
                    control={control}

                    {...field}
                />
                }
            />


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
                    autoComplete='off'
                    label="Password"
                    variant="outlined"
                    type={showPassword ? "text" : "password"}
                    fullWidth
                    {...field}
                />
                }
            />

            <Button disabled={!isValid} type='submit' fullWidth variant="contained">Continue</Button>


        </Box>
    )
}

export default SingupForm