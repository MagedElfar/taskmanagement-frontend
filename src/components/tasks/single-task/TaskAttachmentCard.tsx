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
        <Box
            sx={{
                boxShadow: "rgba(17, 17, 26, 0.05) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 0px 8px;"
            }}
        >
            <div  >
                <img alt="" src={file.url} style={{ height: "85px", width: "100%", objectFit: "cover" }} />
            </div>
            <Box
                sx={{
                    bgcolor: "#fff",
                    p: 2
                }}
            >
                <Grid container justifyContent="space-between" alignItems="center">
                    <Grid item>
                        <Tooltip title="View">
                            <a href={file.url} target='_blank' rel="noreferrer">
                                <LaunchIcon sx={{ width: "20px" }} color='info' />
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
                                <DeleteIcon sx={{ width: "20px" }} />
                            </IconButton>
                        </Tooltip>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}

export default TaskAttachmentCard