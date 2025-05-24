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
import {
    fetchCourseInfo,
    setCourseCapacity,
    setCourseClassRoom,
    setCourseCost,
    setCourseEndTime,
    setCourseLevel,
    setCourseSessionNumber,
    setCourseStartTime,
    setCourseTeacher,
    setCourseTerm,
    setCourseType
} from '../../redux/addCourseSlice'

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

        courseType: yup.object({
            value: yup.string().required('نوع دوره را انتخاب کنید'),
        })
            .nullable()
            .required('نوع دوره را انتخاب کنید'),

        termType: yup.object({
            value: yup.string().required('نوع ترم را انتخاب کنید'),
        })
            .nullable()
            .required('نوع ترم را انتخاب کنید'),

        classRoom: yup.object({
            value: yup.string().required('کلاس دوره را انتخاب کنید'),
        })
            .nullable()
            .required('کلاس دوره را انتخاب کنید'),

        courseLevel: yup.object({
            value: yup.string().required('سطح دوره را انتخاب کنید'),
        })
            .nullable()
            .required('سطح دوره را انتخاب کنید'),

        courseTeacher: yup.object({
            value: yup.string().required('مدرس دوره را انتخاب کنید'),
        })
            .nullable()
            .required('مدرس دوره را انتخاب کنید'),

        startDatePicker: yup
            .date()
            .nullable()
            .required('تاریخ شروع را انتخاب کنید'),

        endDatePicker: yup
            .date()
            .nullable()
            .required('تاریخ پایان را انتخاب کنید'),
    });

    const {
        control,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(fieldsSchema),
        defaultValues: {
            courseType: null,
            termType: null,
            classRoom: null,
            courseLevel: null,
            courseTeacher: null,
            startDatePicker: null,
            endDatePicker: null
        }
    })


    const onSubmit = (data) => {
        dispatch(setCourseCapacity(data.capacity))
        dispatch(setCourseSessionNumber(data.sessionNumber))
        dispatch(setCourseCost(data.coursePrice))
        dispatch(setCourseType(data.courseType?.value || null))
        dispatch(setCourseTerm(data.termType?.value || null))
        dispatch(setCourseClassRoom(data.classRoom?.value || null))
        dispatch(setCourseLevel(data.courseLevel?.value || null))
        dispatch(setCourseTeacher(data.courseTeacher?.value || null))
        dispatch(setCourseStartTime(data.startDatePicker ? new Date(data.startDatePicker).toISOString() : null))
        dispatch(setCourseEndTime(data.endDatePicker ? new Date(data.endDatePicker).toISOString() : null))
        stepper.next()

    };

    useEffect(() => {
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
                            render={({ field }) => (
                                <Input
                                    placeholder='تعداد نفرات'
                                    invalid={errors.capacity && true}
                                    {...field}
                                />
                            )}
                        />
                        {errors.capacity && (
                            <FormFeedback style={{ display: 'block' }}>
                                {errors.capacity.message}
                            </FormFeedback>
                        )}
                    </Col>

                    <Col md='4' className='mb-1'>
                        <Label className='form-label' for='courseType'>
                            نوع دوره
                        </Label>
                        <Controller
                            name="courseType"
                            control={control}
                            render={({ field, fieldState: { error } }) => (
                                <>
                                    <Select
                                        {...field}
                                        theme={selectThemeColors}
                                        isClearable={false}
                                        id="course-type"
                                        className={`react-select ${error ? 'is-invalid' : ''}`}
                                        classNamePrefix='select'
                                        options={courseTypes}
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

                    <Col md='4' className='mb-1'>
                        <Label className='form-label' for='session-number'>
                            تعداد جلسات
                        </Label>
                        <Controller
                            id='session-number'
                            name='sessionNumber'
                            control={control}
                            render={({ field }) => (
                                <Input
                                    placeholder='تعداد'
                                    invalid={errors.sessionNumber && true}
                                    {...field}
                                />
                            )}
                        />
                        {errors.sessionNumber && (
                            <FormFeedback style={{ display: 'block' }}>
                                {errors.sessionNumber.message}
                            </FormFeedback>
                        )}
                    </Col>

                    <Col md='4' className='mb-1'>
                        <Label className='form-label' for='termType'>
                            نوع ترم
                        </Label>
                        <Controller
                            name="termType"
                            control={control}
                            render={({ field, fieldState: { error } }) => (
                                <>
                                    <Select
                                        {...field}
                                        theme={selectThemeColors}
                                        isClearable={false}
                                        id="term-type"
                                        className={`react-select ${error ? 'is-invalid' : ''}`}
                                        classNamePrefix='select'
                                        options={courseTerms}
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

                    <Col md='4' className='mb-1'>
                        <Label className='form-label' for='classRoom'>
                            کلاس دوره
                        </Label>
                        <Controller
                            name="classRoom"
                            control={control}
                            render={({ field, fieldState: { error } }) => (
                                <>
                                    <Select
                                        {...field}
                                        theme={selectThemeColors}
                                        isClearable={false}
                                        id="classRoom"
                                        className={`react-select ${error ? 'is-invalid' : ''}`}
                                        classNamePrefix='select'
                                        options={courseClassRooms}
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

                    <Col md='4' className='mb-1'>
                        <Label className='form-label' for='courseLevel'>
                            سطح دوره
                        </Label>
                        <Controller
                            name="courseLevel"
                            control={control}
                            render={({ field, fieldState: { error } }) => (
                                <>
                                    <Select
                                        {...field}
                                        theme={selectThemeColors}
                                        isClearable={false}
                                        id="courseLevel"
                                        className={`react-select ${error ? 'is-invalid' : ''}`}
                                        classNamePrefix='select'
                                        options={courseLevels}
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

                    <Col md='4' className='mb-1'>
                        <Label className='form-label' for='courseTeacher'>
                            مدرس دوره
                        </Label>
                        <Controller
                            name="courseTeacher"
                            control={control}
                            render={({ field, fieldState: { error } }) => (
                                <>
                                    <Select
                                        {...field}
                                        value={field.value}
                                        theme={selectThemeColors}
                                        isClearable={false}
                                        id="courseTeacher"
                                        className={`react-select ${error ? 'is-invalid' : ''}`}
                                        classNamePrefix='select'
                                        options={courseTeachers}
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

                    <Col md='4' className='mb-1'>
                        <Label className='form-label' for='coursePrice'>
                            قیمت دوره
                        </Label>
                        <Controller
                            id='coursePrice'
                            name='coursePrice'
                            control={control}
                            render={({ field }) => (
                                <Input
                                    placeholder='تومان'
                                    invalid={errors.coursePrice && true}
                                    {...field}
                                />
                            )}
                        />
                        {errors.coursePrice && (
                            <FormFeedback style={{ display: 'block' }}>
                                {errors.coursePrice.message}
                            </FormFeedback>
                        )}
                    </Col>

                    <Col md='4' className='mb-1'>
                        <Label className='form-label' for='startDatePicker'>
                            تاریخ شروع
                        </Label>
                        <Controller
                            name="startDatePicker"
                            control={control}
                            render={({ field, fieldState: { error } }) => (
                                <>
                                    <Flatpickr
                                        className={`form-control ${error ? 'is-invalid' : ''}`}
                                        value={field.value}
                                        onChange={date => {
                                            field.onChange(date)
                                            setStartPicker(date)
                                        }}
                                        id='startDatePicker'
                                        placeholder="انتخاب تاریخ"
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

                    <Col md='4' className='mb-1'>
                        <Label className='form-label' for='endDatePicker'>
                            تاریخ پایان
                        </Label>
                        <Controller
                            name="endDatePicker"
                            control={control}
                            render={({ field, fieldState: { error } }) => (
                                <>
                                    <Flatpickr
                                        className={`form-control ${error ? 'is-invalid' : ''}`}
                                        value={field.value}
                                        onChange={date => {
                                            field.onChange(date)
                                            setEndPicker(date)
                                        }}
                                        id='endDatePicker'
                                        placeholder="انتخاب تاریخ"
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