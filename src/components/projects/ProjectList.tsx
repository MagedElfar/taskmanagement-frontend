import { Box, Button, IconButton, Menu, MenuItem, Tooltip } from '@mui/material'
import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/store.hook'
import { Project } from '../../interfaces/space'
import { updateTask } from '../../store/thunk-actions/task-actions'
import ClearIcon from '@mui/icons-material/Clear';

type props = {
  initProject: Project,
  taskId: number
}

const ProjectList: React.FC<props> = ({ initProject, taskId }) => {

  const { space: { projects }, them } = useAppSelector(state => state)

  const dispatch = useAppDispatch()

  const [project, setProject] = useState(initProject);



  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (project: Project) => {
    dispatch(updateTask({
      id: taskId,
      data: {
        projectId: project.id
      }
    })).unwrap()
      .then(() => {
        setProject(project)
        setAnchorEl(null);
      })
  };

  const clearProject = () => {
    dispatch(updateTask({
      id: taskId,
      data: {
        projectId: null
      }
    })).unwrap()
      .then(() => {
        setProject({
          id: null,
          name: null
        })
        setAnchorEl(null);
      })
  }

  return (
    <Box sx={{ px: 2 }} >
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        variant='text'
        sx={{
          textTransform: "capitalize",
          color: them.colors.fourthColor,
          fontSize: "14px",
          fontWeight: 400
        }}
      >
        {
          project.id ? project.name : "Add to Project"
        }
      </Button>

      {
        project.id && <Tooltip title="remove project">
          <IconButton aria-label="delete" onClick={clearProject}>
            <ClearIcon sx={{ width: "20px", fill: them.colors.fourthColor }} />
          </IconButton>
        </Tooltip>
      }

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {projects.map((project: Project) => <MenuItem key={project.id} onClick={() => handleClose(project)}>
          {project.name}
        </MenuItem>)}

      </Menu>
    </Box>
  );

}

export default ProjectList