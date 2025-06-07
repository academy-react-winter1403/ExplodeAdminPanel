import React, { useState, useEffect } from 'react';
import { Edit, Eye, HardDrive } from 'react-feather';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Alert, Button, CardBody, Col, Form, FormFeedback, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row, Spinner, Table } from 'reactstrap';
import Select from 'react-select';
import { selectThemeColors } from '@utils';
import { updateAssistance } from '../../../@core/services/courses';
import { fetchAllAssistance } from '../../../redux/courseDetailSlice';
import { formatDate } from '../../../utility/DateFormatter';
import AssisWorksTable from './AssistanceWorks';
import ReactPaginate from 'react-paginate';

const AssistanceListTable = ({ courseId, assistanceUser }) => {
    const { courseAssistanceList } = useSelector((state) => state.courseDetails);
    const assistanceList = courseAssistanceList.filter((as) => as.courseId == courseId);
    const [editModal, setEditModal] = useState(false);
    const [buttonLoading, setButtonLoading] = useState(false);
    const [assistanceId, setAssisTanceId] = useState(null);
    const [user, setUser] = useState(null);
    const [worksModal, setWorksModal] = useState(false)
    const [assisName, setAssisName] = useState(null)
    const dispatch = useDispatch();

    const {
        control,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({
        defaultValues: {
            assistance: { value: null, label: null }
        }
    });

    useEffect(() => {
        if (editModal && user) {
            reset({
                assistance: {
                    value: user?.value || null,
                    label: user?.label || 'بدون نام'
                }
            });
        } else if (!editModal) {
            reset({
                assistance: { value: null, label: null }
            });
        }
    }, [user, editModal, reset]);

    const onSubmit = async (data) => {
        try {
            setButtonLoading(true);
            await updateAssistance(courseId, data.assistance.value, assistanceId);
            dispatch(fetchAllAssistance());
            setButtonLoading(false);
            setEditModal(false);
        } catch {
            setButtonLoading(false);
            setEditModal(true);
        }
    };


    const [currentPage, setCurrentPage] = useState(0)
    const itemsPerPage = 5
    const pageCount = Math.ceil(assistanceList?.length / itemsPerPage);
    const currentAccepted = assistanceList?.slice(
        currentPage * itemsPerPage,
        (currentPage + 1) * itemsPerPage
    )
    const handlePagination = ({ selected }) => {
        setCurrentPage(selected)
    }
    useEffect(() => {
        const newPageCount = Math.ceil(assistanceList?.length / itemsPerPage);
        if (currentPage >= newPageCount && newPageCount > 0) {
            setCurrentPage(newPageCount - 1);
        } else if (newPageCount === 0) {
            setCurrentPage(0);
        }
    }, [assistanceList, currentPage, itemsPerPage])

    return (
        <>
            {currentAccepted?.length > 0 ? (
                <>
                    <Table>
                        <thead>
                            <tr>
                                <th>نام دستیار</th>
                                <th>شناسه دستیار</th>
                                <th>تاریخ ایجاد</th>
                                <th>امکانات</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentAccepted?.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.assistanceName ? item.assistanceName : 'بدون نام'}</td>
                                    <td>{item.id}</td>
                                    <td>{formatDate(item.inserDate)}</td>
                                    <td>
                                        <Eye
                                            className='cursor-pointer mx-1'
                                            onClick={() => {
                                                setWorksModal(true);
                                                setAssisTanceId(item.id)
                                                setAssisName(item.assistanceName)
                                            }}
                                        />
                                        <Edit
                                            className='cursor-pointer'
                                            onClick={() => {
                                                setAssisTanceId(item.id);
                                                const selectedUser = assistanceUser.find((user) => user.value == item.userId);
                                                setUser(selectedUser || { value: null, label: 'کاربر یافت نشد' });
                                                setEditModal(true);

                                            }}
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
                        pageRangeDisplayed={3} // تعداد دکمه‌های صفحه نمایش داده شده
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

            {/* Edit Assistance */}
            <Modal isOpen={editModal} toggle={() => setEditModal(!editModal)} className='modal-dialog-centered'>
                <ModalHeader toggle={() => setEditModal(!editModal)}>ویرایش دستیار دوره</ModalHeader>
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
                                    rules={{ required: 'لطفاً یک دستیار انتخاب کنید' }}
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
                            <Col md='12' className='mb-1'>
                                <Label className='form-label' for='assistanceId'>
                                    شناسه دستیار
                                </Label>
                                <div id='assistanceId' className='form-control'>
                                    {assistanceId || 'بدون شناسه'}
                                </div>
                            </Col>
                        </Row>
                        <ModalFooter className='justify-content-start'>
                            <Button color='primary' type='submit'>
                                {buttonLoading ? <Spinner /> : 'ویرایش'}
                            </Button>
                            <Button color='danger' onClick={() => setEditModal(!editModal)}>
                                بستن
                            </Button>
                        </ModalFooter>
                    </Form>
                </ModalBody>
            </Modal>


            {/* Assistance Works Table Modal */}
            <Modal isOpen={worksModal} toggle={() => setWorksModal(!worksModal)} className='modal-dialog-centered modal-xl'>
                <ModalHeader toggle={() => setWorksModal(!worksModal)}><span style={{ fontWeight: 'bold' }}><HardDrive className='mx-1' />لیست کار ها : ( {assisName} )</span></ModalHeader>
                <ModalBody>
                    <CardBody>
                        <AssisWorksTable
                            assisId={assistanceId}

                        />
                    </CardBody>
                </ModalBody>
            </Modal>
        </>
    );
};

export default AssistanceListTable;