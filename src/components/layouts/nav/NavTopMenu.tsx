import React from 'react'
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Avatar, IconButton, Tooltip } from '@mui/material';
import { useAppSelector } from '../../../hooks/store.hook';
import UserMenu from './UserMenu';

const NavTopMenu = () => {
  const { user: userState, them, space } = useAppSelector(s => s);

  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };


  return (
    <>
      <IconButton
        size="large"
        aria-label="show 17 new notifications"
        color="inherit"
        sx={{
          marginRight: "12px",
          color: them.colors.fourthColor
        }}
      >
        <Badge badgeContent={0} color="error">
          <NotificationsIcon />
        </Badge>
      </IconButton>
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