import React from 'react'
import { IAttachment } from '../../../interfaces/tasks'
import { Box, Grid, IconButton, Tooltip } from '@mui/material'
import { useAppSelector } from '../../../hooks/store.hook'
import DeleteIcon from '@mui/icons-material/Delete';
import LaunchIcon from '@mui/icons-material/Launch';

type props = {
    file: IAttachment,
    deleteFile: (id: number) => void
}

const TaskAttachmentCard: React.FC<props> = ({ file, deleteFile }) => {
    const { them } = useAppSelector(state => state)
    return (
        <div>
            <div  >
                <img src={file.url} style={{ height: "85px", width: "100%", objectFit: "cover" }} />
            </div>
            <Box
                sx={{
                    bgcolor: them.colors.firstColor,
                    p: 1
                }}
            >
                <Grid container justifyContent="space-between" alignItems="center">
                    <Grid item>
                        <Tooltip title="View">
                            <a href={file.url} target='_blank'>
                                <LaunchIcon color='info' />
                            </a>
                        </Tooltip>
                    </Grid>
                    <Grid item>
                        <Tooltip title="Delete">
                            <IconButton
                                aria-label="delete"
                                color="error"
                                onClick={() => deleteFile(file.id)}
                            >
                                <DeleteIcon />
                            </IconButton>
                        </Tooltip>
                    </Grid>
                </Grid>
            </Box>
        </div>
    )
}

export default TaskAttachmentCard