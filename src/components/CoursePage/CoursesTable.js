import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { Badge, Button, Col, Modal, ModalBody, ModalFooter, ModalHeader, Spinner, Table } from 'reactstrap'
import { ValidURL } from './../../utility/ValidUrl';
import { formatDate } from '../../utility/DateFormatter';
import { courseDeleted, fetchCourseNotAcceptedComments, updateCourseStatus } from '../../redux/coursesSlice';
import { deleteCourse, updateStatus } from '../../@core/services/courses';
import { Eye, MessageSquare, RefreshCw, Trash2 } from 'react-feather';
import Comment from './Comments';
import { deleteBlog } from '../../@core/services/blogs';
import { fetchBlogs } from '../../redux/blogSlice';





const CoursesTable = () => {
    const { pathname } = useLocation()
    const isBlogs = pathname == '/blogList' ? true : false
    const { courses } = useSelector((state) => state.courses)
    const { blogs } = useSelector((state) => state.blogs)
    const content = isBlogs ? blogs : courses
    const [centeredModal, setCenteredModal] = useState(false)
    const [deleteModal, setDeleteModal] = useState(false)
    const [courseId, setCourseId] = useState(null)
    const [status, setStatus] = useState(false)
    const [recoveryModal, setRecoveryModal] = useState(false)
    const dispatch = useDispatch()
    const [buttonLoading, setButtonLoading] = useState(false)
    const [commentModal, setCommentModal] = useState(false)
    const handleStatus = async () => {
        setButtonLoading(true)
        await updateStatus(courseId, status, setButtonLoading, setCenteredModal)
        setCenteredModal(!centeredModal)
        setButtonLoading(false)
    }

    const handleDelete = async () => {
        setButtonLoading(true)
        if (isBlogs) {
            await deleteBlog(courseId, false)
            dispatch(fetchBlogs())
        }
        else {
            await deleteCourse(courseId, true, setButtonLoading, setDeleteModal)
            dispatch(courseDeleted({ id: courseId }))
        }
        setButtonLoading(false)
        setDeleteModal(false)
    }

    const handleRecovery = async () => {
        setButtonLoading(true)
        await deleteBlog(courseId, true)
        dispatch(fetchBlogs())
        setRecoveryModal(false)
        setButtonLoading(false)
    }

    useEffect(() => {
        if (isBlogs) {

        }
        else {
            dispatch(fetchCourseNotAcceptedComments())
        }
    }, [])
    return (
        <>
            <Col style={{ marginBottom: '20px', fontSize: '20px' }} sm='12' >

            </Col>
            <Table responsive >
                <thead>
                    <tr>
                        <th>عکس</th>
                        <th>عنوان</th>
                        <th>{isBlogs ? 'نویسنده' : 'مدرس'}</th>
                        <th>{isBlogs ? 'دسته بندی' : 'قیمت (تومان)'}</th>
                        <th>وضعیت</th>
                        <th>تاریخ</th>
                        <th>امکانات</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        content?.map((item, index) => (

                            < tr key={index}>
                                { }
                                <td><img className='me-75' src={ValidURL(isBlogs ? item.currentImageAddressTumb : item.tumbImageAddress) ? (isBlogs ? item.currentImageAddressTumb : item.tumbImageAddress) : "/src/assets/images/not-set-image.jpg"} height='50' width='80' /></td>
                                <td>
                                    <span className='align-middle fw-bold'>{item?.title.length > 20 ? item.title.slice(0, 20) + '...' : item.title}</span>
                                </td>
                                <td>
                                    {isBlogs ? item.addUserFullName : item.fullName}
                                </td>
                                <td>
                                    {isBlogs ? item.newsCatregoryName : item.cost}
                                </td>
                                <td >
                                    {
                                        isBlogs ?
                                            item.isActive ? <Badge pill color='success' className='me-1' style={{ padding: '10px 20px' }}>
                                                فعال
                                            </Badge> :
                                                <Badge pill color='danger' className='me-1' style={{ padding: '10px 20px' }}>
                                                    حذف شده
                                                </Badge>
                                            : item.isdelete ? <Badge pill color='danger' className='me-1'>
                                                حذف شده
                                            </Badge> : item.isActive ? <>
                                                <Button color="primary" onClick={() => { setCourseId(item.courseId); setStatus(false); setCenteredModal(!centeredModal) }}>
                                                    فعال
                                                </Button>
                                            </> : <Button color='danger' onClick={() => { setCourseId(item.courseId); setStatus(true); setCenteredModal(!centeredModal) }}>
                                                غیر فعال
                                            </Button>
                                    }
                                </td>
                                <td>
                                    {isBlogs ? formatDate(item.insertDate) : formatDate(item.lastUpdate)}
                                </td>
                                <td >
                                    {
                                        !item.isdelete && <>
                                            <Link to={`/coursedetail/${item.courseId}`} className='' style={{ display: 'inline' }}><Eye /></Link>
                                            <MessageSquare className='cursor-pointer mx-1' onClick={() => { isBlogs ? setCourseId(item.id) : setCourseId(item.courseId); setCommentModal(!commentModal) }} />
                                            {
                                                isBlogs ?
                                                    (item.isActive && <Trash2 onClick={() => { setCourseId(item.id); setDeleteModal(!deleteModal) }} className='cursor-pointer' />)
                                                    :
                                                    <Trash2 onClick={() => { setCourseId(item.courseId); setDeleteModal(!deleteModal) }} className='cursor-pointer' />
                                            }
                                            {
                                                isBlogs && item.isActive == false && <RefreshCw className='cursor-pointer' onClick={() => { setRecoveryModal(true), setCourseId(item.id) }} />
                                            }
                                        </>
                                    }
                                </td>
                            </tr>
                        ))
                    }

                </tbody>

            </Table >


            {/* Status Modal */}
            <Modal isOpen={centeredModal} toggle={() => setCenteredModal(!centeredModal)} className='modal-dialog-centered'>
                <ModalHeader toggle={() => setCenteredModal(!centeredModal)}>تغییر وضعیت</ModalHeader>
                <ModalBody>
                    آیا مطمعن هستید برای تغییر وضعیت؟
                </ModalBody>
                <ModalFooter className='justify-content-start'>
                    <Button color='primary ' onClick={handleStatus}>
                        {buttonLoading ? <Spinner /> : 'بله'}
                    </Button>
                    <Button color='danger ' onClick={() => setCenteredModal(!centeredModal)}>
                        خیر
                    </Button>
                </ModalFooter>
            </Modal>

            {/* Delete Modal */}
            <Modal isOpen={deleteModal} toggle={() => setDeleteModal(!deleteModal)} className='modal-dialog-centered'>
                <ModalHeader toggle={() => setDeleteModal(!deleteModal)}>حذف دوره</ModalHeader>
                <ModalBody>
                    آیا برای حذف این دوره مطمعن هستید؟
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

            {/* Recovery Modal */}
            <Modal isOpen={recoveryModal} toggle={() => setRecoveryModal(!recoveryModal)} className='modal-dialog-centered'>
                <ModalHeader toggle={() => setRecoveryModal(!recoveryModal)}>بازیابی بلاگ</ModalHeader>
                <ModalBody>
                    آیا برای بازیابی این بلاگ مطمعن هستید؟
                </ModalBody>
                <ModalFooter className='justify-content-start'>
                    <Button color='primary ' onClick={handleRecovery}>
                        {buttonLoading ? <Spinner /> : 'بله'}
                    </Button>
                    <Button color='danger ' onClick={() => setRecoveryModal(!recoveryModal)}>
                        خیر
                    </Button>
                </ModalFooter>
            </Modal>

            {/* Comment Modal */}
            <Comment
                commentModal={commentModal}
                setCommentModal={setCommentModal}
                courseId={courseId}
                isBlogs={isBlogs}
            />

        </>

    )
}

export default CoursesTable