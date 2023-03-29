import React from 'react'
import { useForm, Controller } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useAppSelector, useAppDispatch } from '../../../hooks/store.hook';
import Errors from '../../layouts/Errors';
import Typography from '@mui/material/Typography';
import { createSpace } from '../../../store/thunk-actions/space-actions';

const schema = yup.object({
    name: yup.string().required('work space name is required')
}).required();

const CreateSpaceForm = () => {

    const { them, space } = useAppSelector((state) => state)
    const dispatch = useAppDispatch()

    const { control, handleSubmit, formState: { errors, isDirty, isValid } } = useForm({
        mode: "onChange",
        resolver: yupResolver(schema),
        defaultValues: {
            name: '',
        }
    });

    const onSubmit = (data: any) => {
        dispatch(createSpace(data))
    }
    return (
        <>
            {space.errors.length > 0 && <Errors errors={space.errors} />}
            <Typography variant="h1" component="h1" sx={{
                fontSize: them.fonSize.title,
                fontWeight: 500,
                mb: 4,
                textAlign: "center"
            }}>
                Crete Workspace
            </Typography>
            <Box
                component="form"
                onSubmit={handleSubmit(onSubmit)}
            >

                <Controller
                    name="name"
                    control={control}
                    render={({ formState, field }) => <TextField
                        sx={{ display: "block", mb: 3 }}
                        error={!!formState.errors?.name}
                        helperText={errors.name?.message}
                        // autoComplete='off'
                        label="name"
                        variant="standard"
                        type="text"
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
                    Create Workspace
                    {space.loading && <CircularProgress
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

export default CreateSpaceForm

