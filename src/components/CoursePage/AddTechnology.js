// ** React Imports
import { Fragment, useState } from 'react'

// ** Utils
import { isObjEmpty } from '@utils'

// ** Third Party Components
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { ArrowLeft, ArrowRight } from 'react-feather'
import { yupResolver } from '@hookform/resolvers/yup'
import Select from 'react-select'
import { selectThemeColors } from '@utils'
// ** Reactstrap Imports
import { Form, Label, Input, Row, Col, Button, FormFeedback, Spinner } from 'reactstrap'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { addTechnologyForCourse } from '../../@core/services/courses'
const AddTechnology = () => {
    const navigate = useNavigate()
    const { courseTechnologies } = useSelector((state) => state.addCourse)
    const { courseId } = useSelector((state) => state.addCourse)
    const [loading, setLoading] = useState(false)
    const fieldsSchema = yup.object().shape({
        courseTechnology: yup.object({
            value: yup.string().required('تکنولوژی دوره را انتخاب کنید'),
        })
            .nullable()
            .required('تکنولوژی دوره را انتخاب کنید'),

        courseSecondTechnology: yup.object({
            value: yup.string().required('تکنولوژی دوره را انتخاب کنید'),
        })
            .nullable()
            .required('تکنولوژی دوره را انتخاب کنید'),
    })
    const {
        control,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(fieldsSchema),
        defaultValues: {
            courseTechnology: null,
            courseSecondTechnology: null,
        }
    })

    const onSubmit = async (data) => {
        const techData = [
            {
                "techId": data.courseTechnology.value
            },
            {
                "techId": data.courseSecondTechnology.value
            }
        ]
        setLoading(true)
        await addTechnologyForCourse(courseId, techData)
        setLoading(false)
        navigate('/coursesList')
    }
    return (
        <Fragment>
            <div className='content-header'>
                <h5 className='mb-0'>تکنولوژی</h5>
                <small className='text-muted'>تکنولوژی دوره را امتخاب کنید سپس ثبت را بزنید</small>
            </div>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Row>
                    <Col md='4' className='mb-1'>
                        <Label className='form-label' for='courseTechnology'>
                            تکنولوژی دوره
                        </Label>
                        <Controller
                            name="courseTechnology"
                            control={control}
                            render={({ field, fieldState: { error } }) => (
                                <>
                                    <Select
                                        {...field}
                                        value={field.value}
                                        theme={selectThemeColors}
                                        isClearable={false}
                                        id="courseTechnology"
                                        className={`react-select ${error ? 'is-invalid' : ''}`}
                                        classNamePrefix='select'
                                        options={courseTechnologies}
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
                        <Label className='form-label' for='courseSecondTechnology'>
                            تکنولوژی دوره
                        </Label>
                        <Controller
                            name="courseSecondTechnology"
                            control={control}
                            render={({ field, fieldState: { error } }) => (
                                <>
                                    <Select
                                        {...field}
                                        value={field.value}
                                        theme={selectThemeColors}
                                        isClearable={false}
                                        id="courseSecondTechnology"
                                        className={`react-select ${error ? 'is-invalid' : ''}`}
                                        classNamePrefix='select'
                                        options={courseTechnologies}
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
                <div className='d-flex justify-content-start'>
                    <Button type='submit' color='success' className='btn-next'>
                        {
                            loading ? <Spinner /> : <span className='align-middle d-sm-inline-block d-none'>ثبت دوره</span>
                        }
                    </Button>
                </div>
            </Form>
        </Fragment>
    )

}

export default AddTechnology