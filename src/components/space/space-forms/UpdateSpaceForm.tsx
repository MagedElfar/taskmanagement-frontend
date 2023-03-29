import React from 'react'
import { useForm, Controller } from "react-hook-form";
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useAppSelector, useAppDispatch } from '../../../hooks/store.hook';
import Errors from '../../layouts/Errors';
import { createSpace } from '../../../store/thunk-actions/space-actions';
import { Grid } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const schema = yup.object({
    name: yup.string().required('work space name is required')
}).required();

const UpdateSpaceForm = () => {

    const { them, space } = useAppSelector((state) => state)
    const dispatch = useAppDispatch()

    const { control, handleSubmit, formState: { errors, isDirty, isValid } } = useForm({
        mode: "onChange",
        resolver: yupResolver(schema),
        defaultValues: {
            name: space.name,
        }
    });

    const onSubmit = (data: any) => {
        dispatch(createSpace(data))
    }
    return (
        <>
            {space.errors.length > 0 && <Errors errors={space.errors} />}

            <Box
                component="form"
                onSubmit={handleSubmit(onSubmit)}
            >

                <Controller
                    name="name"
                    control={control}
                    render={({ formState, field }) => <TextField
                        sx={{ display: "block", mb: 5 }}
                        error={!!formState.errors?.name}
                        helperText={errors.name?.message}
                        label="name"
                        variant="standard"
                        type="text"
                        fullWidth
                        {...field}
                    />
                    }
                />

                <Grid container spacing={1} sx={{ justifyContent: "flex-end" }}>
                    <Grid item>
                        <Button variant="contained" color="error" startIcon={<DeleteIcon />}>
                            Delete
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button
                            disabled={!isValid}
                            type='submit'
                            variant="contained"
                        >
                            Update
                            {space.loading && <CircularProgress
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

export default UpdateSpaceForm

