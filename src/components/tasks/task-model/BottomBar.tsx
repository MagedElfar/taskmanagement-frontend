import { Box } from '@mui/material';
import { ITask } from '../../../interfaces/tasks';
import TaskComment from '../single-task/TaskComment';

type props = {
    task: ITask;
}

const BottomBar: React.FC<props> = ({ task }) => {

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
