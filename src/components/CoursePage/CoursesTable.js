import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Badge, Button, Modal, ModalBody, ModalFooter, ModalHeader, Spinner, Table } from 'reactstrap'
import { ValidURL } from './../../utility/ValidUrl';
import { formatDate } from '../../utility/DateFormatter';
import { courseDeleted, updateCourseStatus } from '../../redux/coursesSlice';
import { deleteCourse, updateStatus } from '../../@core/services/courses';
import { Edit, MessageSquare, Trash2 } from 'react-feather';



const CoursesTable = () => {
    const { courses } = useSelector((state) => state.courses)
    const [centeredModal, setCenteredModal] = useState(false)
    const [deleteModal, setDeleteModal] = useState(false)
    const [courseId, setCourseId] = useState(null)
    const [status, setStatus] = useState(false)
    const dispatch = useDispatch()
    const [buttonLoading, setButtonLoading] = useState(false)
    const handleStatus = async () => {
        setButtonLoading(true)
        await updateStatus(courseId, status, setButtonLoading, setCenteredModal)
        setButtonLoading(false)
        setCenteredModal(!centeredModal)
        dispatch(updateCourseStatus({ id: courseId, status: status }))
    }

    const handleDelete = async () => {
        setButtonLoading(true)
        console.log(courseId)
        await deleteCourse(courseId, true, setButtonLoading, setDeleteModal)
        setButtonLoading(false)
        setDeleteModal(false)
        dispatch(courseDeleted({ id: courseId }))
    }

    return (
        <>
            <Table responsive className='bg-white'>
                <thead>
                    <tr>
                        <th>عکس</th>
                        <th>عنوان</th>
                        <th>مدرس</th>
                        <th>قیمت (تومان)</th>
                        <th>وضعیت</th>
                        <th>تاریخ</th>
                        <th>امکانات</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        courses?.map((item, index) => (

                            < tr key={index}>
                                { }
                                <td><img className='me-75' src={ValidURL(item.tumbImageAddress) ? item.tumbImageAddress : "/src/assets/images/not-set-image.jpg"} height='50' width='80' /></td>
                                <td>
                                    <span className='align-middle fw-bold'>{item.title}</span>
                                </td>
                                <td>
                                    {item.fullName}
                                </td>
                                <td>
                                    {item.cost}
                                </td>
                                <td >
                                    {
                                        item.isdelete ? <Badge pill color='danger' className='me-1'>
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
                                    {formatDate(item.lastUpdate)}
                                </td>
                                <td >
                                    {
                                        !item.isdelete && <>
                                            <MessageSquare className='cursor-pointer' />
                                            <Edit className='cursor-pointer mx-1' />
                                            <Trash2 onClick={() => { setCourseId(item.courseId); setDeleteModal(!deleteModal) }} className='cursor-pointer' />
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

        </>

    )
}

export default CoursesTable