import React from 'react'
import { Avatar, Box, FormControl, Grid, IconButton, InputLabel, MenuItem, Select, SelectChangeEvent, Tooltip, Typography } from '@mui/material'
import { Member } from '../../interfaces/space'
import { purple } from '@mui/material/colors';
import { useAppDispatch } from '../../hooks/store.hook';
import { updateMember } from '../../store/thunk-actions/team-action';
import DeleteIcon from '@mui/icons-material/Delete';
import { toggleDeleteMemberModel } from '../../store/slices/model.slice';

type props = {
    member: Member
}

const SpaceMember: React.FC<props> = ({ member }) => {


    const [role, setRole] = React.useState(member.role);

    const dispatch = useAppDispatch()

    const fullName = member.firstName ? `${member.firstName} ${member.lastName || ''}` : member.username;

    const handleChange = (event: SelectChangeEvent) => {
        dispatch(updateMember({ memberId: +member.id, role: event.target.value }))
            .unwrap().then(() => setRole(event.target.value))
    };

    return (
        <Grid container spacing={2} sx={{ ml: 0, alignItems: 0 }}>
            <Grid item  >
                <Avatar
                    sx={{ width: "50px", height: "50px", bgcolor: purple[500], }}
                    alt={member.username}
                    src={member.userImage || "/"}
                />
            </Grid>

            <Grid xs={4} item sx={{ display: "flex", alignItems: "center" }} >
                <Typography
                    align="center"
                    variant='body1'
                    sx={{
                        textTransform: "capitalize",
                        ml: 2
                    }}
                >
                    {fullName}
                </Typography>
            </Grid>

            <Grid item sx={{ display: "flex", alignItems: "center" }}>
                {
                    member.role === "owner" ?
                        "Owner" :
                        <FormControl variant='standard' sx={{ m: 1, minWidth: 120 }} size="small">
                            <Select
                                labelId="demo-select-small"
                                id="demo-select-small"
                                value={role}
                                label="Age"
                                onChange={handleChange}
                            >
                                <MenuItem value="admin">Admin</MenuItem>
                                <MenuItem value="member">Member</MenuItem>
                            </Select>
                        </FormControl>
                }
            </Grid>

            <Grid item sx={{ display: "flex", alignItems: "center" }}>
                {member.role !== "owner" ?
                    <Tooltip title="Delete">
                        <IconButton
                            onClick={() => dispatch(toggleDeleteMemberModel(member.id))}
                            sx={{ ml: 2 }}
                            color="error"
                            aria-label="upload picture"
                            component="label">
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                    :
                    null
                }


            </Grid>
        </Grid>
    )
}

export default SpaceMember