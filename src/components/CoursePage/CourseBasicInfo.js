// ** React Imports
import { Fragment, useEffect, useState } from 'react'

// ** Utils
import { isObjEmpty } from '@utils'

// ** Third Party Components
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { ArrowLeft, ArrowRight } from 'react-feather'
import { yupResolver } from '@hookform/resolvers/yup'
import Select from 'react-select'
import { selectThemeColors } from '@utils'
import Flatpickr from 'react-flatpickr'

// ** Reactstrap Imports
import { Form, Label, Input, Row, Col, Button, FormFeedback } from 'reactstrap'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCourseInfo } from '../../redux/addCourseSlice'
const CourseBasicInfo = ({ stepper }) => {
    const [startPicker, setStartPicker] = useState(new Date())
    const [endPicker, setEndPicker] = useState(new Date())
    const dispatch = useDispatch()
    const {
        courseTypes,
        courseTerms,
        courseClassRooms,
        courseLevels,
        courseTeachers
    } = useSelector((state) => state.addCourse);
    const fieldsSchema = yup.object().shape({
        capacity: yup.string().required('تعداد نفرات را وارد کنید'),
        sessionNumber: yup.string().required('تعداد جلسات را وارد کنید'),
        coursePrice: yup.string().required('قیمت دوره را وارد کنید'),
    })

    const {
        control,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(fieldsSchema)
    })

    const onSubmit = (data) => {
        console.log(data)
        if (isObjEmpty(errors)) {
            stepper.next()
        }
    }

    useEffect(async () => {
        dispatch(fetchCourseInfo());
    }, [dispatch]);

    return (
        <Fragment>
            <div className='content-header'>
                <h5 className='mb-0'>اطلاعات اولیه دوره</h5>
                <small className='text-muted'>لطفا با دقت اطلاعات را وارد کنید</small>
            </div>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Row>
                    <Col md='4' className='mb-1'>
                        <Label className='form-label' for='capacity'>
                            ظرفیت دوره
                        </Label>
                        <Controller
                            id='capacity'
                            name='capacity'
                            control={control}
                            render={({ field }) => <Input placeholder='تعداد نفرات' invalid={errors.capacity && true} {...field} />}
                        />
                        {errors.capacity && <FormFeedback>{errors.capacity.message}</FormFeedback>}
                    </Col>

                    <Col md='4' className='mb-1'>
                        <Label className='form-label' for='courseType'>
                            نوع دوره
                        </Label>
                        <Controller
                            id='courseType'
                            name='courseType'
                            control={control}
                            render={({ field }) =>  <Select
                            theme={selectThemeColors}
                            isClearable={false}
                            id={`course-type`}
                            className='react-select'
                            classNamePrefix='select'
                            options={courseTypes}
                            defaultValue={courseTypes[0]}
                            {...field}
                        />}
                        />
                       
                    </Col>

                    <Col md='4' className='mb-1'>
                        <Label className='form-label' for='session-number'>
                            تعداد جلسات
                        </Label>
                        <Controller
                            id='session-number'
                            name='sessionNumber'
                            control={control}
                            render={({ field }) => <Input placeholder='تعداد' invalid={errors.sessionNumber && true} {...field} />}
                        />
                        {errors.sessionNumber && <FormFeedback>{errors.sessionNumber.message}</FormFeedback>}
                    </Col>

                    <Col md='4' className='mb-1'>
                        <Label className='form-label' for='termType'>
                            نوع ترم
                        </Label>
                        <Select
                            theme={selectThemeColors}
                            isClearable={false}
                            id={`term-type`}
                            className='react-select'
                            classNamePrefix='select'
                            options={courseTerms}
                            defaultValue={courseTerms[0]}
                        />
                    </Col>

                    <Col md='4' className='mb-1'>
                        <Label className='form-label' for='classRoom'>
                            کلاس دوره
                        </Label>
                        <Select
                            theme={selectThemeColors}
                            isClearable={false}
                            id={`classRoom`}
                            className='react-select'
                            classNamePrefix='select'
                            options={courseClassRooms}
                            defaultValue={courseClassRooms[0]}
                        />
                    </Col>

                    <Col md='4' className='mb-1'>
                        <Label className='form-label' for='courseLevel'>
                            سطح دوره
                        </Label>
                        <Select
                            theme={selectThemeColors}
                            isClearable={false}
                            id={`courseLevel`}
                            className='react-select'
                            classNamePrefix='select'
                            options={courseLevels}
                            defaultValue={courseLevels[0]}
                        />
                    </Col>

                    <Col md='4' className='mb-1'>
                        <Label className='form-label' for='courseTeacher'>
                            مدرس دوره
                        </Label>
                        <Select
                            theme={selectThemeColors}
                            isClearable={false}
                            id={`courseTeacher`}
                            className='react-select'
                            classNamePrefix='select'
                            options={courseTeachers}
                            defaultValue={courseTeachers[0]}
                        />
                    </Col>

                    <Col md='4' className='mb-1'>
                        <Label className='form-label' for='coursePrice'>
                            قیمت دوره
                        </Label>
                        <Controller
                            id='coursePrice'
                            name='coursePrice'
                            control={control}
                            render={({ field }) => <Input placeholder='تومان' invalid={errors.coursePrice && true} {...field} />}
                        />
                        {errors.coursePrice && <FormFeedback>{errors.coursePrice.message}</FormFeedback>}
                    </Col>

                    <Col md='4' className='mb-1'>
                        <Label className='form-label' for='startDatePicker'>
                            تاریخ شروع
                        </Label>
                        <Flatpickr className='form-control' value={startPicker} onChange={date => setStartPicker(date)} id='startDatePicker' />
                    </Col>

                    <Col md='4' className='mb-1'>
                        <Label className='form-label' for='endDatePicker'>
                            تاریخ پایان
                        </Label>
                        <Flatpickr className='form-control' value={endPicker} onChange={date => setEndPicker(date)} id='endDatePicker' />
                    </Col>
                </Row>
                <div className='d-flex justify-content-end'>
                    <Button type='submit' color='primary' className='btn-next'>
                        <span className='align-middle d-sm-inline-block d-none'>مرحله بعدی</span>
                        <ArrowRight size={14} className='align-middle ms-sm-25 ms-0'></ArrowRight>
                    </Button>
                </div>
            </Form>
        </Fragment>
    )
}

export default CourseBasicInfo