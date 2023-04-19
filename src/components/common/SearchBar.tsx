import React, { useEffect, useState } from 'react'
import SearchInput from './SearchInput'
import { useAppSelector } from '../../hooks/store.hook'
import { ITask } from '../../interfaces/tasks'
import { getTasks } from '../../utilities/api'
import { apiErrorFormat } from '../../utilities/error-format'
import { MenuList, MenuItem, Box, Typography, CircularProgress, Button, Divider } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import SnackError from './SnackError'

const SearchBar = () => {
    const { space: { id: spaceId } } = useAppSelector(state => state)

    const navigate = useNavigate()

    const [offset, setOffset] = useState(1)
    const [maxOffset, setMaxOffset] = useState(0)
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState([]);
    const [tasks, setTasks] = useState<ITask[]>([])
    const [term, setTerm] = useState("")

    const [open, setOpen] = useState(false);


    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);

        if (open) {
            setOpen(false);
            setTasks([]);
            setOffset(1)

        }
    };


    const handleTerm = (term: string) => {
        if (!open) setOpen(true)
        setLoading(true)
        setOffset(1)
        setTasks([])
        setTerm(term)
    }

    const fetchTasks = async () => {
        try {
            setLoading(true)
            const { data } = await getTasks(`?spaceId=${spaceId}&orderBy=position&order=asc&limit=5&page=${offset}&term=${term}`);;

            setOffset(s => s + 1);

            setMaxOffset(Math.ceil(data.tasks.count / 5))

            console.log(data.tasks.data)

            setTasks((s: any) => [...s, ...data.tasks.data])

        } catch (error) {
            setErrors(apiErrorFormat(error))
        } finally {
            setLoading(false)
        }

    }

    const navigateTo = (id: number) => {
        setTerm("");
        setOpen(false);
        setTasks([]);
        setOffset(1)

        navigate(`/task/${id}`)
    }


    useEffect(() => {

        if (!open) return;

        if (!term) {
            fetchTasks()
            return;
        }

        const delay = setTimeout(fetchTasks, 1500);

        return () => clearTimeout(delay)

    }, [term, open])
    return (
        <Box
            position="relative"
            zIndex="99999"
            width="280px"
        >
            <SnackError errors={errors} />
            <Box
                aria-haspopup="true"
                component={"div"}
                onClick={handleToggle}
            >
                <SearchInput placeHolder={"search in tasks ..."} onChange={(term) => handleTerm(term)} />
            </Box>

            {
                open && <Box
                    border="2px solid #E4E4E4"
                    borderRadius="4px"
                    position="absolute"
                    width="100%"
                    top="45px"
                    bgcolor="#FFF"
                    color="#0C1A3E"

                >
                    {loading ?
                        <Box
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            p={2}
                        >
                            <CircularProgress sx={{ width: "20px", height: "20px" }} />

                        </Box>
                        :
                        <MenuList

                        >
                            {tasks.length > 0 ?
                                tasks.map(task => <MenuItem onClick={() => navigateTo(task.id)}>
                                    <Typography sx={{
                                        fontSize: "14px"
                                    }}>
                                        {task.title}
                                    </Typography>
                                </MenuItem>)
                                :
                                <MenuItem>
                                    <Typography align='center' width="100%" >
                                        No task found
                                    </Typography>
                                </MenuItem>

                            }

                            {
                                (maxOffset >= offset && tasks.length > 0) &&
                                <>
                                    <Divider />
                                    <MenuItem>
                                        <Button
                                            fullWidth
                                            variant='text'
                                            sx={{
                                                fontSize: "14px", textTransform: "none", p: 0, textAlign: "center"
                                            }}
                                            onClick={fetchTasks}
                                        >
                                            Load More...
                                        </Button>
                                    </MenuItem>
                                </>
                            }
                        </MenuList>
                    }
                </Box>
            }
        </Box>
    )
}

export default SearchBar