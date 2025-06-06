import React from 'react'
import { Edit, Eye } from 'react-feather';
import { useSelector } from 'react-redux';
import { Alert, Table } from 'reactstrap';

const AssistanceListTable = ({ courseId }) => {
    const { courseAssistanceList } = useSelector((state) => state.courseDetails)
    const assistanceList = courseAssistanceList.filter((as) => as.courseId == courseId)
    return (
        assistanceList?.length > 0 ?
            <Table>
                <thead>
                    <tr>
                        <th>نام دستیار</th>
                        <th>شناسه دستیار</th>
                        <th>امکانات</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        assistanceList?.map((item) => (
                            <tr>
                                <td>{item.assistanceName ? item.assistanceName :'بدون نام'}</td>
                                <td>{item.id}</td>
                                <td>
                                    <Eye className='cursor-pointer mx-1'/>
                                    <Edit className='cursor-pointer'/>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
            :
            <Alert
                color='warning'
                className='text-center p-1'
                style={{ fontWeight: 'bold', fontSize: '20px' }}
            >
                موردی یافت نشد
            </Alert>

    )
}

export default AssistanceListTable