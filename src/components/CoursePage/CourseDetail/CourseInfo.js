import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Button, Col, Form, FormFeedback, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row, Spinner, Table } from 'reactstrap';
import { changeCourseStatus, updateStatus } from '../../../@core/services/courses';
import { setCourseStatus, setCourseStatusValue } from '../../../redux/courseDetailSlice';
import { Controller, useForm } from 'react-hook-form'
import Select from 'react-select'
import { selectThemeColors } from '@utils'
import { NavLink } from 'react-router-dom';
const CourseInfo = ({ courseData, courseId, allStatus }) => {
    allStatus = allStatus.map((item) => (
        { value: item.id, label: item.statusName }
    ))
    const [centeredModal, setCenteredModal] = useState(false)
    const [status, setStatus] = useState(false)
    const [statusModal, setStatusModal] = useState(false)
    const [buttonLoading, setButtonLoading] = useState(false)
    const { courseActiveStatus } = useSelector((state) => state.courseDetails)
    const { courseStatusValue } = useSelector((state) => state.courseDetails)
    const dispatch = useDispatch()
    const handleStatus = async () => {
        setButtonLoading(true)
        await updateStatus(courseId, status, setButtonLoading, setCenteredModal)
        dispatch(setCourseStatus(status))
        setButtonLoading(false)
        setCenteredModal(false)
    }
    const {
        control,
        handleSubmit,
        formState: { errors }
    } = useForm()

    const onSubmit = async (data) => {
        try {
            setButtonLoading(true)
            await changeCourseStatus(courseId, data.courseStatus.value)
            dispatch(setCourseStatusValue(data.courseStatus.label))
            setButtonLoading(false)
            setStatusModal(false)
        }
        catch {
            setButtonLoading(false)
            setStatusModal(false)
        }
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
                        <th> ویرایش دوره</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{courseStatusValue}</td>
                        <td>{courseData.courseLevelName}</td>
                        <td><Button color='success' onClick={() => setStatusModal(true)}>تغییر</Button></td>
                        <td><NavLink to={`/editcourse/${courseId}`}><Button color='primary'>ویرایش</Button></NavLink></td>

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


            <Modal isOpen={statusModal} toggle={() => setStatusModal(!statusModal)} className='modal-dialog-centered'>
                <ModalHeader toggle={() => setStatusModal(!statusModal)}> انتخاب وضعیت کلاس</ModalHeader>
                <ModalBody>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Row>
                            <Col md='12' className='mb-1'>
                                <Label className='form-label' for='courseStatus'>
                                    وضعیت کلاس
                                </Label>
                                <Controller
                                    name="courseStatus"
                                    control={control}
                                    render={({ field, fieldState: { error } }) => (
                                        <>
                                            <Select
                                                {...field}
                                                value={field.value}
                                                theme={selectThemeColors}
                                                isClearable={false}
                                                id="courseStatus"
                                                className={`react-select ${error ? 'is-invalid' : ''}`}
                                                classNamePrefix='select'
                                                options={allStatus}
                                                placeholder="انتخاب کنید"
                                            />
                                            {error && (
                                                <FormFeedback style={{ display: 'block' }}>
                                                    {error.message}
                                                </FormFeedback>
                                            )}
                                        </>
                                    )}
                                />
                            </Col>
                        </Row>
                        <ModalFooter className='justify-content-start'>
                            <Button color='primary ' type='submit'>
                                {buttonLoading ? <Spinner /> : 'بله'}
                            </Button>
                            <Button color='danger ' onClick={() => setStatusModal(!statusModal)}>
                                خیر
                            </Button>
                        </ModalFooter>
                    </Form>
                </ModalBody>

            </Modal>
        </>
    )
}

export default CourseInfo