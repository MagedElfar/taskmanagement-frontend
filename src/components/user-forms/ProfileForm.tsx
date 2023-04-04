import { useForm, Controller } from "react-hook-form";
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAppSelector, useAppDispatch } from '../../hooks/store.hook';
import * as yup from "yup";
import { signup } from '../../store/thunk-actions/auth-actions';
import Errors from '../common/Errors';
import { FormControl, FormControlLabel, FormHelperText, FormLabel, Grid, Radio, RadioGroup, Typography } from '@mui/material';
import { useEffect, useState } from "react";
import Success from "../common/Success";
import { updateUser } from "../../store/thunk-actions/user-action";

const schema = yup.object({
    username: yup.string().required("username is required"),
    email: yup.string().required("email is required").email("invalid email format"),
    first_name: yup.string().optional(),
    last_name: yup.string().optional(),
    phone: yup.string().optional(),
    gender: yup.string().oneOf(["male", "female"]).optional()
}).required();

const ProfileForm = () => {



    const userState = useAppSelector((state) => state.user)

    const [success, setSuccess] = useState('')

    useEffect(() => {
        if (success === "") return;

        const successTimeOut = setTimeout(() => setSuccess(""), 10000)

        return () => clearTimeout(successTimeOut)
    }, [success])

    const dispatch = useAppDispatch()

    const { control, handleSubmit, formState: { errors, isDirty, isValid } } = useForm({
        mode: "onChange",
        resolver: yupResolver(schema),
        defaultValues: {
            username: userState.user.username,
            email: userState.user.email,
            first_name: userState.user.profile.first_name,
            last_name: userState.user.profile.last_name,
            phone: userState.user.profile.phone,
            gender: userState.user.profile.gender,

        }
    });

    const onSubmit = (data: any) => {
        setSuccess("");
        dispatch(updateUser(data)).unwrap().then(() => setSuccess("Account Information Updated successfully"))
    }
    return (

        <>
            {userState.errors.length > 0 && <Errors errors={userState.errors} />}
            <Success text={success} />

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
                        sx={{ display: "block", mb: 3 }}
                        label="Username"
                        variant="outlined"
                        type="text"
                        fullWidth
                        {...field}
                    />
                    }
                />


                <Controller
                    name="email"
                    control={control}
                    render={({ formState, field }) => <TextField
                        sx={{ display: "block", mb: 3 }}
                        error={!!formState.errors?.email}
                        helperText={errors.email?.message}
                        label="Email"
                        variant="outlined"
                        type="email"
                        fullWidth
                        {...field}
                    />
                    }
                />

                <Grid container spacing={2} sx={{ mb: 3 }}>
                    <Grid item xs={6}>
                        <Controller
                            name="first_name"
                            control={control}
                            render={({ formState, field }) => <TextField
                                error={!!formState.errors?.first_name}
                                helperText={errors.first_name?.message}
                                sx={{ display: "block" }}
                                label="First Name"
                                variant="outlined"
                                type="text"
                                fullWidth
                                {...field}
                            />
                            }
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Controller
                            name="last_name"
                            control={control}
                            render={({ formState, field }) => <TextField
                                error={!!formState.errors?.last_name}
                                helperText={errors.last_name?.message}
                                sx={{ display: "block" }}
                                label="Last Name"
                                variant="outlined"
                                type="text"
                                fullWidth
                                {...field}
                            />
                            }
                        />
                    </Grid>
                </Grid>

                <Controller
                    name="phone"
                    control={control}
                    render={({ formState, field }) => <TextField
                        error={!!formState.errors?.phone}
                        helperText={errors.phone?.message}
                        sx={{ display: "block", mb: 3 }}
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
                    {userState.loading && <CircularProgress
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

export default ProfileForm
