import { Box, Typography, AvatarGroup, Avatar, Button, Fab, Tooltip, IconButton } from '@mui/material'
import React from 'react'
import { Member } from '../../../interfaces/space';
import PushPinIcon from '@mui/icons-material/PushPin';
import AddIcon from '@mui/icons-material/Add';
import moment from 'moment';
import { toggleInviteModel } from '../../../store/slices/model.slice';
import { useAppDispatch, useAppSelector } from '../../../hooks/store.hook';
import AddButton from '../../common/AddButton';
import { useLocation } from 'react-router-dom';
import GridViewIcon from '@mui/icons-material/GridView';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import { chooseView } from '../../../store/slices/task.slice';

const BottomNav = () => {
    const { user: userState, them, space, task: { view } } = useAppSelector(s => s)

    const location = useLocation();
    const dispatch = useAppDispatch();

    return (
        <Box
            component="div"
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                py: 1,
                px: 3,
                color: them.colors.fourthColor,
                bgcolor: "#fff",
                height: "64px",
            }}>
            <div className='flex items-center'>
                {
                    location.pathname.includes("my-tasks") ?
                        <>
                            <Tooltip title="List View">
                                <IconButton
                                    onClick={() => dispatch(chooseView("list"))}
                                    disabled={view === "list" || false}
                                >
                                    <FormatListBulletedIcon sx={{
                                        fill: them.colors.secondColor,
                                        width: "20px",
                                        opacity: view === "list" ? 1 : 0.6
                                    }} />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Grid View">
                                <IconButton
                                    onClick={() => dispatch(chooseView("grid"))}
                                    disabled={view === "grid" || false}
                                >
                                    <GridViewIcon sx={{
                                        fill: them.colors.secondColor,
                                        width: "20px",
                                        opacity: view === "grid" ? 0.7 : 0.6
                                    }} />
                                </IconButton>
                            </Tooltip>
                        </>
                        :
                        <>
                            <PushPinIcon sx={{ mr: 2 }} />
                            <Typography sx={{ mr: 2 }} component="span">{moment().format("MMM DD")}</Typography>
                            <AvatarGroup max={3} className="avatar-group">
                                {space.team.map((member: Member) => <Avatar sx={{ width: "30px", height: "30px" }} key={member.id} alt={member.username} src={member.userImage || "/"} />
                                )}
                            </AvatarGroup>

                            {
                                ["owner", "admin"].includes(userState.role) ?
                                    <Button
                                        color="secondary"
                                        sx={{ ml: 4, borderRadius: "20px", fontSize: "12px", px: 2 }}
                                        size="small"
                                        variant="contained"
                                        endIcon={<AddIcon />}
                                        onClick={() => dispatch(toggleInviteModel())}
                                    >
                                        Add member
                                    </Button>
                                    : null
                            }
                        </>
                }
            </div>
            <AddButton />

        </Box>)
}

export default BottomNav