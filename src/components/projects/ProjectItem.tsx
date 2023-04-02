import { Button, Divider, FormControl, IconButton, Input, InputAdornment, ListItemButton, ListItemText, Menu, MenuItem, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SendIcon from '@mui/icons-material/Send';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import React, { useState } from 'react'
import { Project } from '../../interfaces/space';
import { useAppDispatch, useAppSelector } from '../../hooks/store.hook';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { deleteProject, updateProject } from '../../store/thunk-actions/project-actions';

type props = {
    project: Project
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});



const ProjectItem: React.FC<props> = ({ project }) => {

    const { them, space } = useAppSelector(state => state);
    const dispatch = useAppDispatch()

    //drop down
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    //Snackbar
    const [openBar, setOpen] = useState(false);
    const handleCloseBar = (event?: React.SyntheticEvent | Event, reason?: string) => {
        setOpen(false);
        setSuccess("")
    };
    const [success, setSuccess] = useState("");

    //input
    const [edit, setEdit] = useState(false);
    const [name, setName] = useState(project.name)

    const onClick = (data: any) => {
        setSuccess("");
        dispatch(updateProject({
            id: project.id,
            data: { name }
        })).unwrap().then(() => {
            setSuccess("Project is updated")
            setEdit(false)
        }).finally(() => {
            setOpen(true)
        })
    }

    const deletePro = (data: any) => {
        dispatch(deleteProject({
            id: project.id,
        })).unwrap().catch(() => {
            setOpen(true)
        })
    }




    return (
        <ListItemButton sx={{ pl: 2, py: 1 }}>

            {space.errors.length > 0 &&
                space.errors.map((error: string, index: number) => <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    key={index}
                    open={openBar}
                    autoHideDuration={6000}
                    onClose={handleCloseBar}
                >
                    <Alert onClose={handleCloseBar} severity="error" sx={{ width: '100%' }}>
                        {error}
                    </Alert>
                </Snackbar>)
            }


            {success && <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                open={openBar}
                autoHideDuration={6000}
                onClose={handleCloseBar}
            >
                <Alert onClose={handleCloseBar} severity="success" sx={{ width: '100%' }}>
                    {success}
                </Alert>
            </Snackbar>}


            {
                edit ?
                    <FormControl className='project-form' variant="standard" >

                        <Input
                            onChange={(e) => setName(e.target.value)}
                            sx={{

                                color: "#fff", borderColor: "#fff", input: { borderColor: "#fff" }
                            }}
                            id="standard-adornment-password"
                            type='text'
                            value={name}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={onClick}
                                    >
                                        <SendIcon sx={{ fill: them.colors.firstColor, width: "20px" }} />
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                    :
                    <ListItemText sx={{ color: "#FFF", textTransform: "capitalize" }} primary={project.name} />

            }



            <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={open ? 'long-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleClick}
            >
                <MoreVertIcon sx={{ fill: them.colors.firstColor, transform: "rotate(90deg)" }} />
            </IconButton>
            <Menu
                id="long-menu"
                MenuListProps={{
                    'aria-labelledby': 'long-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                sx={{ py: 0 }}
                PaperProps={{
                    sx: {
                        '& > .MuiList-root': {
                            py: 0
                        }
                    }
                }}
            >
                <MenuItem sx={{ p: 0 }}>
                    <Tooltip title="Delete">
                        <IconButton
                            onClick={deletePro}
                            color='error'
                            sx={{
                                fontSize: "16px",
                                p: 2,
                                width: "100%",
                                justifyContent: "flex-start"
                            }}
                        >
                            <DeleteIcon sx={{ width: "20px", mr: 1 }} />
                            Delete
                        </IconButton>
                    </Tooltip>
                </MenuItem>

                <Divider sx={{ my: "0px !important" }} />
                <MenuItem sx={{ p: 0 }}>
                    <Tooltip title="Edit">
                        <IconButton

                            color='info'
                            sx={{
                                fontSize: "16px",
                                p: 2,
                                width: "100%",
                                justifyContent: "flex-start"
                            }}
                            onClick={() => {
                                setEdit(!edit);
                                setAnchorEl(null);
                            }}
                        >
                            <EditIcon sx={{ width: "20px", mr: 1 }} />
                            Edit
                        </IconButton>
                    </Tooltip>
                </MenuItem>

            </Menu>

            {/* */}

        </ListItemButton >)
}

export default ProjectItem