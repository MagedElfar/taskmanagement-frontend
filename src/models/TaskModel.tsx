import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useAppSelector } from '../hooks/store.hook';
import { ITask } from '../interfaces/tasks';
import SnackError from '../components/common/SnackError';
import TopBar from '../components/tasks/task-model/TopBar';
import FullPageLoading from '../components/common/loading/FullPageLoading';
import BottomBar from '../components/tasks/task-model/BottomBar';

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
}

const TaskModel: React.FC<props> = ({ children, task }) => {

    const { task: { errors, loading } } = useAppSelector(s => s);

    return (
        <div>
            <Modal
                open={true}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} >

                    <FullPageLoading loading={loading} />

                    <SnackError errors={errors} />

                    {task && <TopBar task={task} />}

                    <Box sx={{ height: "calc(100% - 100px)" }}>
                        {children}
                    </Box>

                    <BottomBar task={task} />

                </Box>
            </Modal>
        </div>
    );
}

export default TaskModel