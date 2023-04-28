import { io } from 'socket.io-client';
import { localUpdate, syncArchiveTask, syncCreateTask, syncDeleteTask, syncUpdateTask } from '../store/slices/task.slice';
import { AppDispatch } from '../store';

const socket = io('http://localhost:5000/');

function socketListener(dispatch: AppDispatch) {

    //tasks
    socket.on("createTask", (data) => {
        dispatch(syncCreateTask(data))
    })

    socket.on("updateTask", (data) => {
        dispatch(syncUpdateTask(data))
    })

    socket.on("deleteTask", (data) => {
        dispatch(syncDeleteTask(data))
    })

    socket.on("updateAllTasks", (data) => {
        dispatch(localUpdate(data))
    })

    socket.on("archiveTask", (data) => {
        dispatch(syncArchiveTask(data))
    })

}

export { socketListener }

export default socket;