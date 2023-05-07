import React from 'react'
import { Member } from '../../interfaces/space'
import { Avatar, Box, Button, Typography } from '@mui/material'
import { purple } from '@mui/material/colors'
import { useAppDispatch, useAppSelector } from '../../hooks/store.hook';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import ChatIcon from '@mui/icons-material/Chat';
import WorkIcon from '@mui/icons-material/Work';
import { useNavigate } from 'react-router-dom';
import { changeCurrentChat } from '../../store/slices/conversation.slice';
import { addContact } from '../../store/thunk-actions/conversations-actions';

type props = {
    member: Member | null,
    handleClose: () => void
}

const MemberCard: React.FC<props> = ({ member, handleClose }) => {
    const { them, conversation: { connection }, user: { user: { id: userId } } } = useAppSelector(state => state);

    const dispatch = useAppDispatch();

    const navigate = useNavigate()

    const onClick = () => {

        if (userId === member.userId) return


        const contact = connection.find(item => item.user_Id === member.userId);

        if (contact) {
            dispatch(changeCurrentChat(contact))
            navigate("inbox")
            handleClose()
        } else {
            dispatch(addContact({ userId: member.userId })).unwrap().then(
                () => {
                    navigate("inbox")
                    handleClose()
                }
            )
        }
    }

    if (!member) return null;

    return (
        <Box component="div">
            <Avatar
                variant="square"
                sx={{
                    width: "300px",
                    height: "250px",
                    bgcolor: purple[500],
                    p: 0,
                    img: {
                        objectFit: "cover",
                        // objectPosition: "top"
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

                {userId !== member.userId ?
                    <Button
                        sx={{ mt: 3 }}
                        fullWidth variant="contained"
                        color="success"
                        startIcon={<ChatIcon />}
                        onClick={onClick}
                    >
                        Send Massage
                    </Button>
                    : null}

            </Box>


        </Box >
    )
}

export default MemberCard