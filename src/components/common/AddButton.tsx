import * as React from 'react';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit';
import WorkspacesIcon from '@mui/icons-material/Workspaces';
import { useAppDispatch } from '../../hooks/store.hook';
import { toggleCreateProjectModel, toggleCreateSpaceModel, toggleCreateTaskModel } from '../../store/slices/model.slice';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import TaskIcon from '@mui/icons-material/Task';

const actions = [
    { icon: <WorkspacesIcon />, name: 'Add workspace' },
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