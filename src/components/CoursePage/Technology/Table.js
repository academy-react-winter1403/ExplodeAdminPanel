import React, { useEffect, useState } from 'react'
import { Edit } from 'react-feather'
import ReactPaginate from 'react-paginate'
import { useDispatch, useSelector } from 'react-redux'
import { Alert, Badge, Button, Col, Form, FormFeedback, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row, Spinner, Table } from 'reactstrap'
import { Controller, useForm } from 'react-hook-form'
import Select from 'react-select'
import { selectThemeColors } from '@utils'
import { createTechnology, editTechnology } from '../../../@core/services/courses'
import { setTechnologies } from '../../../redux/coursesSlice'


const TechnologiesTable = () => {
    const { technologyList } = useSelector((state) => state.courses)
    const dispatch = useDispatch()
    const [addModal, setAddModal] = useState(false)
    const [editModal, setEditModal] = useState(false)
    const [selectedData, setSelectedData] = useState(null)
    const [buttonLoading, setButtonLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(0)
    const itemsPerPage = 10
    const pageCount = Math.ceil(technologyList.length / itemsPerPage)
    const currentAccepted = technologyList.slice(
        currentPage * itemsPerPage,
        (currentPage + 1) * itemsPerPage
    )

    const handlePagination = ({ selected }) => {
        setCurrentPage(selected)
    }

    useEffect(() => {
        const newPageCount = Math.ceil(technologyList.length / itemsPerPage)
        if (currentPage >= newPageCount && newPageCount > 0) {
            setCurrentPage(newPageCount - 1)
        } else if (newPageCount === 0) {
            setCurrentPage(0)
        }
    }, [technologyList, currentPage, itemsPerPage])

    const {
        control: addControl,
        handleSubmit: handleAddSubmit,
        formState: { errors: addErrors },
        reset: resetAdd
    } = useForm({
        defaultValues: {
            techName: '',
            parentId: null,
            describe: "",
            iconAddress: "",
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
            techName: '',
            parentId: null,
            describe: "",
            iconAddress: "",
        },
        mode: 'onChange'
    })


    const onSubmit = async (data) => {
        const techData = {
            techName: data.techName,
            parentId: data.parentId?.value || null,
            describe: data.describe,
            iconAddress: data.iconAddress || ""
        }

        try {
            setButtonLoading(true)
            const { id } = await createTechnology(techData)
            const newTech = {
                id: id,
                techName: data.techName,
                parentId: data.parentId?.value || null,
                describe: data.describe,
                iconAddress: data.iconAddress
            }
            dispatch(setTechnologies([...technologyList, newTech]))
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
            id: selectedData.id,
            techName: data.techName,
            parentId: data.parentId?.value || null,
            describe: data.describe,
            iconAddress: data.iconAddress
        }
        try {
            setButtonLoading(true)
            await editTechnology(editData)
            const updatedTechnology = {
                id: selectedData?.id,
                techName: data.techName,
                parentId: data.parentId?.value || null,
                describe: data.describe,
                iconAddress: data.iconAddress
            }
            const updatedList = technologyList.map(item =>
                item.id === selectedData?.id ? updatedTechnology : item
            )
            dispatch(setTechnologies(updatedList))
            setButtonLoading(false)
            setEditModal(false)
        }
        catch {
            setButtonLoading(false)
            setEditModal(false)
        }
    }

    const defaultTechnologies = technologyList?.map((item) => ({ value: item.id, label: item.techName }))

    const handleEditClick = (item) => {
        setSelectedData(item)
        setEditValue('techName', item.techName)
        setEditValue('parentId', defaultTechnologies.find(tech => tech.value === item.parentId)),
            setEditValue('describe', item.describe),
            setEditValue('iconAddress', item.iconAddress)
        setEditModal(true)
    }


    return (
        <>
            <Button color='success' className='mb-2' onClick={() => { setAddModal(true) }}>ایجاد تکنولوژی</Button>
            {
                currentAccepted?.length > 0 ?
                    <>
                        <Table responsive>
                            <thead>
                                <tr>
                                    <th>نام تکنولوژی</th>
                                    <th>تکنولوژی مادر</th>
                                    <th>توضیحات</th>
                                    <th>ویرایش</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    currentAccepted?.map((item) => (
                                        <tr key={item.id}>
                                            <td>{item.techName}</td>
                                            <td>{technologyList?.find((tech) => tech.id == item.parentId)?.techName || <Badge color='warning'>ندارد</Badge>}</td>
                                            <td>{item.describe}</td>
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
                <ModalHeader toggle={() => setAddModal(!addModal)}>ایجاد تکنولوژی جدید</ModalHeader>
                <ModalBody>
                    <Form onSubmit={handleAddSubmit(onSubmit)}>
                        <Row>
                            <Col md='12' className='mb-1'>
                                <Label className='form-label' for='techName'>
                                    نام تکنولوژی <span style={{ color: 'red' }}>*</span>
                                </Label>
                                <Controller
                                    id='techName'
                                    name='techName'
                                    control={addControl}
                                    rules={{ required: 'نام تکنولوژی الزامی است' }}
                                    render={({ field }) => (
                                        <Input
                                            placeholder='نام تکنولوژی را بنویسید'
                                            invalid={!!addErrors.techName}
                                            {...field}
                                        />
                                    )}
                                />
                                {addErrors.techName && <FormFeedback>{addErrors.techName.message}</FormFeedback>}
                            </Col>

                            <Col md='12' className='mb-1'>
                                <Label className='form-label' for='parentId'>
                                    تکنولوژی مادر
                                </Label>
                                <Controller
                                    name="parentId"
                                    control={addControl}
                                    render={({ field, fieldState: { error } }) => (
                                        <>
                                            <Select
                                                {...field}
                                                value={field.value}
                                                theme={selectThemeColors}
                                                isClearable={false}
                                                id="parentId"
                                                className={`react-select ${error ? 'is-invalid' : ''}`}
                                                classNamePrefix='select'
                                                options={defaultTechnologies}
                                                placeholder="تکنولوژی مادر را انتخاب کنید"
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

                            <Col md='12' className='mb-1'>
                                <Label className='form-label' for='describe'>
                                    توضیحات <span style={{ color: 'red' }}>*</span>
                                </Label>
                                <Controller
                                    id='describe'
                                    name='describe'
                                    control={addControl}
                                    rules={{ required: 'توضیحات تکنولوژی الزامی است' }}
                                    render={({ field }) => (
                                        <Input
                                            placeholder='توضیحات تکنولوژی را بنویسید'
                                            invalid={!!addErrors.describe}
                                            {...field}
                                        />
                                    )}
                                />
                                {addErrors.describe && <FormFeedback>{addErrors.describe.message}</FormFeedback>}
                            </Col>

                            <Col md='12' className='mb-1'>
                                <Label className='form-label' for='iconAddress'>
                                    ایکون تکنولوژی
                                </Label>
                                <Controller
                                    id='iconAddress'
                                    name='iconAddress'
                                    control={addControl}
                                    render={({ field }) => (
                                        <Input
                                            placeholder='ایکون تکنولوژی را بنویسید'
                                            invalid={!!addErrors.iconAddress}
                                            {...field}
                                        />
                                    )}
                                />
                                {addErrors.iconAddress && <FormFeedback>{addErrors.iconAddress.message}</FormFeedback>}
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
                <ModalHeader toggle={() => setEditModal(!editModal)}>ویرایش تکنولوژی</ModalHeader>
                <ModalBody>
                    <Form onSubmit={handleEditSubmit(onEditSubmit)}>
                        <Row>
                            <Col md='12' className='mb-1'>
                                <Label className='form-label' for='techName'>
                                    نام تکنولوژی <span style={{ color: 'red' }}>*</span>
                                </Label>
                                <Controller
                                    id='techName'
                                    name='techName'
                                    control={editControl}
                                    rules={{ required: 'نام تکنولوژی الزامی است' }}
                                    render={({ field }) => (
                                        <Input
                                            placeholder='نام تکنولوژی را بنویسید'
                                            invalid={!!addErrors.techName}
                                            {...field}
                                        />
                                    )}
                                />
                                {addErrors.techName && <FormFeedback>{addErrors.techName.message}</FormFeedback>}
                            </Col>

                            <Col md='12' className='mb-1'>
                                <Label className='form-label' for='parentId'>
                                    تکنولوژی مادر
                                </Label>
                                <Controller
                                    name="parentId"
                                    control={editControl}
                                    render={({ field, fieldState: { error } }) => (
                                        <>
                                            <Select
                                                {...field}
                                                value={field.value}
                                                theme={selectThemeColors}
                                                isClearable={false}
                                                id="parentId"
                                                className={`react-select ${error ? 'is-invalid' : ''}`}
                                                classNamePrefix='select'
                                                options={defaultTechnologies}
                                                placeholder="تکنولوژی مادر را انتخاب کنید"
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

                            <Col md='12' className='mb-1'>
                                <Label className='form-label' for='describe'>
                                    توضیحات <span style={{ color: 'red' }}>*</span>
                                </Label>
                                <Controller
                                    id='describe'
                                    name='describe'
                                    control={editControl}
                                    rules={{ required: 'توضیحات تکنولوژی الزامی است' }}
                                    render={({ field }) => (
                                        <Input
                                            placeholder='توضیحات تکنولوژی را بنویسید'
                                            invalid={!!addErrors.describe}
                                            {...field}
                                        />
                                    )}
                                />
                                {addErrors.describe && <FormFeedback>{addErrors.describe.message}</FormFeedback>}
                            </Col>

                            <Col md='12' className='mb-1'>
                                <Label className='form-label' for='iconAddress'>
                                    ایکون تکنولوژی
                                </Label>
                                <Controller
                                    id='iconAddress'
                                    name='iconAddress'
                                    control={editControl}
                                    render={({ field }) => (
                                        <Input
                                            placeholder='ایکون تکنولوژی را بنویسید'
                                            invalid={!!addErrors.iconAddress}
                                            {...field}
                                        />
                                    )}
                                />
                                {addErrors.iconAddress && <FormFeedback>{addErrors.iconAddress.message}</FormFeedback>}
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

export default TechnologiesTable