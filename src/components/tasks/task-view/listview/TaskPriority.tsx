import { Button, Chip, Typography } from '@mui/material'
import React from 'react'

type props = {
    priority: string,
}

const TaskPriority: React.FC<props> = ({ priority }) => {
    console.log("pt", priority)
    return (
        <div className='w-full'>
            <Typography
                component="span"
                sx={{
                    color: priority === "heigh" ? "#d32f2f"
                        : priority === "medium" ? "#ed6c02"
                            : "#0288d1"


                }}
            >
                {priority}
            </Typography>

        </div>
    )
}

export default TaskPriority