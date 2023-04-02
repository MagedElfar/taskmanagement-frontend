import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { Collapse, Divider, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useAppSelector } from '../../../hooks/store.hook';
import TablePagination from '@mui/material/TablePagination';

type props = {
    children: any,
    title: string,
    items: any[],
    icon: any
};

const DropDownMenu: React.FC<props> = ({ title, items, children, icon }) => {
    const { them } = useAppSelector(state => state)
    const [page, setPage] = useState(0);

    const [newItems, setNewItems] = useState([])

    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
    ) => {
        setPage(newPage);
    };

    useEffect(() => {
        setNewItems(items.slice(page * 3, (page + 1) * 3))
    }, [page, items.length])

    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(!open);
    };
    return (
        <List >
            <ListItemButton onClick={handleClick}>
                <ListItemIcon>
                    {React.cloneElement(icon, { sx: { fill: them.colors.firstColor } })}
                </ListItemIcon>
                <ListItemText sx={{ color: them.colors.firstColor }} primary={title} />
                {open ?
                    <ExpandLess sx={{ fill: them.colors.firstColor }} /> :
                    <ExpandMore sx={{ fill: them.colors.firstColor }} />
                }
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
                {items.length > 3 ?
                    <TablePagination
                        style={{
                            color: them.colors.firstColor
                        }}
                        component="div"
                        count={items.length}
                        page={page}
                        onPageChange={handleChangePage}
                        rowsPerPageOptions={[]}
                        rowsPerPage={3}

                    />
                    : null
                }

                {React.cloneElement(children, { items: newItems })}

            </Collapse>

        </List>
    )
}

export default DropDownMenu