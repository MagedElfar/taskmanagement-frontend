import React, { useEffect, useState } from 'react'
import { useForm, Controller } from "react-hook-form";
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useAppSelector } from '../../../hooks/store.hook';
import Errors from '../../common/Errors';
import { Grid, Typography } from '@mui/material';
import Success from '../../common/Success';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import { apiErrorFormat } from '../../../utilities/error-format';
import { invite } from '../../../utilities/api';

const schema = yup.object({
    email: yup.string().email().required('email is required')
}).required();

const InviteMember = () => {

    const { them, space } = useAppSelector((state) => state)

    const { control, reset, handleSubmit, formState: { errors, isDirty, isValid } } = useForm({
        mode: "onChange",
        resolver: yupResolver(schema),
        defaultValues: {
            email: ""
        }
    });

    const [loading, setLoading] = useState(false)
    const [err, setErrors] = useState([])
    const [success, setSuccess] = useState('')

    useEffect(() => {
        if (success === "") return;

        const successTimeOut = setTimeout(() => setSuccess(""), 10000)

        return () => clearTimeout(successTimeOut)
    }, [success])


    const onSubmit = async (data: any) => {
        try {
            setErrors([])
            setLoading(true)
            setSuccess('')

            await invite({
                space: +space.id,
                email: data.email
            });

            reset()
            setSuccess("Invitation email is sent successfully")

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

            <Typography variant="h1" component="h1" sx={{
                fontSize: them.fonSize.title,
                fontWeight: 500,
                mb: 4,
                textAlign: "left"
            }}>
                Invite new member to {space.name}
            </Typography>

            <Typography variant="body1" component="div" sx={{
                mb: 1,
                textAlign: "left"
            }}>
                <EmailOutlinedIcon sx={{ fontSize: "20px", mr: 1 }} />
                Invite with email
            </Typography>

            <Box
                component="form"

                onSubmit={handleSubmit(onSubmit)}
            >

                <Controller
                    name="email"
                    control={control}
                    render={({ formState, field }) => <TextField
                        sx={{ display: "block", mb: 5 }}
                        error={!!formState.errors?.email}
                        helperText={errors.email?.message}
                        label="email"
                        variant="standard"
                        type="text"
                        placeholder='Enter email address'
                        fullWidth
                        {...field}
                    />
                    }
                />

                <Grid container spacing={1} sx={{ justifyContent: "flex-end" }}>
                    <Grid item>
                        <Button
                            disabled={!isValid}
                            type='submit'
                            variant="contained"
                        >
                            Invite
                            {loading && <CircularProgress
                                size={22}
                                sx={{
                                    color: "#fff",
                                    marginLeft: 2
                                }}
                            />}
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}

export default InviteMember