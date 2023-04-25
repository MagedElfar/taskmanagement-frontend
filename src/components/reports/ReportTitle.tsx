import { Box, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useAppSelector } from '../../hooks/store.hook'
import { DateRange } from 'react-date-range'
import moment from 'moment';
import 'react-date-range/dist/styles.css'; // import the styles
import 'react-date-range/dist/theme/default.css'; // import the theme

type props = {
    updateRange: (fromDate: string, toDate: string) => void
}
const ReportTitle: React.FC<props> = ({ updateRange }) => {
    const { them } = useAppSelector(state => state)
    const [filter, setFilter] = useState('all');
    const [open, setOpen] = useState(false)
    const [dateRange, setDateRange] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: "selection"
        }
    ])

    function handleSelect(range: any) {
        setDateRange([range.selection]);

        if (moment(range.selection.startDate).isSame(moment(range.selection.endDate), 'day')) return

        const fromDate = moment(range.selection.startDate).format('YYYY-MM-DD HH:mm:ss');
        const toDate = moment(range.selection.endDate).format('YYYY-MM-DD HH:mm:ss');

        updateRange(fromDate, toDate)

        console.log("dateRange = ", dateRange)

        setOpen(true)

    }

    const handleChange = (e: any) => {
        const filter = e.target.value
        setFilter(filter)

        setOpen(false)

        if (filter === "all") {
            updateRange(null, null)
        } else if (filter === "daily") {
            const fromDate = moment().startOf('day').format('YYYY-MM-DD HH:mm:ss');
            const toDate = moment().endOf('day').format('YYYY-MM-DD HH:mm:ss');

            updateRange(fromDate, toDate)
        } else if (filter === "weekly") {
            const fromDate = moment().startOf('isoWeek').format('YYYY-MM-DD HH:mm:ss');
            const toDate = moment().endOf('isoWeek').format('YYYY-MM-DD HH:mm:ss');

            updateRange(fromDate, toDate)
        } else if (filter === "monthly") {
            const fromDate = moment().startOf('month').format('YYYY-MM-DD HH:mm:ss');
            const toDate = moment().endOf('month').format('YYYY-MM-DD HH:mm:ss');

            updateRange(fromDate, toDate)
        } else {
            setOpen(false)
        }
    };


    return (
        <Box
            component="div"
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mb: 6
            }}
        >
            <div>
                <Typography
                    variant='h2'
                    sx={{
                        color: them.colors.secondColor,
                        fontSize: "30px",
                        fontWeight: "500",
                        display: "flex",
                        alignItems: "center"
                    }}
                >
                    Reports
                    {open && <Typography
                        component="span"
                        sx={{
                            fontSize: "16px",
                            ml: 2,
                            fontWeight: 400
                        }}
                    >
                        {`${moment(dateRange[0].startDate).format('YYYY-MM-DD')} - ${moment(dateRange[0].endDate).format('YYYY-MM-DD')}`}
                    </Typography>}
                </Typography>
            </div>

            <div className='relative'>


                <FormControl sx={{ m: 1, minWidth: 250 }} >
                    <InputLabel id="demo-select-small">filter</InputLabel>
                    <Select
                        labelId="demo-select-small"
                        id="demo-select-small"
                        value={filter}
                        label="filter"
                        onChange={handleChange}
                    >
                        <MenuItem value="all">All</MenuItem>
                        <MenuItem value="daily">Daily</MenuItem>
                        <MenuItem value="weekly">Weekly</MenuItem>
                        <MenuItem value="monthly">Monthly</MenuItem>
                        <MenuItem value="range">Custom Range</MenuItem>
                    </Select>
                </FormControl>
                {(filter === "range" && !open) && <Box
                    position="absolute"
                    sx={{
                        right: 0,
                        zIndex: 999
                    }}
                >
                    <DateRange
                        editableDateInputs={true}
                        onChange={handleSelect}
                        moveRangeOnFirstSelection={false}
                        ranges={dateRange}
                    />
                </Box>

                }
            </div >




        </Box >
    )
}

export default ReportTitle