import React, { useEffect, useState } from 'react'
import { Edit } from 'react-feather'
import { Alert, Button, Col, Form, FormFeedback, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row, Spinner, Table } from 'reactstrap'
import Flatpickr from 'react-flatpickr'
import { formatDate } from './../../utility/DateFormatter'
import ReactPaginate from 'react-paginate'
import { Controller, useForm } from 'react-hook-form'
import { buildingStatus, createBuildings, editBuildings } from '../../@core/services/courses'
import { formatLocalDate } from '../../utility/LocalDate'
import { useDispatch, useSelector } from 'react-redux'
import { setActiveBuildings, setNotActiveBuildings } from '../../redux/coursesSlice'

const DataTable = ({ active_Buildings = false, data = [] }) => {
    const [addModal, setAddModal] = useState(false)
    const [buttonLoading, setButtonLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(0)
    const [editModal, setEditModal] = useState(false)
    const [statusModal, setStatusModal] = useState(false)
    const [selectedItem, setSelectedItem] = useState(null)
    const [statusItem, setStatusItem] = useState({})
    const itemsPerPage = 5
    const { activeBuildings, notActiveBuildings } = useSelector((state) => state.courses)
    const [status, setStatus] = useState(false)
    const dispatch = useDispatch()
    const pageCount = Math.ceil(data.length / itemsPerPage)
    const currentAccepted = data.slice(
        currentPage * itemsPerPage,
        (currentPage + 1) * itemsPerPage
    )

    const handlePagination = ({ selected }) => {
        setCurrentPage(selected)
    }

    useEffect(() => {
        const newPageCount = Math.ceil(data.length / itemsPerPage)
        if (currentPage >= newPageCount && newPageCount > 0) {
            setCurrentPage(newPageCount - 1)
        } else if (newPageCount === 0) {
            setCurrentPage(0)
        }
    }, [data, currentPage, itemsPerPage])


    const {
        control: addControl,
        handleSubmit: handleAddSubmit,
        formState: { errors: addErrors },
        reset: resetAdd
    } = useForm({
        defaultValues: {
            buildingName: '',
            floor: '',
            latitude: '',
            longitude: '',
            wData: null
        },
        mode: 'onChange',
        resolver: async (data) => {
            const errors = {}
            if (!data.buildingName) errors.buildingName = { message: 'نام ساختمان الزامی است' }
            if (!data.floor) errors.floor = { message: 'طبقه الزامی است' }
            if (!data.latitude) errors.latitude = { message: 'عرض جغرافیایی الزامی است' }
            if (!data.longitude) errors.longitude = { message: 'طول جغرافیایی الزامی است' }
            if (!data.wData) errors.wData = { message: 'تاریخ کار الزامی است' }
            return { values: data, errors }
        }
    })


    const {
        control: editControl,
        handleSubmit: handleEditSubmit,
        formState: { errors: editErrors },
        reset: resetEdit
    } = useForm({
        defaultValues: {
            editBuildingName: '',
            editFloor: '',
            editLatitude: '',
            editLongitude: '',
            editWData: null
        },
        mode: 'onChange',
        resolver: async (data) => {
            const errors = {}
            if (!data.editBuildingName) errors.editBuildingName = { message: 'نام ساختمان الزامی است' }
            if (!data.editFloor) errors.editFloor = { message: 'طبقه الزامی است' }
            if (!data.editLatitude) errors.editLatitude = { message: 'عرض جغرافیایی الزامی است' }
            if (!data.editLongitude) errors.editLongitude = { message: 'طول جغرافیایی الزامی است' }
            if (!data.editWData) errors.editWData = { message: 'تاریخ کار الزامی است' }
            return { values: data, errors }
        }
    })

    const onSubmit = async (data) => {
        try {
            setButtonLoading(true)
            const { id } = await createBuildings(data.buildingName, formatLocalDate(data.wData), data.floor, data.latitude, data.longitude)
            const newBuilding = {
                active: true,
                id: id,
                buildingName: data.buildingName,
                workDate: formatDate(data.wData),
                floor: data.floor,
                latitude: data.latitude,
                longitude: data.longitude
            }
            dispatch(setActiveBuildings([...activeBuildings, newBuilding]))
            resetAdd()
            setButtonLoading(false)
            setAddModal(false)
        } catch {
            setButtonLoading(false)
            setAddModal(false)
        }
    }


    const handleEditClick = (item) => {
        setSelectedItem(item)
        resetEdit({
            editBuildingName: item.buildingName,
            editFloor: item.floor,
            editLatitude: item.latitude,
            editLongitude: item.longitude,
            editWData: item.workDate ? new Date(item.workDate) : null
        })
        setEditModal(true)
    }


    const update_Buildings = (array, buildId, params) => {
        return array.map(item =>
            item.id === buildId
                ? { ...item, buildingName: params.buildingName, workDate: params.workDate, floor: params.floor, latitude: params.latitude, longitude: params.longitude, active: params.active }
                : item
        )
    }

    const editData = async (modalData) => {
        try {
            setButtonLoading(true)
            const updatedBuilding = {
                id: selectedItem.id,
                buildingName: modalData.editBuildingName,
                workDate: formatLocalDate(modalData.editWData),
                floor: modalData.editFloor,
                latitude: modalData.editLatitude,
                longitude: modalData.editLongitude,
                active: selectedItem.active
            }
            const updated_Build = update_Buildings(data, selectedItem.id, updatedBuilding)
            await editBuildings(updatedBuilding)
            dispatch(setActiveBuildings(updated_Build))
            resetEdit()
            setButtonLoading(false)
            setEditModal(false)
            setSelectedItem(null)
        } catch {
            setButtonLoading(false)
            setEditModal(false)
            setSelectedItem(null)
        }
    }

    const changeStatus = async () => {
        try {
            setButtonLoading(true)
            if (status) {
                await buildingStatus(statusItem.id, false)
                dispatch(setActiveBuildings(activeBuildings.filter((b) => b.id !== statusItem.id)))
                const removedItem = {
                    active: false,
                    id: statusItem.id,
                    buildingName: statusItem.buildingName,
                    workDate: statusItem.workDate,
                    floor: statusItem.floor,
                    latitude: statusItem.latitude,
                    longitude: statusItem.longitude
                }
                dispatch(setNotActiveBuildings([removedItem, ...notActiveBuildings]))
            }
            else {
                await buildingStatus(statusItem.id, true)
                const removedItem = {
                    active: true,
                    id: statusItem.id,
                    buildingName: statusItem.buildingName,
                    workDate: statusItem.workDate,
                    floor: statusItem.floor,
                    latitude: statusItem.latitude,
                    longitude: statusItem.longitude
                }
                dispatch(setActiveBuildings([removedItem, ...activeBuildings]))
                dispatch(setNotActiveBuildings(notActiveBuildings.filter((b) => b.id !== statusItem.id)))
            }
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
            {active_Buildings && <Button className='mb-2' color='success' onClick={() => setAddModal(true)}>ایجاد ساختمان</Button>}
            {currentAccepted.length > 0 ?
                <>
                    <Table responsive>
                        <thead>
                            <tr>
                                <th>نام ساختمان</th>
                                <th>طبقه</th>
                                <th>تاریخ کار</th>
                                <th>عرض جغرافیایی</th>
                                <th>طول جغرافیایی</th>
                                <th>وضعیت</th>
                                {active_Buildings && <th>ویرایش</th>}
                            </tr>
                        </thead>
                        <tbody>
                            {currentAccepted.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.buildingName}</td>
                                    <td>{item.floor}</td>
                                    <td>{formatDate(item.workDate)}</td>
                                    <td>{item.latitude}</td>
                                    <td>{item.longitude}</td>
                                    <td>
                                        {item.active ?
                                            <Button color='primary' onClick={() => { setStatusModal(true); setStatus(true); setStatusItem(item) }}>فعال</Button>
                                            :
                                            <Button color='warning' onClick={() => { setStatusModal(true); setStatus(false); setStatusItem(item) }}>غیر فعال</Button>
                                        }
                                    </td>
                                    {active_Buildings && (
                                        <td>
                                            <Edit className='cursor-pointer' onClick={() => handleEditClick(item)} />
                                        </td>
                                    )}
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
                : <Alert color='warning' className='p-1 text-center' style={{ fontWeight: 'bold', fontSize: '20px' }} >موردی یافت نشد</Alert>
            }

            {/* Add New Build */}
            <Modal isOpen={addModal} toggle={() => setAddModal(!addModal)} className='modal-dialog-centered modal-lg'>
                <ModalHeader toggle={() => setAddModal(!addModal)}>ایجاد ساختمان جدید</ModalHeader>
                <ModalBody>
                    <Form onSubmit={handleAddSubmit(onSubmit)}>
                        <Row>
                            <Col md='6' className='mb-1'>
                                <Label className='form-label' for='buildingName'>
                                    نام ساختمان
                                </Label>
                                <Controller
                                    id='buildingName'
                                    name='buildingName'
                                    control={addControl}
                                    render={({ field }) => <Input placeholder='نام ساختمان را بنویسید' invalid={addErrors.buildingName && true} {...field} />}
                                />
                                {addErrors.buildingName && <FormFeedback>{addErrors.buildingName.message}</FormFeedback>}
                            </Col>

                            <Col md='6' className='mb-1'>
                                <Label className='form-label' for='floor'>
                                    طبقه
                                </Label>
                                <Controller
                                    id='floor'
                                    name='floor'
                                    control={addControl}
                                    render={({ field }) => <Input placeholder='توضیحات کار را بنویسید' invalid={addErrors.floor && true} {...field} />}
                                />
                                {addErrors.floor && <FormFeedback>{addErrors.floor.message}</FormFeedback>}
                            </Col>

                            <Col md='6' className='mb-1'>
                                <Label className='form-label' for='latitude'>
                                    عرض جغرافیایی
                                </Label>
                                <Controller
                                    id='latitude'
                                    name='latitude'
                                    control={addControl}
                                    render={({ field }) => <Input placeholder='توضیحات کار را بنویسید' invalid={addErrors.latitude && true} {...field} />}
                                />
                                {addErrors.latitude && <FormFeedback>{addErrors.latitude.message}</FormFeedback>}
                            </Col>

                            <Col md='6' className='mb-1'>
                                <Label className='form-label' for='longitude'>
                                    طول جغرافیایی
                                </Label>
                                <Controller
                                    id='longitude'
                                    name='longitude'
                                    control={addControl}
                                    render={({ field }) => <Input placeholder='توضیحات کار را بنویسید' invalid={addErrors.longitude && true} {...field} />}
                                />
                                {addErrors.longitude && <FormFeedback>{addErrors.longitude.message}</FormFeedback>}
                            </Col>

                            <Col md='12' className='mb-1'>
                                <Label className='form-label' for='wData'>
                                    تاریخ کار
                                </Label>
                                <Controller
                                    name='wData'
                                    control={addControl}
                                    render={({ field, fieldState: { error } }) => (
                                        <>
                                            <Flatpickr
                                                className={`form-control ${error ? 'is-invalid' : ''}`}
                                                value={field.value}
                                                onChange={(date) => field.onChange(date[0])}
                                                id='wData'
                                                placeholder='انتخاب تاریخ'
                                                options={{
                                                    dateFormat: 'Y-m-d',
                                                    locale: 'fa',
                                                    appendTo: document.body
                                                }}
                                            />
                                            {error && <FormFeedback style={{ display: 'block' }}>{error.message}</FormFeedback>}
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

            {/* Edit Building */}
            <Modal isOpen={editModal} toggle={() => setEditModal(!editModal)} className='modal-dialog-centered modal-lg'>
                <ModalHeader toggle={() => setEditModal(!editModal)}>ویرایش ساختمان</ModalHeader>
                <ModalBody>
                    <Form onSubmit={handleEditSubmit(editData)}>
                        <Row>
                            <Col md='6' className='mb-1'>
                                <Label className='form-label' for='editBuildingName'>
                                    نام ساختمان
                                </Label>
                                <Controller
                                    id='editBuildingName'
                                    name='editBuildingName'
                                    control={editControl}
                                    render={({ field }) => <Input placeholder='نام ساختمان را بنویسید' invalid={editErrors.editBuildingName && true} {...field} />}
                                />
                                {editErrors.editBuildingName && <FormFeedback>{editErrors.editBuildingName.message}</FormFeedback>}
                            </Col>

                            <Col md='6' className='mb-1'>
                                <Label className='form-label' for='editFloor'>
                                    طبقه
                                </Label>
                                <Controller
                                    id='editFloor'
                                    name='editFloor'
                                    control={editControl}
                                    render={({ field }) => <Input placeholder='توضیحات کار را بنویسید' invalid={editErrors.editFloor && true} {...field} />}
                                />
                                {editErrors.editFloor && <FormFeedback>{editErrors.editFloor.message}</FormFeedback>}
                            </Col>

                            <Col md='6' className='mb-1'>
                                <Label className='form-label' for='editLatitude'>
                                    عرض جغرافیایی
                                </Label>
                                <Controller
                                    id='editLatitude'
                                    name='editLatitude'
                                    control={editControl}
                                    render={({ field }) => <Input placeholder='توضیحات کار را بنویسید' invalid={editErrors.editLatitude && true} {...field} />}
                                />
                                {editErrors.editLatitude && <FormFeedback>{editErrors.editLatitude.message}</FormFeedback>}
                            </Col>

                            <Col md='6' className='mb-1'>
                                <Label className='form-label' for='editLongitude'>
                                    طول جغرافیایی
                                </Label>
                                <Controller
                                    id='editLongitude'
                                    name='editLongitude'
                                    control={editControl}
                                    render={({ field }) => <Input placeholder='توضیحات کار را بنویسید' invalid={editErrors.editLongitude && true} {...field} />}
                                />
                                {editErrors.editLongitude && <FormFeedback>{editErrors.editLongitude.message}</FormFeedback>}
                            </Col>

                            <Col md='12' className='mb-1'>
                                <Label className='form-label' for='editWData'>
                                    تاریخ کار
                                </Label>
                                <Controller
                                    name='editWData'
                                    control={editControl}
                                    render={({ field, fieldState: { error } }) => (
                                        <>
                                            <Flatpickr
                                                className={`form-control ${error ? 'is-invalid' : ''}`}
                                                value={field.value}
                                                onChange={(date) => field.onChange(date[0])}
                                                id='editWData'
                                                placeholder='انتخاب تاریخ'
                                                options={{
                                                    dateFormat: 'Y-m-d',
                                                    locale: 'fa',
                                                    appendTo: document.body
                                                }}
                                            />
                                            {error && <FormFeedback style={{ display: 'block' }}>{error.message}</FormFeedback>}
                                        </>
                                    )}
                                />
                            </Col>
                        </Row>
                        <ModalFooter className='justify-content-start'>
                            <Button color='primary' type='submit' disabled={buttonLoading}>
                                {buttonLoading ? <Spinner size='sm' /> : 'به‌روزرسانی'}
                            </Button>
                            <Button color='danger' onClick={() => setEditModal(!editModal)}>
                                بستن
                            </Button>
                        </ModalFooter>
                    </Form>
                </ModalBody>
            </Modal>


            {/* Change Status Modal */}
            <Modal isOpen={statusModal} toggle={() => setStatusModal(!statusModal)} className='modal-dialog-centered '>
                <ModalHeader toggle={() => setStatusModal(!statusModal)}>تغییر وضعیت</ModalHeader>
                <ModalBody>
                    <p>آیا برای تغییر وضعیت مطمعن هستید؟</p>
                    <ModalFooter className='justify-content-start'>
                        <Button color='primary' onClick={changeStatus} disabled={buttonLoading}>
                            {buttonLoading ? <Spinner size='sm' /> : 'بله'}
                        </Button>
                        <Button color='danger' onClick={() => setStatusModal(!statusModal)}>
                            خیر
                        </Button>
                    </ModalFooter>
                </ModalBody>
            </Modal>


        </>
    )
}

export default DataTable