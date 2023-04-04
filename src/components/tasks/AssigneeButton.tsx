import { IconButton, Badge, Avatar, Box, MenuItem } from '@mui/material'
import React, { useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import { useAppSelector } from '../../hooks/store.hook';
import { Member } from '../../interfaces/space';
import MemberItem from '../team/MemberItem';
import ClearIcon from '@mui/icons-material/Clear';

type props = {
    updateAssignee: (member: Member | null) => void,
    member: Member | null
}

const AssigneeButton: React.FC<props> = ({ updateAssignee, member }) => {

    const [isOpen, setOpen] = useState<boolean>(false);

    const onClick = (member: Member) => {
        setOpen(!isOpen)
        updateAssignee(member);
    }

    const { them, space: { team } } = useAppSelector(state => state)
    return (
        <Box component="div" sx={{ position: "relative" }}>
            <IconButton
                aria-label="delete"
                sx={{ p: 0, fontSize: "16px", bgcolor: "transparent !important" }}
                onClick={() => setOpen(!isOpen)}
            >
                For
                <Badge
                    sx={{
                        border: `1px solid ${them.colors.secondColor}`,
                        borderRadius: "50%",
                        p: 1,
                        width: "35px",
                        height: "35px",
                        alignItems: "center",
                        justifyContent: "center",
                        ml: 2
                    }}
                    overlap="circular"
                    anchorOrigin={{
                        vertical: member ? "top" : "bottom",
                        horizontal: 'right'
                    }}
                    badgeContent={
                        !member ? <AddIcon
                            sx={{
                                bgcolor: them.colors.secondColor,
                                width: "10px",
                                height: "10px",
                                borderRadius: "50%",
                                fill: "#fff",
                                fontSize: "12px"
                            }}
                        /> : <ClearIcon
                            onClick={() => {
                                updateAssignee(null)
                            }}
                            sx={{
                                bgcolor: them.colors.secondColor,
                                width: "12px",
                                height: "12px",
                                borderRadius: "50%",
                                fill: "#fff",
                                fontSize: "12px",
                                p: "2px"
                            }}
                        />
                    }
                >
                    <Avatar
                        alt={member ? member.username : null}
                        src={member ? member.userImage ? member.userImage : "/" : null}
                        sx={{
                            width: "25px",
                            height: "25px",
                            fontSize: "12px"
                        }} />
                </Badge>
            </IconButton>

            {isOpen && <Box
                component="div"
                sx={{
                    boxShadow: "0 1px 10px #00000040;",
                    position: "absolute",
                    top: "40px",
                    left: "0",
                    zIndex: "9999",
                    bgcolor: "#fff",
                    width: "300px",
                    pb: 2,
                    maxHeight: "200px",
                    overflow: "auto"
                }}
            >

                {team.map((member: Member) => (
                    <MenuItem
                        key={member.id}
                        onClick={() => onClick(member)}
                    >
                        <MemberItem member={member} color={them.colors.secondColor} />
                    </MenuItem>
                ))}
            </Box>}
        </Box >

    )
}

export default AssigneeButton