import React from 'react'
import { Avatar, IconButton, Tooltip } from '@mui/material';
import { useAppSelector } from '../../../hooks/store.hook';
import UserMenu from './UserMenu';
import Notification from '../../common/Notification';


const NavTopMenu = () => {
  const { user: userState, them, space } = useAppSelector(s => s);

  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };


  return (
    <>
      <Notification />
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar
            alt={userState.user.username}
            src={userState.user.image.image_url || "/"}
            sx={{
              backgroundColor: "#ddd"
            }}
          />
        </IconButton>
      </Tooltip>

      <UserMenu closeMenu={() => setAnchorElUser(null)} anchorElUser={anchorElUser} />
    </>
  )
}

export default NavTopMenu