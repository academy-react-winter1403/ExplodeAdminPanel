import React, { useEffect, useState } from 'react'
import { Edit } from 'react-feather';
import { Alert, Button, Form, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Spinner, Table } from 'reactstrap';
import { Controller, useForm } from 'react-hook-form'
import { setCategories } from '../../redux/blogCategoriesSlice';
import { useDispatch } from 'react-redux';
import { createCategories, updateCategories } from '../../@core/services/blogs';

const TableData = ({ categories, currentAccepted }) => {
    const [editeModal, setEditeModal] = useState(false)
    const [buttonLoading, setButtonLoading] = useState(false)
    const [selectedGroup, setSelectedGroup] = useState(null)
    const [addModal, setAddModal] = useState(false)
    const dispatch = useDispatch()
    const {
        reset,
        control,
        setError,
        handleSubmit,
        formState: { errors }
    } = useForm()

    const updateCategory = (array, catId, newCategoryName, newGoogleTitle, newGoogleDescription) => {
        return array.map(item =>
            item.id === catId
                ? { ...item, categoryName: newCategoryName, googleTitle: newGoogleTitle, googleDescribe: newGoogleDescription }
                : item
        )
    }

    const onSubmit = async (data) => {
        try {
            setButtonLoading(true)
            await updateCategories(data)
            const updatedBlogCategory = updateCategory(categories, data.Id, data.CategoryName, data.GoogleTitle, data.GoogleDescribe)
            dispatch(setCategories(updatedBlogCategory))
            setButtonLoading(false)
            setEditeModal(false)
            reset()
        }
        catch (error) {
            setButtonLoading(false)
            setEditeModal(false)
        }
    }

    const addOnSubmit = async (data) => {
        try {
            const addData = {
                addCategoryName: data.addCategoryName,
                addGoogleTitle: data.addGoogleTitle,
                addGoogleDescribe: data.addGoogleDescribe,
            }

            setButtonLoading(true)
            const { id } = await createCategories(addData)
            const newCategory = {
                id: id,
                categoryName: addData.addCategoryName,
                googleTitle: addData.addGoogleTitle,
                googleDescribe: addData.addGoogleDescribe
            }
            dispatch(setCategories([...categories, newCategory]))
            setButtonLoading(false)
            setAddModal(false)
            reset({
                addCategoryName: '',
                addGoogleTitle: '',
                addGoogleDescribe: '',
            })
        }
        catch (error) {
            setButtonLoading(false)
            setAddModal(false)

        }
    }

    useEffect(() => {
        if (selectedGroup) {
            reset({
                Id: selectedGroup.id,
                CategoryName: selectedGroup.categoryName,
                GoogleTitle: selectedGroup.googleTitle,
                GoogleDescribe: selectedGroup.googleDescribe,
                addCategoryName: '',
                addGoogleTitle: '',
                addGoogleDescribe: '',
            })
        } else {
            reset({
                Id: undefined,
                CategoryName: '',
                GoogleTitle: '',
                GoogleDescribe: '',
                addCategoryName: '',
                addGoogleTitle: '',
                addGoogleDescribe: '',
            })
        }
    }, [selectedGroup, reset])

    const toggleEditModal = () => {
        setEditeModal(!editeModal)
        if (editeModal) {
            reset({
                Id: undefined,
                CategoryName: '',
                GoogleTitle: '',
                GoogleDescribe: '',
                addCategoryName: '',
                addGoogleTitle: '',
                addGoogleDescribe: '',
            })
            setSelectedGroup(null)
        }
    }

    const toggleAddModal = () => {
        setAddModal(!addModal)
        reset({
            Id: undefined,
            CategoryName: '',
            GoogleTitle: '',
            GoogleDescribe: '',
            addCategoryName: '',
            addGoogleTitle: '',
            addGoogleDescribe: '',
        })
    }

    return (
        <>
            <Button color='success mb-2' onClick={toggleAddModal}>ایجاد دسته بندی</Button>
            <Table>
                {
                    categories?.length > 0 ?
                        <>
                            <thead>
                                <tr>
                                    <th>شناسه یکتا</th>
                                    <th>نام دسته بندی</th>
                                    <th>عنوان گوگل</th>
                                    <th>توضیحات گوگل</th>
                                    <th>امکانات</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    currentAccepted.map((item) => (
                                        <tr key={item.key}>
                                            <td>{item.id}</td>
                                            <td>{item.categoryName}</td>
                                            <td title={item.googleTitle}>{item.googleTitle.length > 13 ? item.googleTitle.slice(0, 15) + '...' : item.googleTitle}</td>
                                            <td title={item.googleDescribe}>{item.googleDescribe.length > 13 ? item.googleDescribe.slice(0, 15) + '...' : item.googleDescribe}</td>
                                            <td>
                                                <Edit className='cursor-pointer' onClick={() => { setEditeModal(true); setSelectedGroup(item) }} />
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </> : <Alert color='danger' className='p-1 text-center' style={{ fontSize: '20px' }}>دسته بندی یافت نشد</Alert>
                }
            </Table>

            <Modal isOpen={editeModal} toggle={toggleEditModal} className='modal-dialog-centered'>
                <ModalHeader toggle={toggleEditModal}>ویرایش دسته بندی</ModalHeader>
                <ModalBody>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <div className='mb-1'>
                            <Label className='form-label' for='CategoryName'>
                                عنوان
                            </Label>
                            <Controller
                                control={control}
                                id='CategoryName'
                                name='CategoryName'
                                render={({ field }) => <Input placeholder='عنوان دسته بندی' invalid={errors.CategoryName && true} {...field} />}
                            />
                        </div>

                        <div className='mb-1'>
                            <Label className='form-label' for='GoogleTitle'>
                                عنوان گوگل
                            </Label>
                            <Controller
                                control={control}
                                id='GoogleTitle'
                                name='GoogleTitle'
                                rules={{
                                    required: 'عنوان گوگل الزامی است',
                                    minLength: { value: 40, message: 'عنوان گوگل باید حداقل 40 کاراکتر باشد' },
                                    maxLength: { value: 70, message: 'عنوان گوگل نمی‌تواند بیشتر از 70 کاراکتر باشد' },
                                }}
                                render={({ field }) => <Input maxLength={70} type='text' placeholder='عنوان گوگل' invalid={errors.GoogleTitle && true} {...field} />}
                            />
                        </div>

                        <div className='mb-1'>
                            <Label className='form-label' for='GoogleDescribe'>
                                توضیح گوگل
                            </Label>
                            <Controller
                                control={control}
                                id='GoogleDescribe'
                                name='GoogleDescribe'
                                rules={{
                                    required: 'توضیح گوگل الزامی است',
                                    minLength: { value: 70, message: 'توضیح گوگل باید حداقل 70 کاراکتر باشد' },
                                    maxLength: { value: 150, message: 'توضیح گوگل نمی‌تواند بیشتر از 150 کاراکتر باشد' },
                                }}
                                render={({ field }) => <Input type='textarea' maxLength={150} placeholder='توضیح گوگل' invalid={errors.GoogleDescribe && true} {...field} />}
                            />
                        </div>

                        <ModalFooter className='justify-content-start'>
                            <Button color='primary' type='submit'>
                                {buttonLoading ? <Spinner /> : 'ویرایش'}
                            </Button>
                            <Button color='danger' onClick={toggleEditModal}>
                                بستن
                            </Button>
                        </ModalFooter>
                    </Form>
                </ModalBody>
            </Modal>

            <Modal isOpen={addModal} toggle={toggleAddModal} className='modal-dialog-centered'>
                <ModalHeader toggle={toggleAddModal}>اضافه کردن دسته بندی</ModalHeader>
                <ModalBody>
                    <Form onSubmit={handleSubmit(addOnSubmit)}>
                        <div className='mb-1'>
                            <Label className='form-label' for='addCategoryName'>
                                عنوان
                            </Label>
                            <Controller
                                control={control}
                                id='addCategoryName'
                                name='addCategoryName'
                                render={({ field }) => <Input placeholder='عنوان دسته بندی' invalid={errors.addCategoryName && true} {...field} />}
                            />
                        </div>

                        <div className='mb-1'>
                            <Label className='form-label' for='addGoogleTitle'>
                                عنوان گوگل
                            </Label>
                            <Controller
                                control={control}
                                id='addGoogleTitle'
                                name='addGoogleTitle'
                                rules={{
                                    required: 'عنوان گوگل الزامی است',
                                    minLength: { value: 40, message: 'عنوان گوگل باید حداقل 40 کاراکتر باشد' },
                                    maxLength: { value: 70, message: 'عنوان گوگل نمی‌تواند بیشتر از 70 کاراکتر باشد' },
                                }}
                                render={({ field }) => <Input type='text' maxLength={70} placeholder='عنوان گوگل' invalid={errors.addGoogleTitle && true} {...field} />}
                            />
                        </div>

                        <div className='mb-1'>
                            <Label className='form-label' for='addGoogleDescribe'>
                                توضیح گوگل
                            </Label>
                            <Controller
                                control={control}
                                id='addGoogleDescribe'
                                name='addGoogleDescribe'
                                rules={{
                                    required: 'توضیح گوگل الزامی است',
                                    minLength: { value: 70, message: 'توضیح گوگل باید حداقل 70 کاراکتر باشد' },
                                    maxLength: { value: 150, message: 'توضیح گوگل نمی‌تواند بیشتر از 150 کاراکتر باشد' },
                                }}
                                render={({ field }) => <Input type='textarea' maxLength={150} placeholder='توضیح گوگل' invalid={errors.addGoogleDescribe && true} {...field} />}
                            />
                        </div>

                        <ModalFooter className='justify-content-start'>
                            <Button color='primary' type='submit'>
                                {buttonLoading ? <Spinner /> : 'اضافه کردن'}
                            </Button>
                            <Button color='danger' onClick={toggleAddModal}>
                                بستن
                            </Button>
                        </ModalFooter>
                    </Form>
                </ModalBody>
            </Modal>
        </>
    )
}

export default TableData