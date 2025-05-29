
import { Alert, Badge, Table } from 'reactstrap'
import { formatDate } from '../../../utility/DateFormatter'


const Student = ({ courseId, courseReserveList }) => {
    let students = courseReserveList.filter((r) => r.accept == true)
    return (
        <>
            {
                students?.length > 0 ?
                    <Table responsive>
                        <thead>
                            <tr>
                                <th>نام دانشجو</th>
                                <th> تاریخ رزور</th>
                                <th>وضعیت</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                students.map((item) => (
                                    <tr>
                                        <td>{item.studentName}</td>
                                        <td>{formatDate(item.reserverDate)}</td>
                                        <td>{item.accept == true && <Badge color='success'>تایید شده</Badge>}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </Table> : <Alert className='text-center p-1' color='warning' style={{fontSize:'20px'}}>دانشجویی ثبت نشده</Alert>
            }
        </>
    )
}

export default Student