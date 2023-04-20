import { EventClickArg } from '@fullcalendar/core'
import { Avatar, Box, Tooltip, Typography } from '@mui/material'
import React from 'react'
import { ITask } from '../../interfaces/tasks'
import { useAppSelector } from '../../hooks/store.hook';
import { Link } from 'react-router-dom';
import { fullName } from '../../utilities/helper';



function toCamelCase(text: string): string {
    const words = text.toLowerCase().split(/[_\s]+/);
    const firstWord = words[0];
    const restWords = words.slice(1).map(word => word.charAt(0).toUpperCase() + word.slice(1));
    return firstWord + restWords.join('');
}

type props = {
    task: ITask
}

type memberProps = {
    id: number
}

const Member: React.FC<memberProps> = ({ id }) => {

    const { space: { team } } = useAppSelector(state => state);


    const member = team.find(member => member.id === +id)


    return (
        <Box
            component="div"
            sx={{
                mt: 2,
                display: "flex",
                justifyContent: "flex-end"
            }}
        >
            <Tooltip title={`assign to ${fullName({
                username: member.username,
                first_name: member.firstName,
                last_name: member.lastName
            })}`}>
                <Avatar
                    alt={member.username}
                    src={member.userImage || "/"}
                    sx={{ width: 20, height: 20, fontSize: "12px" }}
                />
            </Tooltip>
        </Box>
    )

}

const TaskEvent: React.FC<props> = ({ task }) => {

    const { them } = useAppSelector(state => state);

    return (
        <Box
            component="div"
            sx={{
                mt: 1,
                borderRadius: "8px",
                p: "5px 8px",

                color: "#FFF",
                backgroundColor: them.colors[toCamelCase(task.status) as keyof typeof them.colors],
                "&:hover": {
                    opacity: "0.7"
                },
            }}
        >
            <Link to={`/task/${task.id}`}>
                <Typography
                    component="h6"
                    sx={{
                        whiteSpace: "pre-wrap",
                        textTransform: "capitalize",
                        fontSize: "12px"
                    }}
                >
                    {task.title}
                </Typography>

                {/* {task.assignIdMember && <Member id={task.assignIdMember} />} */}
            </Link>
        </Box>
    )
}

export default TaskEvent