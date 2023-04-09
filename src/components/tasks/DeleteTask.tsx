import { Box, Button, CircularProgress, Grid, Typography } from '@mui/material'
import { useAppDispatch, useAppSelector } from '../../hooks/store.hook'
import { toggleDeleteTaskModel } from '../../store/slices/model.slice';

import Errors from '../common/Errors';
import { deleteTask } from '../../store/thunk-actions/task-actions';

const DeleteTask = () => {


    const { model, task: { loading, errors } } = useAppSelector(s => s);


    const dispatch = useAppDispatch();

    const removeMember = async () => {
        try {

            await dispatch(deleteTask(model.deleteTaskModel.taskId));

            dispatch(toggleDeleteTaskModel(0))

        } finally {
        }
    }

    return (
        <Box component="div">

            {errors.length > 0 && <Errors errors={errors} />}


            <Typography variant='h5' color="darkred">
                Warning!!!
            </Typography>
            <Typography variant='body1' mt={4} >
                You will delete this task
            </Typography>

            <Grid container spacing={1} sx={{ mt: 2, justifyContent: "flex-end" }}>
                <Grid item>
                    <Button onClick={() => dispatch(toggleDeleteTaskModel(model.deleteTaskModel.taskId))} variant="text" color="info">
                        Cancel
                    </Button>
                </Grid>
                <Grid item>
                    <Button onClick={removeMember} variant="text" color="error">
                        Delete
                        {loading && <CircularProgress
                            size={22}
                            sx={{
                                marginLeft: 2
                            }}
                        />}
                    </Button>
                </Grid>
            </Grid>
        </Box>
    )
}


export default DeleteTask