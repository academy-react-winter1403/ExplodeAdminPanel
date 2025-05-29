import React, { useState } from 'react'
import { Alert, Badge, Button, Col, Form, FormFeedback, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row, Spinner, Table } from 'reactstrap'
import { formatDate } from '../../../utility/DateFormatter'
import { CheckSquare, Trash2 } from 'react-feather'
import { Controller, useForm } from 'react-hook-form'
import Select from 'react-select'
import { selectThemeColors } from '@utils'
import { useDispatch, useSelector } from 'react-redux'
import { setCoursePaymentsNotDone, setCourseReserveList } from '../../../redux/courseDetailSlice'
import { changeCourseReserve, deleteCourseReserve } from '../../../@core/services/courses'
import toast from 'react-hot-toast'
const Reserve = ({ courseId, courseReserveList, courseGroups }) => {
    let notAccepted = courseReserveList.filter((r) => (r.accept === false))
    const [buttonLoading, setButtonLoading] = useState(false)
    const [studentId, setStudentId] = useState(null)
    const [reserveId, setReserveId] = useState(null)
    const [reserve, setReserve] = useState(false)
    const [deleteModal, setDeleteModal] = useState(false)
    const [studentName, setStudentName] = useState(null)
    const {coursePaymentsNotDone} = useSelector((state)=>state.courseDetails)
    const dispatch = useDispatch()
    const groups = courseGroups.map((item) => ({ value: item.groupId, label: item.groupName }))
    const {
        control,
        handleSubmit,
        formState: { errors }
    } = useForm()
    const updateReserveList = (array, reservId) => {
        return array.map(item =>
            item.reserveId === reservId
                ? { ...item, accept: true }
                : item
        )
    }

    const handleOpenReserveModal = (studentId, studentName, reserveId) => {
        console.log(studentName)
        setStudentId(studentId);
        setStudentName(studentName);
        setReserveId(reserveId);
        setReserve(true);
    };
    const onSubmit = async (data) => {
        try {
            const reserveInfo = { studentName: studentName, groupName: data.courseGroups.label }
            setButtonLoading(true)
            await changeCourseReserve(courseId, data.courseGroups.value, studentId)
            const newReserveList = updateReserveList(courseReserveList, reserveId)
            dispatch(setCourseReserveList(newReserveList))
            dispatch(setCoursePaymentsNotDone([reserveInfo,...coursePaymentsNotDone]))
            setButtonLoading(false)
            setReserve(false)
        }
        catch {
            setButtonLoading(false)
            setReserve(false)
        }
    }

    const handleDelete = async () => {
        try {
            setButtonLoading(true)
            await deleteCourseReserve(reserveId)
            const newReserveList = courseReserveList.filter((r) => (r.reserveId !== reserveId))
            dispatch(setCourseReserveList(newReserveList))
            setButtonLoading(false)
            setDeleteModal(false)
        }
        catch {
            setButtonLoading(false)
            setDeleteModal(false)
        }
    }
    return (

        <>
            {
                notAccepted?.length > 0 ? <Table responsive>
                    <thead>
                        <tr>
                            <th>نام دانشجو</th>
                            <th> تاریخ رزور</th>
                            <th>وضعیت</th>
                            <th>تغییر وضعیت</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            notAccepted.map((item) => (
                                <tr>
                                    <td>{item.studentName == null ? 'بدون نام' :item.studentName }</td>
                                    <td>{formatDate(item.reserverDate)}</td>
                                    <td>{item.accept == false && <Badge color='warning'>تایید نشده</Badge>}</td>
                                    <td>
                                        <CheckSquare className='cursor-pointer me-1' onClick={() => { handleOpenReserveModal(item.studentId, item.studentName, item.reserveId) }} />
                                        <Trash2 className='cursor-pointer ' onClick={() => { setDeleteModal(true); setReserveId(item.reserveId) }} />
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table> : <Alert className='text-center p-1' color='warning' style={{ fontSize: '20px' }}>کسی رزرو انجام نداده</Alert>
            }
            {/* Reserve Modal */}
            <Modal isOpen={reserve} toggle={() => setReserve(!reserve)} className='modal-dialog-centered'>
                <ModalHeader toggle={() => setReserve(!reserve)}>انتخاب گروه و تایید رزرو</ModalHeader>
                <ModalBody>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Row>
                            <Col md='12' className='mb-1'>
                                <Label className='form-label' for='courseGroups'>
                                    گروه ها
                                </Label>
                                <Controller
                                    name="courseGroups"
                                    control={control}
                                    render={({ field, fieldState: { error } }) => (
                                        <>
                                            <Select
                                                {...field}
                                                value={field.value}
                                                theme={selectThemeColors}
                                                isClearable={false}
                                                id="courseGroups"
                                                className={`react-select ${error ? 'is-invalid' : ''}`}
                                                classNamePrefix='select'
                                                options={groups}
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
                            <Button color='danger ' onClick={() => setReserve(!reserve)}>
                                خیر
                            </Button>
                        </ModalFooter>
                    </Form>
                </ModalBody>

            </Modal>


            {/* Delete Modal */}
            <Modal isOpen={deleteModal} toggle={() => setDeleteModal(!deleteModal)} className='modal-dialog-centered'>
                <ModalHeader toggle={() => setDeleteModal(!deleteModal)}>حذف رزرو</ModalHeader>
                <ModalBody>
                    آیا برای حذف این رزرو مطمعن هستید؟
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

export default Reserve