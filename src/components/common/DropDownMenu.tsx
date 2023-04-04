import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { Collapse, Divider, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useAppSelector } from '../../hooks/store.hook';
import TablePagination from '@mui/material/TablePagination';
import { styled, Theme, CSSObject, makeStyles } from '@mui/material/styles';

type props = {
    children: any,
    title: string,
    items: any[],
    icon: any
};


const Pagination: any = styled(TablePagination)({
    "& .MuiTablePagination-displayedRows": {
        color: "#fff"
    },

    "& .MuiTablePagination-actions": {
        color: "#fff",
        "& .Mui-disabled": {
            color: "rgba(225 , 225 , 225 , 0.4)",

        }
    }
});

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
                <ListItemText sx={{ color: them.colors.firstColor, textTransform: "capitalize" }} primary={title} />
                {open ?
                    <ExpandLess sx={{ fill: them.colors.firstColor }} /> :
                    <ExpandMore sx={{ fill: them.colors.firstColor }} />
                }
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
                {items.length > 3 ?
                    <>
                        <Pagination
                            component="div"
                            count={items.length}
                            page={page}
                            onPageChange={handleChangePage}
                            rowsPerPageOptions={[]}
                            rowsPerPage={3}

                        />
                        <Divider sx={{ maxWidth: "calc(100% - 32px)", mx: "auto", bgcolor: them.colors.firstColor }} />

                    </>

                    : null
                }


                {React.cloneElement(children, { items: newItems })}

            </Collapse>

        </List>
    )
}

export default DropDownMenu