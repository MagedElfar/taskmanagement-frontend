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
import { FormControl, FormHelperText, Grid, IconButton, InputLabel, MenuItem, Select } from '@mui/material';
import AssigneeButton from './AssigneeButton';
import { Member, Project } from '../../interfaces/space';
import { createTask } from '../../store/thunk-actions/task-actions';
import { toggleCreateTaskModel } from '../../store/slices/model.slice';

const schema = yup.object({
    title: yup.string().required('task name is required'),
    description: yup.string().required('description is required')
    // project: yup.number().optional()

}).required();

const CreateTaskForm = () => {


    const { them, task, space } = useAppSelector((state) => state)

    const [member, setMember] = useState<Member | null>(null)

    const dispatch = useAppDispatch()

    const { control, handleSubmit, formState: { errors, isDirty, isValid } } = useForm({
        mode: "onChange",
        resolver: yupResolver(schema),
        defaultValues: {
            title: '',
            description: '',
            projectId: null,
            spaceId: space.id
        }
    });

    const onSubmit = (data: any) => {
        console.log(data)
        dispatch(createTask({
            ...data,
            memberId: member?.id || null
        })).unwrap().then(() => dispatch(toggleCreateTaskModel()))
    }
    return (
        <>
            {task.errors.length > 0 && <Errors errors={task.errors} />}
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

                <Grid container sx={{ mb: 3, alignItems: "center" }} gap={2}>
                    <Grid item xs="auto">
                        <AssigneeButton updateAssignee={(member) => setMember(member)} member={member} />
                    </Grid>

                    <Grid item sx={{ display: "flex", alignItems: "center" }} xs={5}>
                        <Typography
                            sx={{ p: 0, fontSize: "16px", color: "rgba(0, 0, 0, 0.54);", mr: 2 }}
                        >
                            In
                        </Typography>
                        <Controller
                            name="projectId"
                            control={control}
                            render={({ formState, field }) => (
                                <FormControl fullWidth error={!!formState.errors?.projectId} size='small'>
                                    <InputLabel

                                        htmlFor="trinity-select"
                                        id="demo-simple-select-disabled-label"
                                    >
                                        project
                                    </InputLabel>

                                    <Select

                                        labelId="demo-simple-select-disabled-label"
                                        label="project"
                                        sx={{
                                            borderRadius: "30px"
                                        }}
                                        {...field}
                                        fullWidth
                                        value={field.value}
                                        id="trinity-select"
                                    >
                                        <MenuItem value="null">
                                            <em>None</em>
                                        </MenuItem>
                                        {space.projects.map((project: Project) => (
                                            <MenuItem key={project.id} value={project.id}>
                                                {project.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>


                            )}
                        />

                    </Grid>
                </Grid>

                <Controller

                    name="description"
                    control={control}
                    render={({ formState, field }) => <TextField
                        multiline
                        rows={8}
                        maxRows={12}
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
                        error={!!formState.errors?.description}
                        helperText={errors.description?.message}
                        // autoComplete='off'
                        variant="standard"
                        type="text"
                        fullWidth
                        {...field}
                        placeholder='Description'
                    />
                    }
                />


                <Button
                    disabled={!isValid}
                    type='submit'
                    fullWidth variant="contained"
                >
                    Create Project
                    {task.loading && <CircularProgress
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