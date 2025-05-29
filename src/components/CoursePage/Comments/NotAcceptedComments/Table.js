import { useState } from 'react';
import { Check, CheckCircle, Trash2, XOctagon } from 'react-feather';
import { Alert, Col, Table } from 'reactstrap';
import { acceptComment, deleteCourseReplyComment } from '../../../../@core/services/courses';
import { useDispatch } from 'react-redux';
import { setComments, setNotAcceptedMain, setNotAcceptedReplies } from '../../../../redux/coursesSlice';

const TableData = ({ data }) => {
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const handleAccept = async (item) => {
        if (item.replyCommentId !== null) {
            setLoading(true)
            await acceptComment(item.commentId)
            dispatch(setNotAcceptedReplies(data.filter((c) => c.commentId !== item.commentId)))
            setLoading(false)
        }
        else {
            setLoading(true)
            await acceptComment(item.commentId)
            dispatch(setNotAcceptedMain(data.filter((c) => c.commentId !== item.commentId)))
            setLoading(false)
        }
    }
    const handleDelete = async (item) => {
        if (item.replyCommentId !== null) {
            setLoading(true)
            await deleteCourseReplyComment(item.commentId)
            dispatch(setNotAcceptedReplies(data.filter((c) => c.commentId !== item.commentId)))
            setLoading(false)
        }
        else {
            setLoading(true)
            await deleteCourseReplyComment(item.commentId)
            dispatch(setNotAcceptedMain(data.filter((c) => c.commentId !== item.commentId)))
            dispatch(setComments({ comment_Id: item.commentId }))
            setLoading(false)
        }

    }
    return (
        <>
            {
                data?.length > 0 ? (
                    <Table responsive >
                        <thead>
                            <tr>
                                <th>عنوان</th>
                                <th>نویسنده</th>
                                <th>توضیحات</th>
                                <th>امکانات</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data.map((item) => (
                                    <tr key={item.commentId}>
                                        <td>{item.commentTitle}</td>
                                        <td>{item.userFullName}</td>
                                        <td>{item.describe}</td>
                                        <td>
                                            <CheckCircle className='cursor-pointer me-1' onClick={() => { handleAccept(item) }} />
                                            <Trash2 className='cursor-pointer' onClick={() => { handleDelete(item) }} />
                                        </td>
                                    </tr>
                                ))

                            }
                        </tbody>
                    </Table>
                ) : <Alert color='danger' className='p-1 text-center'>وجود ندارد</Alert>
            }


        </>
    )
}

export default TableData