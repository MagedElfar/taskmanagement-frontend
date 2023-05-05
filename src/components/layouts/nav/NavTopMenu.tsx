import React, { useEffect } from 'react'
import { Avatar, Badge, IconButton, Tooltip } from '@mui/material';
import { useAppSelector } from '../../../hooks/store.hook';
import UserMenu from './UserMenu';
import Notification from '../../common/Notification';
import socket from '../../../utilities/socket';
import InboxIcon from '@mui/icons-material/Inbox';
import { Link } from 'react-router-dom';

const NavTopMenu = () => {
  const { user: userState, them, conversation } = useAppSelector(s => s);

  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  return (
    <>
      <Link to="inbox">
        <IconButton
          size="large"
          color="inherit"
          sx={{
            color: them.colors.fourthColor
          }}
        >
          <Badge badgeContent={conversation.unRead} color="error">
            <InboxIcon />
          </Badge>
        </IconButton>

      </Link>

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