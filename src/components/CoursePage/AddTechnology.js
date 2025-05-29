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
import { useSelector } from 'react-redux'
import { addTechnologyForCourse } from '../../@core/services/courses'
const AddTechnology = ({ resetForm, stepper }) => {

    const { courseTechnologies } = useSelector((state) => state.addCourse)
    const { courseId } = useSelector((state) => state.addCourse)
    const [loading, setLoading] = useState(false)
    const fieldsSchema = yup.object().shape({
        courseTechnology: yup
            .array()
            .of(
                yup.object().shape({
                    value: yup.string().required('تکنولوژی دوره را انتخاب کنید'),
                    label: yup.string().required(),
                })
            )
            .min(1, 'حداقل یک تکنولوژی انتخاب کنید')
            .required('تکنولوژی دوره را انتخاب کنید'),
    });

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(fieldsSchema),
        defaultValues: {
            courseTechnology: [], // مقدار اولیه برای multi-select
        },
    });

    const onSubmit = async (data) => {
        const techData = data.courseTechnology.map((tech) => ({
            techId: tech.value,
        }));
        setLoading(true)
        await addTechnologyForCourse(courseId, techData)
        setLoading(false)
        stepper.to(1)

        console.log(techData)
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
                            render={({ field }) => (
                                <>
                                    <Select
                                        {...field}
                                        isMulti
                                        theme={selectThemeColors}
                                        isClearable={true}
                                        id="courseTechnology"
                                        className={`react-select ${errors.courseTechnology ? 'is-invalid' : ''}`}
                                        classNamePrefix="select"
                                        options={courseTechnologies}
                                        placeholder="انتخاب کنید"
                                        onChange={(selected) => field.onChange(selected || [])}
                                        value={field.value}
                                    />
                                    {errors.courseTechnology && (
                                        <FormFeedback style={{ display: 'block' }}>
                                            {errors.courseTechnology.message}
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