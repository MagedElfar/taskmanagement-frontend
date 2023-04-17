import { Box, Chip, IconButton } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
import { updateTask } from '../../../store/thunk-actions/task-actions';
import { useAppDispatch, useAppSelector } from '../../../hooks/store.hook';
import { ITask } from '../../../interfaces/tasks';
import { useState } from 'react';
import { useTaskContext } from '../../../hooks/taskContext';
import { fullName } from '../../../utilities/helper';

type props = {
    task: ITask;
}

const TopBar: React.FC<props> = ({ task }) => {


    const { them, user: { user } } = useAppSelector(s => s);

    const { setActivities } = useTaskContext()


    const [is_complete, setIsComplete] = useState(task.is_complete)

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const onClick = () => {
        dispatch(updateTask({
            id: task.id,
            data: {
                is_complete: !is_complete
            }
        })).unwrap()
            .then(() => {
                setIsComplete(!is_complete)
                setActivities((s: any) => ([
                    {
                        id: 0,
                        user1: fullName({
                            username: user.username,
                            ...user.profile
                        }),
                        activity: `Mark This Task As ${!is_complete ? "Complete" : "Incomplete"}`,

                    }, ...s
                ]))
            })

    }

    return (
        <Box
            component="div"
            sx={{
                px: 2,
                py: "5px",
                bgcolor: "#EFF0F3",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
            }}
        >
            <Chip
                size='small'
                color='success'
                variant={is_complete ? "filled" : "outlined"}
                icon={<CheckIcon />}
                onClick={onClick}
                label={is_complete ? "Completed" : "Mark Complete"}

            />
            <IconButton
                onClick={() => navigate(-1)
                }
            >
                <CloseIcon sx={{
                    fill: them.colors.fourthColor,
                }} />
            </IconButton>
        </Box>)
}

export default TopBar