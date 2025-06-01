import { useEffect, useState } from 'react'
import { Alert, Button, Row, Table, Modal, ModalFooter, ModalHeader, ModalBody, Spinner } from 'reactstrap'
import { formatDate } from '../../../utility/DateFormatter'
import { ValidURL } from '../../../utility/ValidUrl'
import ReactPaginate from 'react-paginate'
import { Eye, Trash } from 'react-feather'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCourseComments, setCourseId, updateComments } from '../../../redux/coursesSlice'
import CommentDetail from './CommentDetail'
import { deleteCourseReplyComment } from './../../../@core/services/courses';
import { fetchBlogComments, setBlogId } from '../../../redux/blogSlice'



const AcceptedComments = ({ courseId, isBlogs }) => {
    const [detailModal, setDetailModal] = useState(false)
    const [commentId, setCommentId] = useState(null)
    const comments = isBlogs ? useSelector((state) => state.blogs.comments) : useSelector((state) => state.courses.comments)
    const [buttonLoading, setButtonLoading] = useState(false)
    const [deleteModal, setDeleteModal] = useState(false)
    const dispatch = useDispatch()
    const handlePagination = ({ selected }) => {
        setCurrentPage(selected)
    }
    const handleComments = async () => {
        if (isBlogs) {
            dispatch(setBlogId(courseId))
            dispatch(fetchBlogComments())
        }
        else {
            dispatch(setCourseId(courseId))
            dispatch(fetchCourseComments())
        }
    }
    const [currentPage, setCurrentPage] = useState(0)
    const itemsPerPage = 5
    const pageCount = Math.ceil(comments.length / itemsPerPage);
    const currentCourses = comments.slice(
        currentPage * itemsPerPage,
        (currentPage + 1) * itemsPerPage
    )
    const handleDelete = async () => {
        setButtonLoading(true)
        await deleteCourseReplyComment(commentId, setButtonLoading, setDeleteModal)
        dispatch(updateComments({ commentId: commentId }))
        setButtonLoading(false)
        setDeleteModal(false)
    }
    useEffect(() => {
        handleComments()
    }, [])

    useEffect(() => {
        const newPageCount = Math.ceil(comments.length / itemsPerPage);
        if (currentPage >= newPageCount && newPageCount > 0) {
            setCurrentPage(newPageCount - 1);
        } else if (newPageCount === 0) {
            setCurrentPage(0);
        }
    }, [comments, currentPage, itemsPerPage])
    return (
        <>
            {
                comments.length > 0 ? <Table responsive >
                    <thead>
                        <tr >
                            <th>پروفایل</th>
                            <th>عنوان</th>
                            <th>نویسنده</th>
                            <th>تاریخ</th>
                            <th>امکانات</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            currentCourses?.map((item, index) => (
                                <tr key={index}>
                                    <td>
                                        <img className='me-75 rounded-circle' src={ValidURL(item.pictureAddress) ? item.pictureAddress : "/src/assets/images/not-set-image.jpg"} height='40' width='40' />
                                    </td>
                                    <td>
                                        {item.title?.length > 10 ? item.title.slice(0, 10) + '...' : item.title}
                                    </td>
                                    <td>
                                        {isBlogs ? (item.autor?.length > 10 ? item.autor.slice(0, 10) + '...' : item.autor ? item.autor :'بدون نام') : (item.author?.length > 10 ? item.author.slice(0, 10) + '...' : item.author ? item.author : 'بدون نام')}
                                    </td>
                                    <td>
                                        {isBlogs ? formatDate(item.inserDate):formatDate(item.insertDate)}
                                    </td>
                                    <td>
                                        <Eye className=' cursor-pointer' onClick={() => { setDetailModal(!detailModal); setCommentId(item.id) }} />
                                        {!isBlogs && <Trash className='cursor-pointer mx-1' onClick={() => { setDeleteModal(true); setCommentId(item.id) }} />}
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table> :
                    <Alert color='danger'>
                        <Row className='alert-body  text-center'>
                            <span className='h4 text-danger'>نظری یافت نشد</span>
                        </Row>
                    </Alert>
            }

            {
                comments.length > 5 &&
                <Row className='justify-content-center my-1'>
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
                </Row>
            }

            <CommentDetail
                detailModal={detailModal}
                setDetailModal={setDetailModal}
                comments={comments}
                commentId={commentId}
                courseId={courseId}
                isBlogs={isBlogs}
            />



            {/* Delete Modal */}
            <Modal isOpen={deleteModal} toggle={() => setDeleteModal(!deleteModal)} className='modal-dialog-centered modal-sm'>
                <ModalHeader toggle={() => setDeleteModal(!deleteModal)}>حذف نظر</ModalHeader>
                <ModalBody>
                    آیا برای حذف این نظر مطمعن هستید؟
                </ModalBody>
                <ModalFooter className='justify-content-start'>
                    <Button color='primary ' onClick={handleDelete}>
                        {buttonLoading ? <Spinner /> : 'بله'}
                    </Button>
                    <Button color='danger ' onClick={() => setDeleteModal(!deleteModal)}>
                        خیر
                    </Button>
                </ModalFooter>
            </Modal>
        </>
    )
}

export default AcceptedComments