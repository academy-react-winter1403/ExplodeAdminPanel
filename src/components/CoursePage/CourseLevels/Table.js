import React, { useEffect, useState } from 'react'
import { Edit } from 'react-feather'
import ReactPaginate from 'react-paginate'
import { useDispatch, useSelector } from 'react-redux'
import { Alert, Button, Col, Form, FormFeedback, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row, Spinner, Table } from 'reactstrap'
import { Controller, useForm } from 'react-hook-form'
import { createCourseLevel, editCourseLevel } from '../../../@core/services/courses'
import { setCourseLevels } from '../../../redux/coursesSlice'

const CourseLevelTable = () => {
    const { courseLevelsList } = useSelector((state) => state.courses)
    const dispatch = useDispatch()
    const [addModal, setAddModal] = useState(false)
    const [editModal, setEditModal] = useState(false)
    const [selectedData, setSelectedData] = useState(null)
    const [buttonLoading, setButtonLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(0)
    const itemsPerPage = 10
    const pageCount = Math.ceil(courseLevelsList.length / itemsPerPage)
    const currentAccepted = courseLevelsList.slice(
        currentPage * itemsPerPage,
        (currentPage + 1) * itemsPerPage
    )

    const handlePagination = ({ selected }) => {
        setCurrentPage(selected)
    }

    useEffect(() => {
        const newPageCount = Math.ceil(courseLevelsList.length / itemsPerPage)
        if (currentPage >= newPageCount && newPageCount > 0) {
            setCurrentPage(newPageCount - 1)
        } else if (newPageCount === 0) {
            setCurrentPage(0)
        }
    }, [courseLevelsList, currentPage, itemsPerPage])

    const {
        control: addControl,
        handleSubmit: handleAddSubmit,
        formState: { errors: addErrors },
        reset: resetAdd
    } = useForm({
        defaultValues: {
            levelName: '',
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
        const levelData = {
            levelName: data.levelName,
        }
        try {
            setButtonLoading(true)
            const { id } = await createCourseLevel(levelData)
            const newLevel = {
                id: id,
                levelName: data.levelName,
            }
            dispatch(setCourseLevels([...courseLevelsList, newLevel]))
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
            levelName: data.levelName,
        }
        try {
            setButtonLoading(true)
            await editCourseLevel(editData)
            const updatedLevel = {
                id: selectedData?.id,
                levelName: data.levelName,
            }
            const updatedList = courseLevelsList.map(item =>
                item.id === selectedData?.id ? updatedLevel : item
            )
            dispatch(setCourseLevels(updatedList))
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
        setEditValue('levelName', item.levelName)
        setEditModal(true)
    }

    return (
        <>
            <Button color='success' className='mb-2' onClick={() => { setAddModal(true) }}>ایجاد سطح جدید</Button>
            {
                currentAccepted?.length > 0 ?
                    <>
                        <Table responsive>
                            <thead>
                                <tr>
                                    <th>شناسه سطح</th>
                                    <th>عنوان سطح</th>
                                    <th>ویرایش</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    currentAccepted?.map((item) => (
                                        <tr key={item.id}>
                                            <td>{item.id}</td>
                                            <td>{item.levelName}</td>
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
                <ModalHeader toggle={() => setAddModal(!addModal)}>ایجاد سطح جدید</ModalHeader>
                <ModalBody>
                    <Form onSubmit={handleAddSubmit(onSubmit)}>
                        <Row>
                            <Col md='12' className='mb-1'>
                                <Label className='form-label' for='levelName'>
                                    سطح کلاس <span style={{ color: 'red' }}>*</span>
                                </Label>
                                <Controller
                                    id='levelName'
                                    name='levelName'
                                    control={addControl}
                                    rules={{ required: 'سطح دوره الزامی است' }}
                                    render={({ field }) => (
                                        <Input
                                            placeholder='سطح دوره را بنویسید'
                                            invalid={!!addErrors.levelName}
                                            {...field}
                                        />
                                    )}
                                />
                                {addErrors.levelName && <FormFeedback>{addErrors.levelName.message}</FormFeedback>}
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
                <ModalHeader toggle={() => setEditModal(!editModal)}>ویرایش سطح دوره</ModalHeader>
                <ModalBody>
                    <Form onSubmit={handleEditSubmit(onEditSubmit)}>
                        <Row>
                            <Col md='12' className='mb-1'>
                                <Label className='form-label' for='levelName'>
                                    سطح کلاس <span style={{ color: 'red' }}>*</span>
                                </Label>
                                <Controller
                                    id='levelName'
                                    name='levelName'
                                    control={editControl}
                                    rules={{ required: 'سطح دوره الزامی است' }}
                                    render={({ field }) => (
                                        <Input
                                            placeholder='سطح دوره را بنویسید'
                                            invalid={!!editErrors.levelName}
                                            {...field}
                                        />
                                    )}
                                />
                                {editErrors.levelName && <FormFeedback>{editErrors.levelName.message}</FormFeedback>}
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

export default CourseLevelTable