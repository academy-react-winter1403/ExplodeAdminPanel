import { useEffect, useState } from 'react'
import { Alert, Button, Row, Table } from 'reactstrap'
import { formatDate } from '../../../utility/DateFormatter'
import { ValidURL } from '../../../utility/ValidUrl'
import ReactPaginate from 'react-paginate'
import { Eye, Trash } from 'react-feather'
import ReplyComment from './ReplyComment'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCourseComments, setCourseId } from '../../../redux/coursesSlice'
import CommentDetail from './CommentDetail'

const AcceptedComments = ({ courseId }) => {
    const [detailModal, setDetailModal] = useState(false)
    const [commentTitle, setCommentTitle] = useState(null)
    const [commentId, setCommentId] = useState(null)
    const { comments } = useSelector((state) => state.courses)
    const [replyModal, setReplyModal] = useState(false)
    const dispatch = useDispatch()
    const handlePagination = ({ selected }) => {
        setCurrentPage(selected)
    }
    const handleComments = async () => {
        dispatch(setCourseId(courseId))
        dispatch(fetchCourseComments())
    }
    const [currentPage, setCurrentPage] = useState(0)
    const itemsPerPage = 5
    const pageCount = Math.ceil(comments.length / itemsPerPage);
    const currentCourses = comments.slice(
        currentPage * itemsPerPage,
        (currentPage + 1) * itemsPerPage
    )
    useEffect(() => {
        handleComments()
    }, [])
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
                                        {item.author?.length > 10 ? item.author.slice(0, 10) + '...' : item.author}
                                    </td>
                                    <td>
                                        {formatDate(item.insertDate)}
                                    </td>
                                    <td>
                                        <Eye className=' cursor-pointer' onClick={() => { setDetailModal(!detailModal); setCommentId(item.id) }} />
                                        <Trash className='cursor-pointer' />
                                        <Button color='primary' onClick={() => { setReplyModal(!replyModal); setCommentTitle(item.title); setCommentId(item.id) }}>پاسخ</Button>
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
            />

            <ReplyComment
                setReplyModal={setReplyModal}
                replyModal={replyModal}
                courseId={courseId}
                commentId={commentId}
                commentTitle={commentTitle}
            />
        </>
    )
}

export default AcceptedComments