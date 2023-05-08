import * as React from 'react';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import EditIcon from '@mui/icons-material/Edit';
import WorkspacesIcon from '@mui/icons-material/Workspaces';
import { useAppDispatch } from '../../hooks/store.hook';
import { toggleCreateProjectModel, toggleCreateSpaceModel, toggleCreateTaskModel, toggleInviteModel } from '../../store/slices/model.slice';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import TaskIcon from '@mui/icons-material/Task';
import PersonIcon from '@mui/icons-material/Person';

const actions = [
    { icon: <WorkspacesIcon />, name: 'Add workspace' },
    { icon: <PersonIcon />, name: 'Add member' },
    { icon: <FactCheckIcon />, name: 'Add project' },
    { icon: <TaskIcon />, name: 'Add task' },

];

export default function PlaygroundSpeedDial() {

    const dispatch = useAppDispatch()

    const handelClick = (action: any) => {
        if (action.name === "Add workspace") {
            dispatch(toggleCreateSpaceModel())
        } else if (action.name === "Add project") {
            dispatch(toggleCreateProjectModel())
        } else if (action.name === "Add task") {
            dispatch(toggleCreateTaskModel())
        } else if (action.name === "Add member") {
            dispatch(toggleInviteModel())
        }
    }
    return (
        <Box sx={{ position: 'relative' }} className='nav-add-button'
        >
            <SpeedDial
                ariaLabel="SpeedDial playground example"
                icon={<SpeedDialIcon openIcon={<EditIcon />} />}
                direction="down"
            >
                {actions.map((action) => (
                    <SpeedDialAction
                        key={action.name}
                        icon={action.icon}
                        tooltipTitle={action.name}
                        onClick={(e) => handelClick(action)}
                    />
                ))}
            </SpeedDial>
        </Box>
    );
}