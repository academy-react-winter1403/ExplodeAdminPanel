import React, { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate'
import { Alert, Table } from 'reactstrap'

const PaymentDone = ({ payments }) => {
    const [currentPage, setCurrentPage] = useState(0)
    const itemsPerPage = 5
    const pageCount = Math.ceil(payments?.length / itemsPerPage);
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
    return (
        <>
            {
                currentAccepted?.length > 0 ? <><Table responsive>
                    <thead>
                        <tr>
                            <th>نام دانشجو</th>
                            <th>گروه دوره</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            currentAccepted.map((item) => (
                                <tr>
                                    <td>{item.studentName}</td>
                                    <td>{item.groupName}</td>
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

export default PaymentDone