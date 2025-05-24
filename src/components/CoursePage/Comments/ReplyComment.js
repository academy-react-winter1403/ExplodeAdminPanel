import { useState } from 'react'
import { MessageCircle } from 'react-feather'
import { Controller, useForm } from 'react-hook-form'
import { Button, Form, Input, Label, Modal, ModalBody, ModalHeader, Spinner } from 'reactstrap'
import { addCommentReplyCourse } from '../../../@core/services/courses'
import { useDispatch } from 'react-redux'
import { fetchCourseCommentReplies } from '../../../redux/coursesSlice'

const ReplyComment = ({ replyModal, setReplyModal, commentTitle, commentId, courseId }) => {
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const {
        reset,
        control,
        setError,
        handleSubmit,
        formState: { errors }
    } = useForm()

    const handleReset = () => {
        reset({
            Title: '',
            Describe: ''
        })
    }

    const onSubmit = async data => {
        if (Object.values(data).every(field => field.length > 0)) {
            const commentData = { CommentId: commentId, CourseId: courseId, Title: data.Title, Describe: data.Describe }
            console.log(commentId)
            const result = await addCommentReplyCourse(setLoading, setReplyModal, commentData)
            dispatch(fetchCourseCommentReplies())


        } else {
            for (const key in data) {
                if (data[key].length === 0) {
                    setError(key, {
                        type: 'manual'
                    })
                }
            }
        }
    }

    return (
        <Modal isOpen={replyModal} toggle={() => setReplyModal(!replyModal)} className='modal-dialog-centered modal-lg'>
            <ModalHeader toggle={() => setReplyModal(!replyModal)}><MessageCircle /> پاسخ برای  " {commentTitle} "</ModalHeader>
            <ModalBody>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <div className='mb-1'>
                        <Label className='form-label' for='Title'>
                            عنوان
                        </Label>
                        <Controller
                            defaultValue=''
                            control={control}
                            id='Title'
                            name='Title'
                            render={({ field }) => <Input placeholder='عنوان نظر' invalid={errors.Title && true} {...field} />}
                        />
                    </div>

                    <div className='mb-1'>
                        <Label className='form-label' for='Describe'>
                            متن
                        </Label>
                        <Controller
                            defaultValue=''
                            control={control}
                            id='Describe'
                            name='Describe'
                            render={({ field }) => <Input type='textarea' placeholder='متن نظر' invalid={errors.Describe && true} {...field} />}
                        />
                    </div>
                    <div className='d-flex'>
                        <Button className='me-1' color='primary' type='submit'>
                            {
                                loading ? <Spinner /> : 'ثبت'
                            }
                        </Button>
                        <Button outline color='secondary' type='reset' onClick={handleReset}>
                            بازنشانی
                        </Button>
                    </div>
                </Form>
            </ModalBody>
        </Modal>
    )
}

export default ReplyComment