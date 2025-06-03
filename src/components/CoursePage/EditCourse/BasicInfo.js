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
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

// ** Reactstrap Imports
import { Form, Label, Input, Row, Col, Button, FormFeedback } from 'reactstrap'
import { useDispatch, useSelector } from 'react-redux'
import { setCourseCapacity, setCourseClassRoom, setCourseCost, setCourseEndTime, setCourseLevel, setCourseSessionNumber, setCourseStartTime, setCourseTeacher, setCourseTerm, setCourseType } from '../../../redux/editCourse'
import { setBlogData } from '../../../redux/blogCategoriesSlice'


const BasicInfo = ({ stepper, courseData, isBlogs }) => {
    const [startPicker, setStartPicker] = useState(new Date())
    const [endPicker, setEndPicker] = useState(new Date())
    const dispatch = useDispatch()
    const { basicInfo } = useSelector((state) => state.editCourse)
    const { categories, blogData } = useSelector((state) => state.blogCategories)
    const fieldsSchema = yup.object().shape({
        capacity: yup.string().nullable().required('تعداد نفرات را وارد کنید'),
        sessionNumber: yup.string().nullable().required('تعداد جلسات را وارد کنید'),
        coursePrice: yup.string().nullable().required('قیمت دوره را وارد کنید'),

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

    const blogFieldsSchema = yup.object().shape({
        blogTitle: yup.string()
            .required('نام بلاگ را وارد کنید')
            .min(10, 'نام بلاگ باید حداقل 10 کاراکتر باشد')
            .max(120, 'نام بلاگ نمی‌تواند بیشتر از 150 کاراکتر باشد'),
        googleTitle: yup.string()
            .required('عنوان گوگل را وارد کنید')
            .min(5, 'عنوان گوگل باید حداقل 5 کاراکتر باشد')
            .max(70, 'عنوان گوگل نمی‌تواند بیشتر از 150 کاراکتر باشد'),
        googleDescribe: yup.string()
            .required('توضیح گوگل را وارد کنید')
            .min(70, 'توضیح گوگل باید حداقل 70 کاراکتر باشد')
            .max(150, 'توضیح گوگل نمی‌تواند بیشتر از 150 کاراکتر باشد'),
        miniDescribe: yup.string()
            .required('توضیح کوتاه را وارد کنید')
            .min(10, 'توضیح کوتاه باید حداقل 10 کاراکتر باشد')
            .max(300, 'توضیح کوتاه نمی‌تواند بیشتر از 300 کاراکتر باشد'),
        keyWords: yup.string()
            .required('کلمات کلیدی را وارد کنید')
            .min(10, 'کلمات کلیدی باید حداقل 10 کاراکتر باشد')
            .max(300, 'کلمات کلیدی نمی‌تواند بیشتر از 300 کاراکتر باشد'),
        blogCategory: yup.object({
            value: yup.string().required('دسته بندی بلاگ را انتخاب کنید'),
        })
            .nullable()
            .required('دسته بندی بلاگ را انتخاب کنید'),

        editorContent: yup.string()
            .required('محتوای بلاگ را وارد کنید')
            .min(38, 'محتوای بلاگ باید حداقل 38 کاراکتر باشد')
    });

    const defaultclassRoomList = basicInfo?.classRoomDtos?.find((c) => c.classRoomName.includes(courseData.courseClassRoomName))
    const defaultcourseLevelInfo = basicInfo?.courseLevelDtos?.find((l) => l.levelName.includes(courseData.courseLevelName))
    const defaultcourseType = basicInfo?.courseTypeDtos?.find((t) => t.typeName.includes(courseData.courseTypeName))
    const defaultcourseTeacherInfo = basicInfo?.teachers?.find((ct) => ct.fullName?.replace(/-+/g, ' ').includes(courseData.teacherName))

    // Blog Default Category
    const defaultBlogCategory = categories?.find((ca) => ca.categoryName == blogData?.newsCatregoryName)

    // Blogs Categories
    const blogCategoriesList = categories?.map((item) => ({ value: item.id, label: item.categoryName }))

    const classRoomList = basicInfo?.classRoomDtos?.map((item) => ({ value: item.id, label: item.classRoomName }))
    const courseTypeList = basicInfo?.courseTypeDtos?.map((item) => ({ value: item.id, label: item.typeName }))
    const courseTermList = basicInfo?.termDtos?.map((item) => ({ value: item.id, label: item.termName }))
    const courseLevelList = basicInfo?.courseLevelDtos?.map((item) => ({ value: item.id, label: item.levelName }))
    const courseTeacherList = basicInfo?.teachers?.map((item) => ({ value: item.teacherId, label: item.fullName }))
    const {
        control,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(isBlogs ? blogFieldsSchema : fieldsSchema),
        defaultValues: {
            capacity: null,
            sessionNumber: null,
            coursePrice: courseData.cost,
            startDatePicker: null,
            endDatePicker: null,
            courseType: { value: defaultcourseType?.id, label: defaultcourseType?.typeName },
            termType: null,
            classRoom: { value: defaultclassRoomList?.id, label: defaultclassRoomList?.classRoomName },
            courseLevel: { value: defaultcourseLevelInfo?.id, label: defaultcourseLevelInfo?.levelName },
            courseTeacher: { value: defaultcourseTeacherInfo?.teacherId, label: defaultcourseTeacherInfo?.fullName },
            startDatePicker: courseData.startTime,
            endDatePicker: courseData.endTime,
            blogCategory: { value: defaultBlogCategory?.id, label: defaultBlogCategory?.categoryName },
            blogTitle: blogData?.title,
            googleTitle: blogData?.googleTitle,
            googleDescribe: blogData?.googleDescribe,
            miniDescribe: blogData?.miniDescribe,
            keyWords: blogData?.keyword
        }
    })
    const toLocalISOString = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}T00:00:00.000Z`;
    };

    const onSubmit = (data) => {
        if (isBlogs) {
            console.log(data)
            dispatch(setBlogData(data))
        }
        else {
            dispatch(setCourseCapacity(data.capacity))
            dispatch(setCourseSessionNumber(data.sessionNumber))
            dispatch(setCourseCost(data.coursePrice))
            dispatch(setCourseType(data.courseType?.value || null))
            dispatch(setCourseTerm(data.termType?.value || null))
            dispatch(setCourseClassRoom(data.classRoom?.value || null))
            dispatch(setCourseLevel(data.courseLevel?.value || null))
            dispatch(setCourseTeacher(data.courseTeacher?.value || null))
            dispatch(setCourseStartTime(data.startDatePicker ? toLocalISOString(data.startDatePicker) : null))
            dispatch(setCourseEndTime(data.endDatePicker ? toLocalISOString(data.endDatePicker) : null))
        }
        stepper.next()
    };

    return (
        <Fragment>
            <div className='content-header'>
                <h5 className='mb-0'>{isBlogs ? 'اطلاعات اولیه بلاگ' : 'اطلاعات اولیه دوره'}</h5>
                <small className='text-muted'>لطفا با دقت اطلاعات را وارد کنید</small>
            </div>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Row>
                    {
                        isBlogs ?
                            <>
                                <Col md='4' className='mb-1'>
                                    <Label className='form-label' for='blogTitle'>
                                        عنوان
                                    </Label>
                                    <Controller
                                        id='blogTitle'
                                        name='blogTitle'
                                        control={control}
                                        render={({ field }) => (
                                            <Input
                                                placeholder='عنوان بلاگ'
                                                invalid={errors.blogTitle && true}
                                                {...field}
                                            />
                                        )}
                                    />
                                    {errors.blogTitle && (
                                        <FormFeedback style={{ display: 'block' }}>
                                            {errors.blogTitle.message}
                                        </FormFeedback>
                                    )}
                                </Col>

                                <Col md='4' className='mb-1'>
                                    <Label className='form-label' for='googleTitle'>
                                        عنوان گوگل
                                    </Label>
                                    <Controller
                                        id='googleTitle'
                                        name='googleTitle'
                                        control={control}
                                        render={({ field }) => (
                                            <Input
                                                placeholder='عنوان گوگل'
                                                invalid={errors.googleTitle && true}
                                                {...field}
                                            />
                                        )}
                                    />

                                    {errors.googleTitle && (
                                        <FormFeedback style={{ display: 'block' }}>
                                            {errors.googleTitle.message}
                                        </FormFeedback>
                                    )}
                                </Col>

                                <Col md='4' className='mb-1'>
                                    <Label className='form-label' for='googleDescribe'>
                                        توضیح گوگل
                                    </Label>
                                    <Controller
                                        id='googleDescribe'
                                        name='googleDescribe'
                                        control={control}
                                        render={({ field }) => (
                                            <Input
                                                placeholder='توضیح گوگل'
                                                invalid={errors.googleDescribe && true}
                                                {...field}
                                            />
                                        )}
                                    />

                                    {errors.googleDescribe && (
                                        <FormFeedback style={{ display: 'block' }}>
                                            {errors.googleDescribe.message}
                                        </FormFeedback>
                                    )}
                                </Col>

                                <Col md='4' className='mb-1'>
                                    <Label className='form-label' for='miniDescribe'>
                                        توضیح کوتاه
                                    </Label>
                                    <Controller
                                        id='miniDescribe'
                                        name='miniDescribe'
                                        control={control}
                                        render={({ field }) => (
                                            <Input
                                                placeholder='توضیحات کوتاه'
                                                invalid={errors.miniDescribe && true}
                                                {...field}
                                            />
                                        )}
                                    />

                                    {errors.miniDescribe && (
                                        <FormFeedback style={{ display: 'block' }}>
                                            {errors.miniDescribe.message}
                                        </FormFeedback>
                                    )}
                                </Col>

                                <Col md='4' className='mb-1'>
                                    <Label className='form-label' for='keyWords'>
                                        کلمات کلیدی
                                    </Label>
                                    <Controller
                                        id='keyWords'
                                        name='keyWords'
                                        control={control}
                                        render={({ field }) => (
                                            <Input
                                                placeholder='کلمات کلیدی'
                                                invalid={errors.keyWords && true}
                                                {...field}
                                            />
                                        )}
                                    />

                                    {errors.keyWords && (
                                        <FormFeedback style={{ display: 'block' }}>
                                            {errors.keyWords.message}
                                        </FormFeedback>
                                    )}
                                </Col>

                                <Col md='4' className='mb-1'>
                                    <Label className='form-label' for='blogCategory'>
                                        دسته بندی دوره
                                    </Label>
                                    <Controller
                                        name="blogCategory"
                                        control={control}
                                        render={({ field, fieldState: { error } }) => (
                                            <>
                                                <Select
                                                    {...field}
                                                    value={field.value}
                                                    theme={selectThemeColors}
                                                    isClearable={false}
                                                    id="blogCategory"
                                                    className={`react-select ${error ? 'is-invalid' : ''}`}
                                                    classNamePrefix='select'
                                                    options={blogCategoriesList}
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
                                    <Label className='form-label' for='editorContent'>
                                        محتوای بلاگ
                                    </Label>
                                    <Controller
                                        name="editorContent"
                                        control={control}
                                        defaultValue={blogData?.describe}
                                        render={({ field }) => (
                                            <CKEditor
                                                editor={ClassicEditor}
                                                data={field.value || ''}
                                                onReady={(editor) => {
                                                    editor.editing.view.change((writer) => {
                                                        writer.setStyle('min-height', '500px', editor.editing.view.document.getRoot());
                                                        writer.setStyle('max-height', '800px', editor.editing.view.document.getRoot());
                                                        writer.setStyle('overflow-y', 'auto', editor.editing.view.document.getRoot());
                                                    });
                                                }}
                                                onChange={(event, editor) => {
                                                    const data = editor.getData();
                                                    field.onChange(data);

                                                }}
                                                config={{
                                                    language: 'fa',
                                                    toolbar: [
                                                        'heading', '|',
                                                        'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote', '|',
                                                        'imageUpload', 'insertTable', 'mediaEmbed', '|',
                                                        'undo', 'redo'
                                                    ],
                                                    image: {
                                                        toolbar: [
                                                            'imageTextAlternative',
                                                            'imageStyle:inline',
                                                            'imageStyle:block',
                                                            'imageStyle:side'
                                                        ]
                                                    }
                                                }}
                                            />
                                        )}
                                    />
                                    {errors.editorContent && (
                                        <FormFeedback style={{ display: 'block' }}>
                                            {errors.editorContent.message}
                                        </FormFeedback>
                                    )}
                                </Col>
                            </> :
                            <>
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
                                                    options={courseTypeList}
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
                                                    options={courseTermList}
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
                                                    options={classRoomList}
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
                                                    options={courseLevelList}
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
                                                    options={courseTeacherList}
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
                            </>
                    }

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

export default BasicInfo