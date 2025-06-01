import React, { useEffect, useState } from 'react'
import { Check, X } from 'react-feather'
import ReactPaginate from 'react-paginate'
import { Alert, Button, Spinner, Table } from 'reactstrap'
import { acceptCoursePayment, deleteCoursePayment } from '../../../@core/services/courses'
import { useDispatch, useSelector } from 'react-redux'
import { setCoursePaymentListNotAccept, setCoursePaymentsDone, setCoursePaymentsNotDone } from '../../../redux/courseDetailSlice'
import toast from 'react-hot-toast'

const PaymentNotAccept = ({ payments, courseId }) => {
    payments = payments.filter((p) => p.accept == false && p.courseId == courseId)
    const { coursePaymentsDone } = useSelector((state) => state.courseDetails)
    const [currentPage, setCurrentPage] = useState(0)
    const itemsPerPage = 5
    const pageCount = Math.ceil(payments?.length / itemsPerPage);
    const [loading, setloading] = useState(false)
    const [secondLoading, setSecondLoading] = useState(false)
    const dispatch = useDispatch()
    const [itemId, setItemId] = useState(null)
    const currentAccepted = payments?.slice(
        currentPage * itemsPerPage,
        (currentPage + 1) * itemsPerPage
    )
    const handlePagination = ({ selected }) => {
        setCurrentPage(selected)
    }

    useEffect(() => {
        const newPageCount = Math.ceil(payments?.length / itemsPerPage);
        if (currentPage >= newPageCount && newPageCount > 0) {
            setCurrentPage(newPageCount - 1);
        } else if (newPageCount === 0) {
            setCurrentPage(0);
        }
    }, [payments, currentPage, itemsPerPage])

    const handleAccept = async (paymentId, studentName, groupName) => {
        try {
            setloading(true)
            const newObject = { studentName: studentName, groupName: groupName }
            const { message } = await acceptCoursePayment(paymentId)
            const finalPayments = payments.filter((p) => p.id !== paymentId)
            dispatch(setCoursePaymentListNotAccept(finalPayments))
            if (message == "تصفیه سیستمی انجام شدمیزان بدهی فعلی  0.00 مییاشد") {
                dispatch(setCoursePaymentsNotDone(payments.filter((p) => p.id !== paymentId)))
                dispatch(setCoursePaymentsDone([newObject, ...coursePaymentsDone]))
            }
            else {
                toast.success(message)
            }
            setloading(false)
        }
        catch {
            setloading(false)
        }
    }

    const handleDelete = async (paymentId) => {
        try {
            setSecondLoading(true)
            await deleteCoursePayment(paymentId)
            const finalPayments = payments.filter((p) => p.id !== paymentId)
            dispatch(setCoursePaymentListNotAccept(finalPayments))
            setSecondLoading(false)
        }
        catch {
            setSecondLoading(false)
        }
    }
    return (
        <>
            {
                currentAccepted?.length > 0 ? <><Table responsive>
                    <thead>
                        <tr>
                            <th>نام دانشجو</th>
                            <th>گروه دوره</th>
                            <th>عملیات</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            currentAccepted.map((item) => (
                                <tr>
                                    <td>{item.studentName}</td>
                                    <td>{item.groupName}</td>
                                    <td>
                                        <Button style={{ padding: '2px', marginLeft: '10px' }} color='success' onClick={() => { handleAccept(item.id, item.studentName, item.groupName); setItemId(item.id) }}>
                                            {
                                                item.id == itemId && loading ? <Spinner /> : <Check />
                                            }
                                        </Button>
                                        <Button style={{ padding: '2px' }} color='danger' onClick={() => { handleDelete(item.id); setItemId(item.id) }}>
                                            {item.id == itemId && secondLoading ? <Spinner /> : <X />}
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>
                    <ReactPaginate
                        previousLabel={''}
                        nextLabel={''}
                        pageCount={pageCount}
                        onPageChange={handlePagination}
                        forcePage={currentPage}
                        marginPagesDisplayed={1}
                        pageRangeDisplayed={3} // تعداد دکمه‌های صفحه نمایش داده شده
                        activeClassName='active'
                        pageClassName={'page-item'}
                        nextLinkClassName={'page-link'}
                        nextClassName={'page-item next'}
                        previousClassName={'page-item prev'}
                        previousLinkClassName={'page-link'}
                        pageLinkClassName={'page-link'}
                        containerClassName={'pagination react-paginate justify-content-center my-2 pe-1'}
                        breakClassName={'page-item'}
                        breakLinkClassName={'page-link'}
                    />
                </>

                    : <Alert className='p-1 text-center' style={{ fontSize: "20px" }} color='warning'>چیزی پیدا نشد</Alert>
            }
        </>
    )
}

export default PaymentNotAccept