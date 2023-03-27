import React, { useState } from 'react'
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAppSelector, useAppDispatch } from '../../hooks/store.hook';
import * as yup from "yup";
import { signup } from '../../store/slices/auth.slice';
import Errors from '../errors/Errors';
import { FormControl, FormControlLabel, FormHelperText, FormLabel, Radio, RadioGroup } from '@mui/material';

const schema = yup.object({
    first_name: yup.string().optional(),
    last_name: yup.string().optional(),
    phone: yup.string().optional(),
    gender: yup.string().oneOf(["male", "female"]).optional()
}).required();

const AccountDetailsForm = () => {

    const authState = useAppSelector((state) => state.auth)
    const dispatch = useAppDispatch()

    const { control, handleSubmit, formState: { errors, isDirty, isValid } } = useForm({
        mode: "onChange",
        resolver: yupResolver(schema),
        defaultValues: {
            first_name: '',
            last_name: '',
            phone: '',
            gender: 'male',

        }
    });

    const onSubmit = (data: any) => {
        console.log("data = ", data)
        // dispatch(signup(data)).unwrap().then(() => navigate("/", { replace: true }))
    }
    return (

        <>
            {authState.errors.length > 0 && <Errors errors={authState.errors} />}

            <Box
                component="form"
                onSubmit={handleSubmit(onSubmit)}
            >

                <Controller
                    name="first_name"
                    control={control}
                    render={({ formState, field }) => <TextField
                        error={!!formState.errors?.first_name}
                        helperText={errors.first_name?.message}
                        sx={{ display: "block", width: 350, mb: 3 }}
                        label="First Name"
                        variant="outlined"
                        type="text"
                        fullWidth
                        {...field}
                    />
                    }
                />


                <Controller
                    name="last_name"
                    control={control}
                    render={({ formState, field }) => <TextField
                        error={!!formState.errors?.last_name}
                        helperText={errors.last_name?.message}
                        sx={{ display: "block", width: 350, mb: 3 }}
                        label="Last Name"
                        variant="outlined"
                        type="text"
                        fullWidth
                        {...field}
                    />
                    }
                />


                <Controller
                    name="phone"
                    control={control}
                    render={({ formState, field }) => <TextField
                        error={!!formState.errors?.phone}
                        helperText={errors.phone?.message}
                        sx={{ display: "block", width: 350, mb: 3 }}
                        label="phone"
                        variant="outlined"
                        type="text"
                        fullWidth
                        {...field}
                    />
                    }
                />


                <Controller
                    name="gender"
                    control={control}
                    render={({ formState, field }) => (
                        <FormControl error={!!formState.errors?.gender}
                        >
                            <FormLabel>Gender</FormLabel>
                            <RadioGroup
                                {...field}
                                value={field.value}
                                sx={{ display: "block" }}

                            >
                                <FormControlLabel value="male" control={<Radio />} label="Male" />
                                <FormControlLabel value="female" control={<Radio />} label="Female" />
                            </RadioGroup>
                            <FormHelperText sx={{ mb: 3 }}>{errors.gender?.message}</FormHelperText>
                        </FormControl>


                    )}
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

export default AccountDetailsForm
