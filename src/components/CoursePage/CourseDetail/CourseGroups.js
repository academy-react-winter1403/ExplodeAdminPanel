import { useEffect, useState } from 'react'
import { Edit, Trash2 } from 'react-feather'
import { Button, Form, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Spinner, Table } from 'reactstrap'
import { Controller, useForm } from 'react-hook-form'
import { addCourseGroup, deleteCourseGroup, editeCourseGroups } from '../../../@core/services/courses'
import { useDispatch } from 'react-redux'
import { setCourseGroups } from '../../../redux/courseDetailSlice'

const CourseGroups = ({ courseGroups, courseId }) => {
    const [editeModal, setEditeModal] = useState(false)
    const [deleteModal, setDeleteModal] = useState(false)
    const [addModal, setAddModal] = useState(false)
    const [buttonLoading, setButtonLoading] = useState(false)
    const [selectedGroup, setSelectedGroup] = useState(null)
    const [group_Id, setGroupId] = useState(null)
    
    const dispatch = useDispatch()
    const {
        reset,
        control,
        setError,
        handleSubmit,
        formState: { errors }
    } = useForm()

    const updateGroup = (array, id, newName, newCapacity) => {
        return array.map(item =>
            item.groupId === id
                ? { ...item, groupName: newName, groupCapacity: newCapacity }
                : item
        )
    }

    const onSubmit = async (data) => {
        try {
            setButtonLoading(true)
            console.log(data)
            await editeCourseGroups(data)
            const updatedCourseGroups = updateGroup(courseGroups, data.Id, data.GroupName, data.GroupCapacity)
            dispatch(setCourseGroups(updatedCourseGroups))
            setButtonLoading(false)
            setEditeModal(!editeModal)
        }
        catch {
            setButtonLoading(false)
            setEditeModal(!editeModal)
        }
    }

    const addOnSubmit = async (data) => {
        try {
            setButtonLoading(true)
            const { id } = await addCourseGroup({ CourseId: courseId, GroupName: data.GroupName, GroupCapacity: data.GroupCapacity })
            const newGroup = { groupId: id, groupName: data.GroupName, courseId: courseId, groupCapacity: data.GroupCapacity }
            dispatch(setCourseGroups([...courseGroups, newGroup]))
            setButtonLoading(false)
            setAddModal(false)
        }
        catch {
            setButtonLoading(false)
            setAddModal(false)
        }
    }

    const handleDeleteGroup = async () => {
        try {
            console.log(group_Id)
            setButtonLoading(true)
            await deleteCourseGroup(Number(group_Id))
            setButtonLoading(false)
            setDeleteModal(false)
            dispatch(setCourseGroups(courseGroups.filter((g) => g.groupId !== group_Id)))
        }
        catch {
            setButtonLoading(false)
            setDeleteModal(false)
        }
    }
    useEffect(() => {
        if (selectedGroup) {
            reset({
                GroupName: selectedGroup.groupName,
                GroupCapacity: selectedGroup.groupCapacity,
                Id: selectedGroup.groupId,
                CourseId: selectedGroup.courseId,

            })
        }
    }, [selectedGroup, reset])

    return (
        <>
            <Button color='primary' className='mt-5' onClick={() => { setAddModal(true) }}>اضافه کردن گروه</Button>
            <Table responsive className='mt-2'>
                <thead>
                    <tr>
                        <th>شناسه گروه</th>
                        <th>نام گروه</th>
                        <th>ظرفیت گروه</th>
                        <th>امکانات</th>
                    </tr>
                </thead>
                <tbody>

                    {
                        courseGroups?.map((item) => (
                            <tr>
                                <td>{item.groupId}</td>
                                <td>{item.groupName}</td>
                                <td>{item.groupCapacity}</td>
                                <td>
                                    <Edit className='cursor-pointer' style={{ marginLeft: '2px' }}
                                        onClick={() => {
                                            setEditeModal(!editeModal);
                                            setSelectedGroup(item)
                                        }
                                        } />
                                    <Trash2 className='cursor-pointer' onClick={() => { setGroupId(item.groupId); setDeleteModal(!deleteModal) }} />
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>

            {/* Edite Modal */}
            <Modal isOpen={editeModal} toggle={() => setEditeModal(!editeModal)} className='modal-dialog-centered'>
                <ModalHeader toggle={() => setEditeModal(!editeModal)}>ویرایش گروه</ModalHeader>
                <ModalBody>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <div className='mb-1'>
                            <Label className='form-label' for='GroupName'>
                                عنوان
                            </Label>
                            <Controller

                                control={control}
                                id='GroupName'
                                name='GroupName'
                                render={({ field }) => <Input placeholder='عنوان گروه' invalid={errors.GroupName && true} {...field} />}
                            />
                        </div>

                        <div className='mb-1'>
                            <Label className='form-label' for='GroupCapacity'>
                                ظرفیت
                            </Label>
                            <Controller

                                control={control}
                                id='GroupCapacity'
                                name='GroupCapacity'
                                render={({ field }) => <Input type='number' placeholder='ظرفیت گروه' invalid={errors.GroupCapacity && true} {...field} />}
                            />
                        </div>

                        <ModalFooter className='justify-content-start'>
                            <Button color='primary ' type='submit'>
                                {buttonLoading ? <Spinner /> : 'ویرایش'}
                            </Button>
                            <Button color='danger ' onClick={() => setEditeModal(!editeModal)}>
                                بستن
                            </Button>
                        </ModalFooter>
                    </Form>
                </ModalBody>

            </Modal>

            {/* Delete Modal */}
            <Modal isOpen={deleteModal} toggle={() => setDeleteModal(!deleteModal)} className='modal-dialog-centered'>
                <ModalHeader toggle={() => setDeleteModal(!deleteModal)}>حذف دوره</ModalHeader>
                <ModalBody>
                    آیا برای حذف این گروه مطمعن هستید؟
                </ModalBody>
                <ModalFooter className='justify-content-start'>
                    <Button color='primary ' onClick={handleDeleteGroup}>
                        {buttonLoading ? <Spinner /> : 'بله'}
                    </Button>
                    <Button color='danger ' onClick={() => setDeleteModal(!deleteModal)}>
                        خیر
                    </Button>
                </ModalFooter>
            </Modal>

            {/* Add Group Modal */}
            <Modal isOpen={addModal} toggle={() => setAddModal(!addModal)} className='modal-dialog-centered'>
                <ModalHeader toggle={() => setAddModal(!addModal)}>ویرایش گروه</ModalHeader>
                <ModalBody>
                    <Form onSubmit={handleSubmit(addOnSubmit)}>
                        <div className='mb-1'>
                            <Label className='form-label' for='GroupName'>
                                عنوان
                            </Label>
                            <Controller
                                control={control}
                                id='GroupName'
                                name='GroupName'
                                render={({ field }) => <Input placeholder='عنوان گروه' invalid={errors.GroupName && true} {...field} />}
                            />
                        </div>

                        <div className='mb-1'>
                            <Label className='form-label' for='GroupCapacity'>
                                ظرفیت
                            </Label>
                            <Controller
                                control={control}
                                id='GroupCapacity'
                                name='GroupCapacity'
                                render={({ field }) => <Input type='text' placeholder='ظرفیت گروه' invalid={errors.GroupCapacity && true} {...field} />}
                            />
                        </div>

                        <ModalFooter className='justify-content-start'>
                            <Button color='primary ' type='submit'>
                                {buttonLoading ? <Spinner /> : 'اضافه کردن'}
                            </Button>
                            <Button color='danger ' onClick={() => setAddModal(!addModal)}>
                                بستن
                            </Button>
                        </ModalFooter>
                    </Form>
                </ModalBody>

            </Modal>
        </>
    )
}

export default CourseGroups