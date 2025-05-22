
import { MessageSquare, Trash2 } from 'react-feather'
import { Alert, Button, Card, CardBody, CardHeader, Col, Modal, ModalBody, ModalFooter, ModalHeader, Row, Spinner } from 'reactstrap'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCourseCommentReplies, setCommentId, setCourseId, updateCommentReplies } from '../../../redux/coursesSlice';
import { deleteCourseReplyComment } from '../../../@core/services/courses';

import Avatar from '../../../@core/components/avatar';
import { formatDate } from '../../../utility/DateFormatter';

const CommentDetail = ({ detailModal, setDetailModal, commentId, courseId, comments }) => {
    const comment = comments.find((c) => c.id == commentId)
    const { commentReplies } = useSelector((state) => state.courses)
    const [deleteModal, setDeleteModal] = useState(false)
    const [buttonLoading, setButtonLoading] = useState(false)
    const [replyCommentId, setReplyCommentId] = useState(null)


    const dispatch = useDispatch()
    const handleDelete = async () => {
        setButtonLoading(true)
        await deleteCourseReplyComment(replyCommentId, setButtonLoading, setDeleteModal)
        dispatch(updateCommentReplies({ commentId: replyCommentId }))
        setButtonLoading(false)
        setDeleteModal(false)
    }
    useEffect(() => {
        if (detailModal && commentId && courseId) {
            dispatch(setCourseId(courseId))
            dispatch(setCommentId(commentId))           
            dispatch(fetchCourseCommentReplies())
        }
    }, [detailModal, commentId, courseId, dispatch])

    return (
        <>
            <Modal isOpen={detailModal} toggle={() => setDetailModal(!detailModal)} className='modal-dialog-centered modal-lg'>
                <ModalHeader toggle={() => setDetailModal(!detailModal)}><MessageSquare /> {comment?.title}</ModalHeader>
                <ModalBody>
                    <Row>
                        <Col sm='12' >
                            <Card style={{ backgroundColor: '#fff', boxShadow: '0px 0px 10px #e2e2e2' }}>
                                <CardHeader className='border-bottom'>
                                    <Col sm='9' className='d-flex align-items-center flex-wrap'>
                                        <Avatar size={'lg'} img={comment?.pictureAddress} className='me-75' />
                                        <div>
                                            <div className='me-10'>{comment?.author}</div>
                                            <div><h4>{comment?.title}</h4></div>
                                        </div>
                                    </Col>
                                    <Col sm='3' className='d-flex justify-content-end align-items-center'>
                                        <span className='mx-1'>{formatDate(comment?.insertDate)}</span>
                                    </Col>
                                </CardHeader>
                                <CardBody>
                                    <p className='py-2'>
                                        {comment?.describe}
                                    </p>
                                </CardBody>
                            </Card>
                        </Col>

                    </Row>
                </ModalBody>
            </Modal>


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

export default CommentDetail