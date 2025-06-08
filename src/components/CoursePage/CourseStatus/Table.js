import React, { useEffect, useState } from 'react'
import { Edit } from 'react-feather'
import ReactPaginate from 'react-paginate'
import { useDispatch, useSelector } from 'react-redux'
import { Alert, Button, Col, Form, FormFeedback, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row, Spinner, Table } from 'reactstrap'
import { Controller, useForm } from 'react-hook-form'
import { createCourseLevel, createStatus, editCourseLevel, editStatus } from '../../../@core/services/courses'
import { fetchAllStatus, setCourseLevels } from '../../../redux/coursesSlice'

const CourseStatusTable = () => {
    const { courseStatusList } = useSelector((state) => state.courses)
    const dispatch = useDispatch()
    const [addModal, setAddModal] = useState(false)
    const [editModal, setEditModal] = useState(false)
    const [selectedData, setSelectedData] = useState(null)
    const [buttonLoading, setButtonLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(0)
    const itemsPerPage = 10
    const pageCount = Math.ceil(courseStatusList.length / itemsPerPage)
    const currentAccepted = courseStatusList.slice(
        currentPage * itemsPerPage,
        (currentPage + 1) * itemsPerPage
    )

    const handlePagination = ({ selected }) => {
        setCurrentPage(selected)
    }

    useEffect(() => {
        const newPageCount = Math.ceil(courseStatusList.length / itemsPerPage)
        if (currentPage >= newPageCount && newPageCount > 0) {
            setCurrentPage(newPageCount - 1)
        } else if (newPageCount === 0) {
            setCurrentPage(0)
        }
    }, [courseStatusList, currentPage, itemsPerPage])

    const {
        control: addControl,
        handleSubmit: handleAddSubmit,
        formState: { errors: addErrors },
        reset: resetAdd
    } = useForm({
        defaultValues: {
            statusName: '',
            describe: '',
            statusNumber: ''
        },
        mode: 'onChange'
    })

    const {
        control: editControl,
        handleSubmit: handleEditSubmit,
        formState: { errors: editErrors },
        reset: resetEdit,
        setValue: setEditValue
    } = useForm({
        defaultValues: {
            className: '',
            capacity: '',
            building: null
        },
        mode: 'onChange'
    })

    const onSubmit = async (data) => {
        const statusData = {
            statusName: data.statusName,
            describe: data.describe,
            statusNumber: data.statusNumber,
        }
        try {
            setButtonLoading(true)
            await createStatus(statusData)
            dispatch(fetchAllStatus())
            setButtonLoading(false)
            setAddModal(false)
            resetAdd()
        } catch {
            setButtonLoading(false)
            setAddModal(false)
        }
    }

    const onEditSubmit = async (data) => {
        const editData = {
            id: selectedData?.id,
            statusName: data.statusName,
            describe: data.describe,
            statusNumber: data.statusNumber,
        }
        try {
            setButtonLoading(true)
            await editStatus(editData)
            dispatch(fetchAllStatus())
            setButtonLoading(false)
            setEditModal(false)
        }
        catch {
            setButtonLoading(false)
            setEditModal(false)
        }
    }

    const handleEditClick = (item) => {
        setSelectedData(item)
        setEditValue('statusName', item.statusName)
        setEditValue('describe', item.describe)
        setEditValue('statusNumber', item.statusNumber)
        setEditModal(true)
    }

    return (
        <>
            <Button color='success' className='mb-2' onClick={() => { setAddModal(true) }}>ایجاد وضعیت جدید</Button>
            {
                currentAccepted?.length > 0 ?
                    <>
                        <Table responsive>
                            <thead>
                                <tr>
                                    <th>عنوان وضعیت</th>
                                    <th>توضیح وضعیت</th>
                                    <th>شماره ی وضعیت</th>
                                    <th>ویرایش</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    currentAccepted?.map((item) => (
                                        <tr key={item.id}>
                                            <td>{item.statusName}</td>
                                            <td>{item.describe}</td>
                                            <td>{item.statusNumber}</td>
                                            <td>
                                                <Edit onClick={() => handleEditClick(item)} style={{ cursor: 'pointer' }} />
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </Table>

                        <ReactPaginate
                            previousLabel={''}
                            nextLabel={''}
                            pageCount={pageCount}
                            onPageChange={handlePagination}
                            forcePage={currentPage}
                            marginPagesDisplayed={1}
                            pageRangeDisplayed={3}
                            activeClassName='active'
                            pageClassName={'page-item'}
                            nextLinkClassName={'page-link'}
                            nextClassName={'page-item next'}
                            previousClassName={'page-item prev'}
                            previousLinkClassName={'page-link'}
                            pageLinkClassName={'page-link'}
                            containerClassName={'pagination react-paginate justify-content-center my-2 pe-1'}
                            breakClassName={'page-item'}
                            breakLinkClassName={'page-link'}
                        />
                    </>
                    : <Alert color='warning' className='p-1' style={{ fontSize: '20px', fontWeight: 'bold' }}>موردی یافت نشد</Alert>
            }

            {/* Add New ClassRoom */}
            <Modal isOpen={addModal} toggle={() => setAddModal(!addModal)} className='modal-dialog-centered'>
                <ModalHeader toggle={() => setAddModal(!addModal)}>ایجاد وضعیت جدید</ModalHeader>
                <ModalBody>
                    <Form onSubmit={handleAddSubmit(onSubmit)}>
                        <Row>
                            <Col md='12' className='mb-1'>
                                <Label className='form-label' for='statusName'>
                                    عنوان وضعیت <span style={{ color: 'red' }}>*</span>
                                </Label>
                                <Controller
                                    id='statusName'
                                    name='statusName'
                                    control={addControl}
                                    rules={{ required: 'سطح دوره الزامی است' }}
                                    render={({ field }) => (
                                        <Input
                                            placeholder='سطح دوره را بنویسید'
                                            invalid={!!addErrors.statusName}
                                            {...field}
                                        />
                                    )}
                                />
                                {addErrors.statusName && <FormFeedback>{addErrors.statusName.message}</FormFeedback>}
                            </Col>

                            <Col md='12' className='mb-1'>
                                <Label className='form-label' for='describe'>
                                    توضیحات وضعیت <span style={{ color: 'red' }}>*</span>
                                </Label>
                                <Controller
                                    id='describe'
                                    name='describe'
                                    control={addControl}
                                    rules={{ required: 'توضیحات وضعیت الزامی است' }}
                                    render={({ field }) => (
                                        <Input
                                            placeholder='توضیحات وضعیت را بنویسید'
                                            invalid={!!addErrors.describe}
                                            {...field}
                                        />
                                    )}
                                />
                                {addErrors.describe && <FormFeedback>{addErrors.describe.message}</FormFeedback>}
                            </Col>

                            <Col md='12' className='mb-1'>
                                <Label className='form-label' for='statusNumber'>
                                    شماره وضعیت <span style={{ color: 'red' }}>*</span>
                                </Label>
                                <Controller
                                    id='statusNumber'
                                    name='statusNumber'
                                    control={addControl}
                                    rules={{ required: 'شماره وضعیت الزامی است' }}
                                    render={({ field }) => (
                                        <Input
                                            placeholder='شماره وضعیت را بنویسید'
                                            invalid={!!addErrors.statusNumber}
                                            {...field}
                                        />
                                    )}
                                />
                                {addErrors.statusNumber && <FormFeedback>{addErrors.statusNumber.message}</FormFeedback>}
                            </Col>
                        </Row>
                        <ModalFooter className='justify-content-start'>
                            <Button color='primary' type='submit' disabled={buttonLoading}>
                                {buttonLoading ? <Spinner size='sm' /> : 'ایجاد'}
                            </Button>
                            <Button color='danger' onClick={() => setAddModal(!addModal)}>
                                بستن
                            </Button>
                        </ModalFooter>
                    </Form>
                </ModalBody>
            </Modal>

            {/* Edit Class Level */}
            <Modal isOpen={editModal} toggle={() => setEditModal(!editModal)} className='modal-dialog-centered'>
                <ModalHeader toggle={() => setEditModal(!editModal)}>ویرایش وضعیت </ModalHeader>
                <ModalBody>
                    <Form onSubmit={handleEditSubmit(onEditSubmit)}>
                        <Row>
                            <Col md='12' className='mb-1'>
                                <Label className='form-label' for='statusName'>
                                    عنوان وضعیت <span style={{ color: 'red' }}>*</span>
                                </Label>
                                <Controller
                                    id='statusName'
                                    name='statusName'
                                    control={editControl}
                                    rules={{ required: 'سطح دوره الزامی است' }}
                                    render={({ field }) => (
                                        <Input
                                            placeholder='سطح دوره را بنویسید'
                                            invalid={!!addErrors.statusName}
                                            {...field}
                                        />
                                    )}
                                />
                                {addErrors.statusName && <FormFeedback>{addErrors.statusName.message}</FormFeedback>}
                            </Col>

                            <Col md='12' className='mb-1'>
                                <Label className='form-label' for='describe'>
                                    توضیحات وضعیت <span style={{ color: 'red' }}>*</span>
                                </Label>
                                <Controller
                                    id='describe'
                                    name='describe'
                                    control={editControl}
                                    rules={{ required: 'توضیحات وضعیت الزامی است' }}
                                    render={({ field }) => (
                                        <Input
                                            placeholder='توضیحات وضعیت را بنویسید'
                                            invalid={!!addErrors.describe}
                                            {...field}
                                        />
                                    )}
                                />
                                {addErrors.describe && <FormFeedback>{addErrors.describe.message}</FormFeedback>}
                            </Col>

                            <Col md='12' className='mb-1'>
                                <Label className='form-label' for='statusNumber'>
                                    شماره وضعیت <span style={{ color: 'red' }}>*</span>
                                </Label>
                                <Controller
                                    id='statusNumber'
                                    name='statusNumber'
                                    control={editControl}
                                    rules={{ required: 'شماره وضعیت الزامی است' }}
                                    render={({ field }) => (
                                        <Input
                                            placeholder='شماره وضعیت را بنویسید'
                                            invalid={!!addErrors.statusNumber}
                                            {...field}
                                        />
                                    )}
                                />
                                {addErrors.statusNumber && <FormFeedback>{addErrors.statusNumber.message}</FormFeedback>}
                            </Col>
                        </Row>
                        <ModalFooter className='justify-content-start'>
                            <Button color='primary' type='submit' disabled={buttonLoading}>
                                {buttonLoading ? <Spinner size='sm' /> : 'ذخیره'}
                            </Button>
                            <Button color='danger' onClick={() => setEditModal(!editModal)}>
                                بستن
                            </Button>
                        </ModalFooter>
                    </Form>
                </ModalBody>
            </Modal>
        </>
    )
}

export default CourseStatusTable