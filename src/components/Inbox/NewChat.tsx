import { Avatar, Badge, Box, Button, CircularProgress, Divider, Menu, MenuItem, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import SearchInput from '../common/SearchInput';
import { getUsers } from '../../utilities/api';
import { User } from '../../interfaces/user';
import { apiErrorFormat } from '../../utilities/error-format';
import { green, grey, purple } from '@mui/material/colors';
import { fullName } from '../../utilities/helper';
import SnackError from '../common/SnackError';
import { useAppDispatch, useAppSelector } from '../../hooks/store.hook';
import { IConnection } from '../../interfaces/inbox';
import { addContact } from '../../store/thunk-actions/conversations-actions';

const NewChat = () => {

    const { conversation: { errors: stateErrors } } = useAppSelector(state => state)

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const [term, setTerm] = useState("")
    const [offset, setOffset] = useState(1)
    const [maxOffset, setMaxOffset] = useState(0);
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState<{
        id: number,
        username: string,
        first_name: string,
        last_name: string,
        image: string
    }[]>([])
    const [errors, setErrors] = useState([]);

    const containerRef = useRef(null);


    const dispatch = useAppDispatch()

    const handleTerm = (term: string) => {
        setOffset(1)
        setTerm(term)
    }

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = (userId: number) => {

        dispatch(addContact({ userId })).unwrap().then(() => setAnchorEl(null))


    };

    const fetchUsers = async (isMore: boolean = false) => {
        try {

            const { data } = await getUsers(`?limit=5&page=${offset}&term=${term}`);;

            setOffset(s => s + 1);

            console.log(data)

            setMaxOffset(Math.ceil(data.users.count / 5))

            if (isMore) {
                setUsers(s => [...s, ...data.users.users])

                return
            }

            setUsers(data.users.users)

        } catch (error) {
            setErrors(apiErrorFormat(error))
        } finally {
            setLoading(false)
        }

    }

    useEffect(() => {

        if (!anchorEl) return;

        setLoading(true);


        const delay = setTimeout(fetchUsers, 1500);

        return () => clearTimeout(delay)

    }, [term])


    return (
        <div>
            <SnackError errors={errors} />

            <SnackError errors={stateErrors} />

            <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                variant="outlined"
                endIcon={<AddIcon />}
                fullWidth
            >
                New Chat
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                sx={{
                    width: "100%"
                }}

                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}

            >
                <MenuItem style={{ backgroundColor: "#FFF" }} >
                    <SearchInput placeHolder={"enter username or email ..."} onChange={(term) => handleTerm(term)} />
                </MenuItem>

                {loading ?
                    <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        p={2}
                    >
                        <CircularProgress sx={{ width: "10px", height: "10px" }} />
                    </Box> :
                    <Box>
                        {users.map(user => {
                            return (
                                <MenuItem
                                    key={user.id}
                                    onClick={() => handleClose(user.id)}
                                    sx={{
                                        display: "flex",
                                        alignItems: "center"
                                    }}>


                                    <Avatar
                                        sx={{
                                            width: "25px",
                                            height: "25px",
                                            bgcolor: purple[500],
                                            fontSize: "12px",
                                            p: 0
                                        }}
                                        alt={user.username}
                                        src={user.image || "/"}
                                    />

                                    <Typography
                                        variant="body1"
                                        marginLeft="10px"
                                        fontSize="14px"
                                    >
                                        {fullName({
                                            username: user.username,
                                            first_name: user.first_name,
                                            last_name: user.last_name
                                        })}
                                    </Typography>


                                </MenuItem>

                            )
                        })}

                        <div ref={containerRef} />

                        {
                            (maxOffset >= offset && users.length > 0 && !loading) ?
                                <>
                                    <Divider />
                                    <Button
                                        fullWidth
                                        variant='text'
                                        sx={{
                                            fontSize: "14px", textTransform: "none", textAlign: "center"
                                        }}
                                        onClick={() => fetchUsers(true)}
                                    >
                                        Load More...
                                    </Button>
                                </>
                                :
                                null
                        }
                    </Box>
                }
            </Menu>
        </div>
    );
}

export default NewChat