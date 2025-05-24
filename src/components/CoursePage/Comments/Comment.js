import React, { useState } from 'react'
import { Button, Card, CardBody, CardHeader, Col, Modal, ModalBody, ModalFooter, ModalHeader, Spinner } from 'reactstrap'
import Avatar from '../../../@core/components/avatar'
import { formatDate } from '../../../utility/DateFormatter'
import { ArrowDownCircle, Trash } from 'react-feather'
import { useDispatch, useSelector } from 'react-redux'
import { setCommentId, setDeleteCommentReply } from '../../../redux/coursesSlice'
import { setCourseId } from '../../../redux/addCourseSlice'
import { deleteCourseReplyComment } from '../../../@core/services/courses'
import ReplyComment from './ReplyComment'

const Comment = ({ comment, onLoadReplies }) => {
    const dispatch = useDispatch()
    const [replyCommentId, setReplyCommentId] = useState(null)
    const [deleteModal, setDeleteModal] = useState(false)
    const [buttonLoading, setButtonLoading] = useState(false)
    const [replyModal, setReplyModal] = useState(false)
    const [commentTitle, setCommentTitle] = useState(null)
    const notChildren = "00000000-0000-0000-0000-000000000000"
    const {courseId} = useSelector((state) => state.courses)
    const handleDelete = async () => {
        setButtonLoading(true)
        await deleteCourseReplyComment(replyCommentId, setButtonLoading, setDeleteModal)
        dispatch(setDeleteCommentReply({ commentId: replyCommentId }))
        setButtonLoading(false)
        setDeleteModal(false)
    }
    return (
        <>
            <Col sm='12' style={{ boxShadow: '0px 0px 10px #e2e2e2' }}>
                <Card style={{ backgroundColor: '#fff' }}>
                    <CardHeader className='border-bottom'>
                        <Col sm='8' className='d-flex align-items-center flex-wrap'>
                            <Avatar size={'lg'} img={comment?.pictureAddress} className='me-75' />
                            <div className='me-1'>
                                <div className='me-10'>{comment?.author}</div>
                                <div><h4>{comment?.title}</h4></div>
                            </div>
                            <Button color='primary' onClick={() => { setReplyCommentId(comment.id), setReplyModal(true), setCommentTitle(comment.title) }}>پاسخ</Button>
                        </Col>
                        <Col sm='4' className='d-flex justify-content-end align-items-center'>

                            <span className='mx-1'>{formatDate(comment?.insertDate)}</span>
                            {
                                comment.parentId !== notChildren && <Trash className='cursor-pointer mx-1' onClick={() => { setReplyCommentId(comment?.id), setDeleteModal(true) }} />
                            }
                            {
                                comment?.acceptReplysCount > 0 && comment.parentId !== notChildren && <ArrowDownCircle className='cursor-pointer' onClick={async () => { dispatch(setCommentId(comment?.id)); dispatch(setCourseId(courseId)); onLoadReplies(comment.id) }} />
                            }
                        </Col>
                    </CardHeader>
                    <CardBody>
                        <p className='py-2'>
                            {comment?.describe}
                        </p>

                        {comment?.replies?.length > 0 && (
                            comment?.replies.map((reply) => (
                                <Comment
                                    key={reply.id}
                                    comment={reply}
                                    onLoadReplies={onLoadReplies}
                                />
                            ))
                        )}

                    </CardBody>
                </Card>
            </Col>



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


            {/* Reply Comment */}
            <ReplyComment
                setReplyModal={setReplyModal}
                replyModal={replyModal}
                courseId={courseId}
                commentId={replyCommentId}
                commentTitle={commentTitle}
            />
        </>

    )
}

export default Comment