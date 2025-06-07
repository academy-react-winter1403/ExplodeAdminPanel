import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllAssisWorks } from '../../../../redux/courseDetailSlice'
import { Alert, Button, Col, Form, FormFeedback, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row, Spinner, Table } from 'reactstrap'
import { Edit } from 'react-feather'
import { formatDate } from '../../../../utility/DateFormatter'
import Flatpickr from 'react-flatpickr'
import { Controller, useForm } from 'react-hook-form'
import { addAssistanceWork, editAssistanceWork } from '../../../../@core/services/courses'
import { formatLocalDate } from '../../../../utility/LocalDate'
import ReactPaginate from 'react-paginate'

const AssisWorksTable = ({ assisId }) => {
    const { assisWorksList } = useSelector((state) => state.courseDetails)
    const [addWorkModal, setAddWorkModal] = useState(false)
    const [editWorkModal, setEditWorkModal] = useState(false)
    const [buttonLoading, setButtonLoading] = useState(false)
    const [selectedWork, setSelectedWork] = useState(null)
    const dispatch = useDispatch()
    const {
        control,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({
        defaultValues: {
            workTitle: '',
            workDescribe: '',
            workDate: null,
            editWorkTitle: '',
            editWorkDescribe: '',
            editWorkDate: null
        },
        mode: 'onChange',
        resolver: async (data) => {
            const errors = {}
            if (!data.workTitle && !editWorkModal) errors.workTitle = { message: 'عنوان کار الزامی است' }
            if (!data.workDescribe && !editWorkModal) errors.workDescribe = { message: 'توضیحات کار الزامی است' }
            if (!data.workDate && !editWorkModal) errors.workDate = { message: 'تاریخ الزامی است' }
            if (!data.editWorkTitle && editWorkModal) errors.editWorkTitle = { message: 'عنوان کار الزامی است' }
            if (!data.editWorkDescribe && editWorkModal) errors.editWorkDescribe = { message: 'توضیحات کار الزامی است' }
            if (!data.editWorkDate && editWorkModal) errors.editWorkDate = { message: 'تاریخ الزامی است' }
            return { values: data, errors }
        }
    })

    useEffect(() => {
        dispatch(fetchAllAssisWorks(assisId))
    }, [assisId])

    const handleEditClick = (work) => {
        setSelectedWork(work)
        reset({
            editWorkTitle: work.worktitle,
            editWorkDescribe: work.workDescribe,
            editWorkDate: new Date(work.workDate)
        })
        setEditWorkModal(true)
    }


    const [currentPage, setCurrentPage] = useState(0)
    const itemsPerPage = 5
    const pageCount = Math.ceil(assisWorksList?.length / itemsPerPage);
    const currentAccepted = assisWorksList?.slice(
        currentPage * itemsPerPage,
        (currentPage + 1) * itemsPerPage
    )
    const handlePagination = ({ selected }) => {
        setCurrentPage(selected)
    }
    useEffect(() => {
        const newPageCount = Math.ceil(assisWorksList?.length / itemsPerPage);
        if (currentPage >= newPageCount && newPageCount > 0) {
            setCurrentPage(newPageCount - 1);
        } else if (newPageCount === 0) {
            setCurrentPage(0);
        }
    }, [assisWorksList, currentPage, itemsPerPage])



    const onSubmit = async (data) => {
        try {
            setButtonLoading(true)
            const localDate = new Date(data.workDate)
            const formattedDate = formatLocalDate(localDate)
            await addAssistanceWork(data.workTitle, data.workDescribe, assisId, formattedDate)
            dispatch(fetchAllAssisWorks(assisId))
            setButtonLoading(false)
            setAddWorkModal(false)
            reset()
        } catch {
            setButtonLoading(false)
            setAddWorkModal(false)
        }
    }

    const onSubmitEdit = async (data) => {
        try {
            setButtonLoading(true)
            const localDate = new Date(data.editWorkDate)
            const formattedDate = formatLocalDate(localDate)
            await editAssistanceWork(data.editWorkTitle, data.editWorkDescribe, assisId, formattedDate, selectedWork.workId)
            dispatch(fetchAllAssisWorks(assisId))
            setButtonLoading(false)
            setEditWorkModal(false)
            reset()
        } catch {
            setButtonLoading(false)
            setEditWorkModal(false)
        }
    }

    return (
        <>
            <Button className='mb-3' color='primary' onClick={() => setAddWorkModal(true)}>اضافه کردن کار جدید</Button>
            {currentAccepted?.length > 0 ? (
                <>
                    <Table>
                        <thead>
                            <tr>
                                <th>عنوان کار</th>
                                <th>توضیحات کار</th>
                                <th>تاریخ انجام</th>
                                <th>امکانات</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentAccepted?.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.worktitle}</td>
                                    <td>{item.workDescribe}</td>
                                    <td>{formatDate(item.workDate)}</td>
                                    <td>
                                        <Edit
                                            className='cursor-pointer'
                                            onClick={() => handleEditClick(item)}
                                        />
                                    </td>
                                </tr>
                            ))}
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

            ) : (
                <Alert
                    color='warning'
                    className='text-center p-1'
                    style={{ fontWeight: 'bold', fontSize: '20px' }}
                >
                    موردی یافت نشد
                </Alert>
            )}




            {/* Add Work */}
            <Modal isOpen={addWorkModal} toggle={() => setAddWorkModal(!addWorkModal)} className='modal-dialog-centered'>
                <ModalHeader toggle={() => setAddWorkModal(!addWorkModal)}>ایجاد کار جدید</ModalHeader>
                <ModalBody>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Row>
                            <Col md='12' className='mb-1'>
                                <Label className='form-label' for='workTitle'>
                                    عنوان کار
                                </Label>
                                <Controller
                                    id='workTitle'
                                    name='workTitle'
                                    control={control}
                                    render={({ field }) => <Input placeholder='عنوان کار را بنویسید' invalid={errors.workTitle && true} {...field} />}
                                />
                                {errors.workTitle && <FormFeedback>{errors.workTitle.message}</FormFeedback>}
                            </Col>

                            <Col md='12' className='mb-1'>
                                <Label className='form-label' for='workDescribe'>
                                    توضیحات کار
                                </Label>
                                <Controller
                                    id='workDescribe'
                                    name='workDescribe'
                                    control={control}
                                    render={({ field }) => <Input type='textarea' placeholder='توضیحات کار را بنویسید' invalid={errors.workDescribe && true} {...field} />}
                                />
                                {errors.workDescribe && <FormFeedback>{errors.workDescribe.message}</FormFeedback>}
                            </Col>

                            <Col md='12' className='mb-1'>
                                <Label className='form-label' for='workDate'>
                                    تاریخ انجام کار
                                </Label>
                                <Controller
                                    name="workDate"
                                    control={control}
                                    render={({ field, fieldState: { error } }) => (
                                        <>
                                            <Flatpickr
                                                className={`form-control ${error ? 'is-invalid' : ''}`}
                                                value={field.value}
                                                onChange={date => field.onChange(date)}
                                                id='workDate'
                                                placeholder="انتخاب تاریخ"
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
                            <Button color='primary' type='submit'>
                                {buttonLoading ? <Spinner /> : 'ایجاد'}
                            </Button>
                            <Button color='danger' onClick={() => setAddWorkModal(!addWorkModal)}>
                                بستن
                            </Button>
                        </ModalFooter>
                    </Form>
                </ModalBody>
            </Modal>

            {/* Edit Work */}
            <Modal isOpen={editWorkModal} toggle={() => setEditWorkModal(!editWorkModal)} className='modal-dialog-centered'>
                <ModalHeader toggle={() => setEditWorkModal(!editWorkModal)}>ویرایش کار</ModalHeader>
                <ModalBody>
                    <Form onSubmit={handleSubmit(onSubmitEdit)}>
                        <Row>
                            <Col md='12' className='mb-1'>
                                <Label className='form-label' for='editWorkTitle'>
                                    عنوان کار
                                </Label>
                                <Controller
                                    id='editWorkTitle'
                                    name='editWorkTitle'
                                    control={control}
                                    render={({ field }) => <Input placeholder='عنوان کار را بنویسید' invalid={errors.editWorkTitle && true} {...field} />}
                                />
                                {errors.editWorkTitle && <FormFeedback>{errors.editWorkTitle.message}</FormFeedback>}
                            </Col>

                            <Col md='12' className='mb-1'>
                                <Label className='form-label' for='editWorkDescribe'>
                                    توضیحات کار
                                </Label>
                                <Controller
                                    id='editWorkDescribe'
                                    name='editWorkDescribe'
                                    control={control}
                                    render={({ field }) => <Input type='textarea' placeholder='توضیحات کار را بنویسید' invalid={errors.editWorkDescribe && true} {...field} />}
                                />
                                {errors.editWorkDescribe && <FormFeedback>{errors.editWorkDescribe.message}</FormFeedback>}
                            </Col>

                            <Col md='12' className='mb-1'>
                                <Label className='form-label' for='editWorkDate'>
                                    تاریخ انجام کار
                                </Label>
                                <Controller
                                    name="editWorkDate"
                                    control={control}
                                    render={({ field, fieldState: { error } }) => (
                                        <>
                                            <Flatpickr
                                                className={`form-control ${error ? 'is-invalid' : ''}`}
                                                value={field.value}
                                                onChange={date => field.onChange(date)}
                                                id='editWorkDate'
                                                placeholder="انتخاب تاریخ"
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
                            <Button color='primary' type='submit'>
                                {buttonLoading ? <Spinner /> : 'ذخیره'}
                            </Button>
                            <Button color='danger' onClick={() => setEditWorkModal(!editWorkModal)}>
                                بستن
                            </Button>
                        </ModalFooter>
                    </Form>
                </ModalBody>
            </Modal>
        </>
    )
}

export default AssisWorksTable