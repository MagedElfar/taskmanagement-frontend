import TasksGrid from '../components/tasks/TasksGrid';
import { useAppSelector } from '../hooks/store.hook';


const Home = () => {
    const { task: { tasks } } = useAppSelector(state => state);

    return (
        <TasksGrid tasks={tasks} />
    )
}

export default Home