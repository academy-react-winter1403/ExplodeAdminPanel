
import { MessageSquare } from 'react-feather'
import { Alert, Button, Col, Modal, ModalBody, ModalFooter, ModalHeader, Row, Spinner } from 'reactstrap'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCourseCommentReplies, setCommentId, setCourseId, updateCommentReplies } from '../../../redux/coursesSlice';
import Comment from './Comment';

const CommentDetail = ({ detailModal, setDetailModal, commentId, courseId, comments }) => {
    const comment = comments.find((c) => c.id == commentId)
    const { allComments } = useSelector((state) => state.courses)
    const singleComment = allComments.find((c) => c.id === commentId)
    const dispatch = useDispatch()

    const handleLoadReplies = () => {
        dispatch(fetchCourseCommentReplies());
    };
    useEffect(() => {
        if (detailModal && commentId && courseId) {
            dispatch(setCourseId(courseId))
            dispatch(setCommentId(commentId))
            dispatch(fetchCourseCommentReplies())
            dispatch(setCourseId(courseId))
        }
    }, [detailModal, commentId, courseId])
    return (
        <>
            <Modal isOpen={detailModal} toggle={() => setDetailModal(!detailModal)} className='modal-dialog-centered modal-lg'>
                <ModalHeader toggle={() => setDetailModal(!detailModal)}><MessageSquare /> {comment?.title}</ModalHeader>
                <ModalBody>
                    <Row>
                        <Col>
                            <Comment
                                key={singleComment?.id}
                                comment={singleComment}
                                courseId={courseId}
                                onLoadReplies={handleLoadReplies}
                            />
                        </Col>
                    </Row>
                </ModalBody>
            </Modal>



        </>
    )
}

export default CommentDetail