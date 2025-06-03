import { useEffect, useState } from "react";
import TableData from "./Table";
import ReactPaginate from "react-paginate";

const CategoryTable = ({ categories }) => {
    const [currentPage, setCurrentPage] = useState(0)
    const itemsPerPage = 10
    const pageCount = Math.ceil(categories?.length / itemsPerPage);
    const currentAccepted = categories?.slice(
        currentPage * itemsPerPage,
        (currentPage + 1) * itemsPerPage
    )
    const handlePagination = ({ selected }) => {
        setCurrentPage(selected)
    }
    useEffect(() => {
        const newPageCount = Math.ceil(categories?.length / itemsPerPage);
        if (currentPage >= newPageCount && newPageCount > 0) {
            setCurrentPage(newPageCount - 1);
        } else if (newPageCount === 0) {
            setCurrentPage(0);
        }
    }, [categories, currentPage, itemsPerPage])

    return (
        <>
            <TableData categories={categories} currentAccepted={currentAccepted} />
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
    )
}

export default CategoryTable