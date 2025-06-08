import React, { useEffect, useState } from 'react'
import { Edit } from 'react-feather'
import ReactPaginate from 'react-paginate'
import { useDispatch, useSelector } from 'react-redux'
import { Alert, Button, Col, Form, FormFeedback, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row, Spinner, Table } from 'reactstrap'
import { Controller, useForm } from 'react-hook-form'
import Select from 'react-select'
import { selectThemeColors } from '@utils'
import { createDepartment, editDepartment } from '../../@core/services/courses'
import { fetchDepartments, setDepartments } from '../../redux/coursesSlice'

const DepartmentsTable = () => {
    const { departmentsList, activeBuildings } = useSelector((state) => state.courses)
    const dispatch = useDispatch()
    const [addModal, setAddModal] = useState(false)
    const [editModal, setEditModal] = useState(false)
    const [selectedData, setSelectedData] = useState(null)
    const [buttonLoading, setButtonLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(0)
    const itemsPerPage = 10
    const pageCount = Math.ceil(departmentsList.length / itemsPerPage)
    const currentAccepted = departmentsList.slice(
        currentPage * itemsPerPage,
        (currentPage + 1) * itemsPerPage
    )

    const handlePagination = ({ selected }) => {
        setCurrentPage(selected)
    }

    useEffect(() => {
        const newPageCount = Math.ceil(departmentsList.length / itemsPerPage)
        if (currentPage >= newPageCount && newPageCount > 0) {
            setCurrentPage(newPageCount - 1)
        } else if (newPageCount === 0) {
            setCurrentPage(0)
        }
    }, [departmentsList, currentPage, itemsPerPage])

    const {
        control: addControl,
        handleSubmit: handleAddSubmit,
        formState: { errors: addErrors },
        reset: resetAdd
    } = useForm({
        defaultValues: {
            depName: '',
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
            depName: '',
            building: null
        },
        mode: 'onChange'
    })

    const defaultBuildings = activeBuildings?.map((item) => ({ value: item.id, label: item.buildingName }))

    const onSubmit = async (data) => {
        const departmentData = {
            depName: data.depName,
            buildingId: data.building?.value
        }
        try {
            setButtonLoading(true)
            const { id } = await createDepartment(departmentData)
            dispatch(fetchDepartments())
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
            depName: data.depName,
            buildingId: data.building?.value
        }
        try {
            setButtonLoading(true)
            await editDepartment(editData)
            const updatedDepartment = {
                id: selectedData?.id,
                depName: data.depName,
                buildingName: data.building?.label,
                buildingId: data.building?.value,
            }
            const updatedList = departmentsList.map(item =>
                item.id === selectedData?.id ? updatedDepartment : item
            )
            dispatch(setDepartments(updatedList))
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
        setEditValue('depName', item.depName)
        setEditValue('building', defaultBuildings.find(b => b.value === item.buildingId))
        setEditModal(true)
    }

    return (
        <>
            <Button color='success' className='mb-2' onClick={() => { setAddModal(true) }}>ایجاد دپارتمان</Button>
            {
                currentAccepted?.length > 0 ?
                    <>
                        <Table responsive>
                            <thead>
                                <tr>
                                    <th>نام دپارتمان</th>
                                    <th>نام ساختمان</th>
                                    <th>ویرایش</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    currentAccepted?.map((item) => (
                                        <tr key={item.id}>
                                            <td>{item.depName}</td>
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
                <ModalHeader toggle={() => setAddModal(!addModal)}>ایجاد دپارتمان جدید</ModalHeader>
                <ModalBody>
                    <Form onSubmit={handleAddSubmit(onSubmit)}>
                        <Row>
                            <Col md='12' className='mb-1'>
                                <Label className='form-label' for='depName'>
                                    نام دپارتمان <span style={{ color: 'red' }}>*</span>
                                </Label>
                                <Controller
                                    id='depName'
                                    name='depName'
                                    control={addControl} 
                                    rules={{ required: 'نام دپارتمان الزامی است' }}
                                    render={({ field }) => (
                                        <Input
                                            placeholder='نام دپارتمان را بنویسید'
                                            invalid={!!addErrors.depName} 
                                            {...field}
                                        />
                                    )}
                                />
                                {addErrors.depName && <FormFeedback>{addErrors.depName.message}</FormFeedback>} 
                            </Col>

                            <Col md='12' className='mb-1'>
                                <Label className='form-label' for='building'>
                                    ساختمان  <span style={{ color: 'red' }}>*</span>
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
                                                placeholder="ساختمان  را انتخاب کنید"
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
                <ModalHeader toggle={() => setEditModal(!editModal)}>ویرایش دپارتمان</ModalHeader>
                <ModalBody>
                    <Form onSubmit={handleEditSubmit(onEditSubmit)}>
                        <Row>
                            <Col md='12' className='mb-1'>
                                <Label className='form-label' for='depName'>
                                    نام دپارتمان <span style={{ color: 'red' }}>*</span>
                                </Label>
                                <Controller
                                    id='depName'
                                    name='depName'
                                    control={editControl}
                                    rules={{ required: 'نام دپارتمان الزامی است' }}
                                    render={({ field }) => (
                                        <Input
                                            placeholder='نام دپارتمان را بنویسید'
                                            invalid={!!editErrors.depName}
                                            {...field}
                                        />
                                    )}
                                />
                                {editErrors.depName && <FormFeedback>{editErrors.depName.message}</FormFeedback>}
                            </Col>

                            <Col md='12' className='mb-1'>
                                <Label className='form-label' for='building'>
                                    ساختمان  <span style={{ color: 'red' }}>*</span>
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
                                                id="building"
                                                className={`react-select ${error ? 'is-invalid' : ''}`}
                                                classNamePrefix='select'
                                                options={defaultBuildings}
                                                placeholder="ساختمان  را انتخاب کنید"
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

export default DepartmentsTable