import { useNavigate, useParams } from 'react-router-dom';
import TasksGrid from '../components/tasks/task-view/TasksGrid';
import { useAppSelector } from '../hooks/store.hook';


const Project = () => {
    const { task: { tasks }, space: { projects } } = useAppSelector(state => state);
    const { id } = useParams()


    const navigate = useNavigate()

    const project = projects.find(project => project.id === +id)

    if (!project) navigate("404", { replace: true })

    return (
        <TasksGrid tasks={tasks.filter(task => task?.projectId === +id)} />
    )
}

export default Project