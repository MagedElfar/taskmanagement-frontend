import { Button, Chip, Typography } from '@mui/material'
import React from 'react'

type props = {
    priority: string,
}

const TaskPriority: React.FC<props> = ({ priority }) => {
    return (
        <div className='w-full'>
            <Typography
                component="span"
                color={
                    priority === "heigh" ? "error"
                        : priority === "medium" ? "warning"
                            : "info"
                }

            >
                {priority}
            </Typography>

        </div>
    )
}

export default TaskPriority