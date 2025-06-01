
import { MessageSquare } from 'react-feather'
import { Alert, Button, Col, Modal, ModalBody, ModalFooter, ModalHeader, Row, Spinner } from 'reactstrap'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCourseCommentReplies, setCommentId, setCourseId } from '../../../redux/coursesSlice';
import Comment from './Comment';
import { fetchBlogCommentReplies, setBlogCommentId, setBlogId } from '../../../redux/blogSlice';

const CommentDetail = ({ detailModal, setDetailModal, commentId, courseId, comments, isBlogs }) => {
    const comment = comments.find((c) => c.id == commentId)
    const allComments = isBlogs ? useSelector((state) => state.blogs.allComments) : useSelector((state) => state.courses.allComments)
    const singleComment = allComments.find((c) => c.id === commentId)
    const dispatch = useDispatch()

    const handleLoadReplies = () => {
        if (isBlogs) {
            dispatch(fetchBlogCommentReplies())
        }
        else {
            dispatch(fetchCourseCommentReplies())
        }
    };
    useEffect(() => {
        if (isBlogs) {
            if (detailModal && commentId && courseId) {
                dispatch(setBlogId(courseId))
                dispatch(setBlogCommentId(commentId))
                dispatch(fetchBlogCommentReplies())
                dispatch(setBlogId(courseId))
            }
        }
        else {
            if (detailModal && commentId && courseId) {
                dispatch(setCourseId(courseId))
                dispatch(setCommentId(commentId))
                dispatch(fetchCourseCommentReplies())
                dispatch(setCourseId(courseId))
            }
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
                                isBlogs={isBlogs}
                            />
                        </Col>
                    </Row>
                </ModalBody>
            </Modal>



        </>
    )
}

export default CommentDetail