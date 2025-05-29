import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader, Spinner, Table } from 'reactstrap';
import { updateStatus } from '../../../@core/services/courses';
import { setCourseStatus } from '../../../redux/courseDetailSlice';

const CourseInfo = ({ courseData, courseId }) => {
    const [centeredModal, setCenteredModal] = useState(false)
    const [status, setStatus] = useState(false)
    const [buttonLoading, setButtonLoading] = useState(false)
    const { courseActiveStatus } = useSelector((state) => state.courseDetails)
    const dispatch = useDispatch()
    const handleStatus = async () => {
        setButtonLoading(true)
        await updateStatus(courseId, status, setButtonLoading, setCenteredModal)
        dispatch(setCourseStatus(status))
        setButtonLoading(false)
        setCenteredModal(false)
    }
    return (
        <>
            <h2 className='mt-5'>اطلاعات دوره: </h2>
            <Table responsive className='mt-1'>
                <thead>
                    <tr>
                        <th>نام استاد</th>
                        <th>وضعیت</th>
                        <th>نام کلاس</th>
                        <th>نحوه برگزاری</th>
                        <th>قیمت</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{courseData.teacherName}</td>
                        <td>{courseActiveStatus == true ?
                            <Button color='primary' onClick={() => { setStatus(false); setCenteredModal(true) }}>فعال</Button> :
                            <Button color='warning' onClick={() => { setStatus(true); setCenteredModal(true) }}>غیرفعال</Button>}
                        </td>
                        <td>{courseData.courseClassRoomName}</td>
                        <td>{courseData.courseTypeName}</td>
                        <td>{courseData.cost}</td>
                    </tr>
                </tbody>
            </Table>

            <Table responsive className='mt-2'>
                <thead>
                    <tr>
                        <th>وضعیت کلاس</th>
                        <th>سطح کلاس</th>
                        <th>تغییر وضعیت کلاس</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{courseData.courseStatusName}</td>
                        <td>{courseData.courseLevelName}</td>
                        <td><Button color='success'>تغییر</Button></td>
                    </tr>
                </tbody>
            </Table>

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
        </>
    )
}

export default CourseInfo