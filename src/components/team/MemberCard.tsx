import React from 'react'
import { Member } from '../../interfaces/space'
import { Avatar, Box, Button, Typography } from '@mui/material'
import { purple } from '@mui/material/colors'
import { useAppSelector } from '../../hooks/store.hook';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import ChatIcon from '@mui/icons-material/Chat';
import WorkIcon from '@mui/icons-material/Work';

type props = {
    member: Member | null
}

const MemberCard: React.FC<props> = ({ member }) => {
    const { them } = useAppSelector(state => state);

    if (!member) return null;

    return (
        <Box component="div">
            <Avatar
                variant="square"
                sx={{
                    width: "300px",
                    height: "200px",
                    bgcolor: purple[500],
                    p: 0,
                    img: {
                        objectFit: "fill"
                    }
                }}
                alt={member.username}
                src={member.userImage || "/"}
            />

            <Box component="div" sx={{ px: 2, py: 3 }}>
                <Typography
                    align='center'
                    variant='h6'
                    sx={{
                        textTransform: "capitalize",
                        fontWeight: 600,
                        mb: 2
                    }} >
                    {member.username}
                </Typography>

                <div className='flex mb-2 items-center'>
                    <WorkIcon sx={{ width: "20px" }} />
                    <Typography
                        align='center'
                        variant='body1'
                        sx={{
                            ml: 1,
                            textTransform: "capitalize",
                            fontSize: "14px",
                            color: them.colors.fourthColor
                        }} >
                        {member.role}
                    </Typography>
                </div>

                {member.firstName &&
                    <div className='flex mb-2 items-center'>
                        <PersonIcon sx={{ width: "20px" }} />
                        <Typography
                            align='center'
                            variant='body1'
                            sx={{
                                ml: 1,
                                textTransform: "capitalize",
                                fontSize: "14px",
                                color: them.colors.fourthColor
                            }} >
                            {`${member.firstName} ${member.lastName ? member.lastName : ""}`}
                        </Typography>
                    </div>
                }

                <div className='flex mb-2 items-center'>
                    <EmailIcon sx={{ width: "20px" }} />
                    <a
                        style={{
                            color: them.colors.fourthColor,
                            fontSize: "14px"
                        }}
                        className='ml-2'
                        href={`mailto:${member.userEmail}`}>{member.userEmail}
                    </a>
                </div>

                {member.phone &&
                    <div className='flex mb-2 items-center'>
                        <LocalPhoneIcon sx={{ width: "20px" }} />
                        <a
                            style={{
                                color: them.colors.fourthColor,
                                fontSize: "14px"
                            }}
                            className='ml-2'
                            href={`tel:${member.phone}`}>{member.phone}
                        </a>
                    </div>
                }

                <Button sx={{ mt: 3 }} fullWidth variant="contained" color="success" startIcon={<ChatIcon />}>
                    Send Massage
                </Button>
            </Box>


        </Box >
    )
}

export default MemberCard