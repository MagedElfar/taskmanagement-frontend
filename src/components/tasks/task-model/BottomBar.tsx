import { Box, Chip, Grid, IconButton, Toolbar } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
import { updateTask } from '../../../store/thunk-actions/task-actions';
import { useAppDispatch, useAppSelector } from '../../../hooks/store.hook';
import { ITask } from '../../../interfaces/tasks';
import { useState } from 'react';
import TaskUploadAttach from '../single-task/TaskAttach';
import TaskComment from '../single-task/TaskComment';

type props = {
    task: ITask;
}

const BottomBar: React.FC<props> = ({ task }) => {

    const { them } = useAppSelector(s => s);

    const [is_complete, setIsComplete] = useState(task?.is_complete)

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const onClick = () => {
        dispatch(updateTask({
            id: task.id,
            data: {
                is_complete: !is_complete
            }
        })).unwrap()
            .then(() => setIsComplete(!is_complete))
    }

    return (
        <Box
            component="div"
            sx={{
                zIndex: "999999",
                px: 0,
                height: "56px",
                bgcolor: "#EFF0F3",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                position: "relative",

            }}
        >

            <TaskComment task={task} />

        </Box >)
}

export default BottomBar
