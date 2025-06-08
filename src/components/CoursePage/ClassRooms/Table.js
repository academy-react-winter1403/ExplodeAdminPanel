import React, { useEffect, useState } from 'react'
import { Edit } from 'react-feather'
import ReactPaginate from 'react-paginate'
import { useDispatch, useSelector } from 'react-redux'
import { Alert, Button, Col, Form, FormFeedback, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row, Spinner, Table } from 'reactstrap'
import { formatDate } from './../../../utility/DateFormatter';
import { Controller, useForm } from 'react-hook-form'
import Select from 'react-select'
import { selectThemeColors } from '@utils'
import { createClassRoom, editClassRoom } from '../../../@core/services/courses'
import { setClassRooms } from '../../../redux/coursesSlice'

const ClassRoomsTable = () => {
    const { classRoomsList, activeBuildings } = useSelector((state) => state.courses)
    const dispatch = useDispatch()
    const [addModal, setAddModal] = useState(false)
    const [editModal, setEditModal] = useState(false)
    const [selectedClassRoom, setSelectedClassRoom] = useState(null)
    const [buttonLoading, setButtonLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(0)
    const itemsPerPage = 10
    const pageCount = Math.ceil(classRoomsList.length / itemsPerPage)
    const currentAccepted = classRoomsList.slice(
        currentPage * itemsPerPage,
        (currentPage + 1) * itemsPerPage
    )

    const handlePagination = ({ selected }) => {
        setCurrentPage(selected)
    }

    useEffect(() => {
        const newPageCount = Math.ceil(classRoomsList.length / itemsPerPage)
        if (currentPage >= newPageCount && newPageCount > 0) {
            setCurrentPage(newPageCount - 1)
        } else if (newPageCount === 0) {
            setCurrentPage(0)
        }
    }, [classRoomsList, currentPage, itemsPerPage])

    const {
        control: addControl,
        handleSubmit: handleAddSubmit,
        formState: { errors: addErrors },
        reset: resetAdd
    } = useForm({
        defaultValues: {
            className: '',
            capacity: '',
            building: null
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

    const defaultBuildings = activeBuildings?.map((item) => ({ value: item.id, label: item.buildingName }))

    const onSubmit = async (data) => {
        const classRoomData = {
            classRoomName: data.className,
            capacity: data.capacity,
            buildingId: data.building?.value
        }
        try {
            setButtonLoading(true)
            const { id } = await createClassRoom(classRoomData)
            const newClassRoom = {
                id: id,
                classRoomName: data.className,
                capacity: data.capacity,
                buildingId: data.building?.value,
                buildingName: data.building?.label,
            }
            dispatch(setClassRooms([...classRoomsList, newClassRoom]))
            setButtonLoading(false)
            setAddModal(false)
            resetAdd()
        } catch {
            setButtonLoading(false)
            setAddModal(false)
        }
    }

    const onEditSubmit = async (data) => {
        const editClassRoomData = {
            id: selectedClassRoom?.id,
            classRoomName: data.className,
            capacity: data.capacity,
            buildingId: data.building?.value
        }
        try {
            setButtonLoading(true)
            await editClassRoom(editClassRoomData)
            const updatedClassRoom = {
                id: selectedClassRoom?.id,
                classRoomName: data.className,
                capacity: data.capacity,
                buildingId: data.building?.value,
                buildingName: data.building?.label
            }
            const updatedList = classRoomsList.map(item =>
                item.id === selectedClassRoom?.id ? updatedClassRoom : item
            )
            dispatch(setClassRooms(updatedList))
            setButtonLoading(false)
            setEditModal(false)
        }
        catch {
            setButtonLoading(false)
            setEditModal(false)
        }
    }

    const handleEditClick = (classRoom) => {
        setSelectedClassRoom(classRoom)
        setEditValue('className', classRoom.classRoomName)
        setEditValue('capacity', classRoom.capacity)
        setEditValue('building', defaultBuildings.find(b => b.value === classRoom.buildingId))
        setEditModal(true)
    }

    return (
        <>
            <Button color='success' className='mb-2' onClick={() => { setAddModal(true) }}>ایجاد یک کلاس</Button>
            {
                currentAccepted?.length > 0 ?
                    <>
                        <Table responsive>
                            <thead>
                                <tr>
                                    <th>نام کلاس</th>
                                    <th>گنجایش کلاس</th>
                                    <th>نام ساختمان</th>
                                    <th>ویرایش</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    currentAccepted?.map((item) => (
                                        <tr key={item.id}>
                                            <td>{item.classRoomName}</td>
                                            <td>{item.capacity}</td>
                                            <td>{item.buildingName}</td>
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
                <ModalHeader toggle={() => setAddModal(!addModal)}>ایجاد کلاس جدید</ModalHeader>
                <ModalBody>
                    <Form onSubmit={handleAddSubmit(onSubmit)}>
                        <Row>
                            <Col md='12' className='mb-1'>
                                <Label className='form-label' for='className'>
                                    نام کلاس <span style={{ color: 'red' }}>*</span>
                                </Label>
                                <Controller
                                    id='className'
                                    name='className'
                                    control={addControl}
                                    rules={{ required: 'نام کلاس الزامی است' }}
                                    render={({ field }) => (
                                        <Input
                                            placeholder='نام کلاس را بنویسید'
                                            invalid={!!addErrors.className}
                                            {...field}
                                        />
                                    )}
                                />
                                {addErrors.className && <FormFeedback>{addErrors.className.message}</FormFeedback>}
                            </Col>

                            <Col md='12' className='mb-1'>
                                <Label className='form-label' for='capacity'>
                                    گنجایش کلاس <span style={{ color: 'red' }}>*</span>
                                </Label>
                                <Controller
                                    id='capacity'
                                    name='capacity'
                                    control={addControl}
                                    rules={{
                                        required: 'گنجایش کلاس الزامی است',
                                        pattern: {
                                            value: /^[0-9]+$/,
                                            message: 'گنجایش باید یک عدد باشد'
                                        }
                                    }}
                                    render={({ field }) => (
                                        <Input
                                            placeholder='گنجایش کلاس را بنویسید'
                                            invalid={!!addErrors.capacity}
                                            {...field}
                                        />
                                    )}
                                />
                                {addErrors.capacity && <FormFeedback>{addErrors.capacity.message}</FormFeedback>}
                            </Col>

                            <Col md='12' className='mb-1'>
                                <Label className='form-label' for='building'>
                                    ساختمان کلاس <span style={{ color: 'red' }}>*</span>
                                </Label>
                                <Controller
                                    name="building"
                                    control={addControl}
                                    rules={{ required: 'انتخاب ساختمان الزامی است' }}
                                    render={({ field, fieldState: { error } }) => (
                                        <>
                                            <Select
                                                {...field}
                                                value={field.value}
                                                theme={selectThemeColors}
                                                isClearable={false}
                                                id="building"
                                                className={`react-select ${error ? 'is-invalid' : ''}`}
                                                classNamePrefix='select'
                                                options={defaultBuildings}
                                                placeholder="ساختمان کلاس را انتخاب کنید"
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

            {/* Edit ClassRoom */}
            <Modal isOpen={editModal} toggle={() => setEditModal(!editModal)} className='modal-dialog-centered'>
                <ModalHeader toggle={() => setEditModal(!editModal)}>ویرایش کلاس</ModalHeader>
                <ModalBody>
                    <Form onSubmit={handleEditSubmit(onEditSubmit)}>
                        <Row>
                            <Col md='12' className='mb-1'>
                                <Label className='form-label' for='editClassName'>
                                    نام کلاس <span style={{ color: 'red' }}>*</span>
                                </Label>
                                <Controller
                                    id='editClassName'
                                    name='className'
                                    control={editControl}
                                    rules={{ required: 'نام کلاس الزامی است' }}
                                    render={({ field }) => (
                                        <Input
                                            placeholder='نام کلاس را بنویسید'
                                            invalid={!!editErrors.className}
                                            {...field}
                                        />
                                    )}
                                />
                                {editErrors.className && <FormFeedback>{editErrors.className.message}</FormFeedback>}
                            </Col>

                            <Col md='12' className='mb-1'>
                                <Label className='form-label' for='editCapacity'>
                                    گنجایش کلاس <span style={{ color: 'red' }}>*</span>
                                </Label>
                                <Controller
                                    id='editCapacity'
                                    name='capacity'
                                    control={editControl}
                                    rules={{
                                        required: 'گنجایش کلاس الزامی است',
                                        pattern: {
                                            value: /^[0-9]+$/,
                                            message: 'گنجایش باید یک عدد باشد'
                                        }
                                    }}
                                    render={({ field }) => (
                                        <Input
                                            placeholder='گنجایش کلاس را بنویسید'
                                            invalid={!!editErrors.capacity}
                                            {...field}
                                        />
                                    )}
                                />
                                {editErrors.capacity && <FormFeedback>{editErrors.capacity.message}</FormFeedback>}
                            </Col>

                            <Col md='12' className='mb-1'>
                                <Label className='form-label' for='editBuilding'>
                                    ساختمان کلاس <span style={{ color: 'red' }}>*</span>
                                </Label>
                                <Controller
                                    name="building"
                                    control={editControl}
                                    rules={{ required: 'انتخاب ساختمان الزامی است' }}
                                    render={({ field, fieldState: { error } }) => (
                                        <>
                                            <Select
                                                {...field}
                                                value={field.value}
                                                theme={selectThemeColors}
                                                isClearable={false}
                                                id="editBuilding"
                                                className={`react-select ${error ? 'is-invalid' : ''}`}
                                                classNamePrefix='select'
                                                options={defaultBuildings}
                                                placeholder="ساختمان کلاس را انتخاب کنید"
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

export default ClassRoomsTable