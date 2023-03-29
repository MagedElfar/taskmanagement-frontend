import React, { useState } from 'react'
import { useForm, Controller } from "react-hook-form";
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import Errors from '../layouts/Errors';
import Typography from '@mui/material/Typography';
import Success from '../layouts/Success';
import { apiErrorFormat } from '../../utilities/error-format';
import { forgotPasswordSendMail } from '../../utilities/api';

const schema = yup.object({
    email: yup.string().required("email is required").email("invalid email format"),
}).required();

const ForgotPassword1 = () => {

    const [err, setErrors] = useState([])
    const [success, setSuccess] = useState('')
    const [loading, setLoading] = useState(false)


    const { control, handleSubmit, reset, formState: { errors, isDirty, isValid } } = useForm({
        mode: "onChange",
        resolver: yupResolver(schema),
        defaultValues: {
            email: '',
        }
    });

    const onSubmit = async (data: any) => {
        try {
            setErrors([])
            setLoading(true)
            setSuccess('')

            await forgotPasswordSendMail(data);

            reset()
            setSuccess("Rest password email is sent")

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

export default ForgotPassword1