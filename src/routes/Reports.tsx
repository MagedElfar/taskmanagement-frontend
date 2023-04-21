import React, { useEffect, useState } from 'react'
import { useAppSelector } from '../hooks/store.hook'
import { apiErrorFormat } from '../utilities/error-format'
import { Box } from '@mui/material'
import ReportTitle from '../components/reports/ReportTitle'
import { getSpaceReport } from '../utilities/api'
import FullPageLoading from '../components/common/loading/FullPageLoading'
import SnackError from '../components/common/SnackError'
import { IReport } from '../interfaces/space'
import SpaceReport from '../components/reports/SpaceReport'
import TeamReport from '../components/reports/TeamReport'



const Reports = () => {

    const { space: { id } } = useAppSelector(state => state)

    const [report, setReport] = useState<IReport | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [errors, setErrors] = useState<string[]>([])
    const [fromDate, setFromDate] = useState<string | null>(null)
    const [toDate, setToDate] = useState<string | null>(null)

    const updateRange = (fromDate: string, toDate: string) => {
        console.log(fromDate, toDate)
        setFromDate(fromDate)
        setToDate(toDate)
    }

    const getReport = async () => {
        try {
            if (!id) return
            setLoading(true)
            let query = null

            if (fromDate && toDate) query = `?fromDate=${fromDate}&toDate=${toDate}`

            const { data } = await getSpaceReport(+id, query)
            setReport(data.report)
        } catch (error) {
            setErrors(apiErrorFormat(error))
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getReport()
    }, [id, fromDate, toDate])

    return (
        <Box>
            <FullPageLoading loading={loading} />
            <SnackError errors={errors} />
            <ReportTitle updateRange={updateRange} />
            {report && <SpaceReport report={report.spaceReport} />}
            {report && <TeamReport report={report.teamReport} />}
        </Box>
    )
}

export default Reports