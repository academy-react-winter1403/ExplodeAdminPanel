import React, { useEffect, useState } from 'react'
import { Users } from 'react-feather'
import { Button, CardBody, Col, Form, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row, Spinner } from 'reactstrap'
import AssistanceListTable from './AssistanceListTable'
import { Controller, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import Select from 'react-select'
import { selectThemeColors } from '@utils'
import { addAssistance } from '../../../@core/services/courses'
import { fetchAllAssistance } from '../../../redux/courseDetailSlice'
import toast from 'react-hot-toast'

const Assistance = ({ courseTitle, courseId, assistanceModal, setAssistanceModal, assistanceUser }) => {
    const [addModal, setAddModal] = useState(false)
    assistanceUser = assistanceUser?.map((as) => ({ value: as.id, label: as.fname + " " + as.lname }))
    const [buttonLoading, setButtonLoading] = useState(false)
    const dispatch = useDispatch()
    const {
        control,
        handleSubmit,
        formState: { errors }
    } = useForm()

    const onSubmit = async (data) => {
        try {
            setButtonLoading(true)
            await addAssistance(courseId, data.assistance.value)
            dispatch(fetchAllAssistance())
            setButtonLoading(false)
            setAddModal(false)
        } catch {
            setButtonLoading(false)
            setAddModal(false)
        }
    }
    return (
        <>
            {/* Assistance Table Modal */}
            <Modal isOpen={assistanceModal} toggle={() => setAssistanceModal(!assistanceModal)} className='modal-dialog-centered modal-xl'>
                <ModalHeader toggle={() => setAssistanceModal(!assistanceModal)}><span style={{ fontWeight: 'bold' }}><Users className='mx-1' /> دستیار دوره برای : {courseTitle}</span></ModalHeader>
                <ModalBody>
                    <CardBody>
                        <Button className='mb-3' color='primary' onClick={() => setAddModal(true)}>اضافه کردن دستیار</Button>
                        <AssistanceListTable
                            courseId={courseId}
                            assistanceUser={assistanceUser}
                        />
                    </CardBody>
                </ModalBody>
            </Modal>



            {/* Add Assistance */}
            <Modal isOpen={addModal} toggle={() => setAddModal(!addModal)} className='modal-dialog-centered'>
                <ModalHeader toggle={() => setAddModal(!addModal)}>انتخاب و ایجاد دستیار دوره</ModalHeader>
                <ModalBody>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Row>
                            <Col md='12' className='mb-1'>
                                <Label className='form-label' for='assistance'>
                                    دستیار ها
                                </Label>
                                <Controller
                                    name="assistance"
                                    control={control}
                                    render={({ field, fieldState: { error } }) => (
                                        <>
                                            <Select
                                                {...field}
                                                value={field.value}
                                                theme={selectThemeColors}
                                                isClearable={false}
                                                id="assistance"
                                                className={`react-select ${error ? 'is-invalid' : ''}`}
                                                classNamePrefix='select'
                                                options={assistanceUser}
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
                                {buttonLoading ? <Spinner /> : 'ایجاد'}
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

export default Assistance