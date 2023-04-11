import React, { useState } from 'react';
import Box from '@mui/material/Box';
import CloseIcon from '@mui/icons-material/Close';
import Modal from '@mui/material/Modal';
import { Alert, Chip, CircularProgress, IconButton, Snackbar } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../hooks/store.hook';
import { useNavigate } from 'react-router-dom'
import { ISingleTask, ITask } from '../interfaces/tasks';
import CheckIcon from '@mui/icons-material/Check';
import { updateTask } from '../store/thunk-actions/task-actions';
import SnackError from '../components/common/SnackError';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "90%",
    height: "80vh",
    borderRadius: "12px",
    bgcolor: "#fff",
    border: "none",
    boxShadow: 24,
    overflow: "hidden",
    "&::-webkit-scrollbar": {
        display: "none"

    }
};

type props = {
    children?: React.ReactNode,
    task: ITask | null,
    setTask: (data: Partial<ISingleTask>) => void
}

const TaskModel: React.FC<props> = ({ children, task, setTask }) => {

    const { them, task: { errors, loading } } = useAppSelector(s => s);
    const dispatch = useAppDispatch();

    const navigate = useNavigate();

    //Snackbar
    const [openBar, setOpen] = useState(false);
    const handleCloseBar = (event?: React.SyntheticEvent | Event, reason?: string) => {
        setOpen(false);
    };

    const onClick = () => {
        dispatch(updateTask({
            id: task.id,
            data: {
                is_complete: !task.is_complete
            }
        })).unwrap()
            .then(() => setTask({
                task: {
                    ...task,
                    is_complete: !task.is_complete
                }
            }))
            .catch(() => setOpen(true))
    }

    return (
        <div>
            <Modal
                open={true}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} >
                    <SnackError errors={errors} />
                    {loading && <Box sx={{
                        display: 'flex',
                        justifyContent: "center",
                        alignItems: "center",
                        bgcolor: "rgba(0 , 0 , 0 , 0.4)",
                        width: "100%",
                        height: "100%",
                        position: "absolute",
                        top: "0",
                        left: "0",
                        zIndex: "99999"
                    }}>
                        <CircularProgress />
                    </Box>}
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
                            variant={task?.is_complete ? "filled" : "outlined"}
                            icon={<CheckIcon />}
                            onClick={onClick}
                            label={task?.is_complete ? "Completed" : "Mark Complete"}

                        />
                        <IconButton
                            onClick={() => navigate("/")
                            }
                        >
                            <CloseIcon sx={{
                                fill: them.colors.fourthColor,
                            }} />
                        </IconButton>
                    </Box>
                    {errors.length > 0 &&
                        errors.map((error: string, index: number) => <Snackbar
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                            }}
                            key={index}
                            open={openBar}
                            autoHideDuration={6000}
                            onClose={handleCloseBar}
                        >
                            <Alert onClose={handleCloseBar} severity="error" sx={{ width: '100%' }}>
                                {error}
                            </Alert>
                        </Snackbar>)
                    }
                    <Box sx={{ height: "calc(100% - 50px)" }}>
                        {children}
                    </Box>
                </Box>
            </Modal>
        </div>
    );
}

export default TaskModel