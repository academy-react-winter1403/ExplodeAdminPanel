import React from 'react'

import DataTable from './Table'
import { useSelector } from 'react-redux'


const ActiveBuildings = () => {
    const { activeBuildings } = useSelector((state) => state.courses)
    return (
        <DataTable
            active_Buildings={true}
            data={activeBuildings}
        />
    )
}

export default ActiveBuildings