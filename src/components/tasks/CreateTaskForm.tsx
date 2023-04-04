import React, { useState } from 'react'
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useAppSelector, useAppDispatch } from '../../hooks/store.hook';
import Errors from '../common/Errors';
import Typography from '@mui/material/Typography';
import { createProject } from '../../store/thunk-actions//project-actions';
import { Grid, IconButton } from '@mui/material';
import AssigneeButton from './AssigneeButton';

const schema = yup.object({
    title: yup.string().required('task name is required')
}).required();

const CreateTaskForm = () => {


    const { them, space } = useAppSelector((state) => state)

    const [member, setMember] = useState(null)

    console.log(member)

    const dispatch = useAppDispatch()

    const { control, handleSubmit, formState: { errors, isDirty, isValid } } = useForm({
        mode: "onChange",
        resolver: yupResolver(schema),
        defaultValues: {
            title: '',
        }
    });

    const onSubmit = (data: any) => {

    }
    return (
        <>
            {space.errors.length > 0 && <Errors errors={space.errors} />}
            <Typography variant="h1" component="h1" sx={{
                fontSize: "14px",
                mb: 2,
            }}>
                Create task
            </Typography>
            <Box
                component="form"
                onSubmit={handleSubmit(onSubmit)}
            >

                <Controller
                    name="title"
                    control={control}
                    render={({ formState, field }) => <TextField
                        sx={{
                            display: "block",
                            mb: 3,
                            "input": {
                                py: 2,
                                "::placeholder": {
                                    fontSize: "20px",
                                    fontWeight: 500
                                }
                            }
                        }}
                        error={!!formState.errors?.title}
                        helperText={errors.title?.message}
                        // autoComplete='off'
                        variant="standard"
                        type="text"
                        fullWidth
                        {...field}
                        placeholder='Task Name'
                    />
                    }
                />

                <Grid container sx={{ mb: 3 }}>
                    <Grid item >
                        <AssigneeButton updateAssignee={(member) => setMember(member)} member={member} />
                    </Grid>
                </Grid>

                <Button
                    disabled={!isValid}
                    type='submit'
                    fullWidth variant="contained"
                >
                    Create Project
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


export default CreateTaskForm