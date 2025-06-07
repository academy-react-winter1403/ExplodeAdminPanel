import React from 'react'
import DataTable from './Table'
import { useSelector } from 'react-redux'


const NotActiveBuildings = () => {
    const { notActiveBuildings } = useSelector((state) => state.courses)
    return (
        <DataTable
            activeBuildings={false}
            data={notActiveBuildings}
        />
    )
}

export default NotActiveBuildings