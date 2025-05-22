// ** React Imports
import { Fragment } from 'react'

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
import { Form, Label, Input, Row, Col, Button, FormFeedback } from 'reactstrap'
import { useNavigate } from 'react-router-dom'
const AddTechnology = () => {
    const navigate = useNavigate()
    const {
        control,
        handleSubmit,
        formState: { errors }
    } = useForm()

    const onSubmit = () => {
        if (isObjEmpty(errors)) {
            console.log('is Ok')
            navigate('/coursesList')
        }
    }
    return (
        <Fragment>
            <div className='content-header'>
                <h5 className='mb-0'>تکنولوژی</h5>
                <small className='text-muted'>تکنولوژی دوره را امتخاب کنید سپس ثبت را بزنید</small>
            </div>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Row>
                    <Col md='6' className='mb-1'>
                        <Label className='form-label' for='firstTechnology'>
                            تکنولوژی اول
                        </Label>
                        <Select
                            theme={selectThemeColors}
                            isClearable={false}
                            id={`firstTechnology`}
                            className='react-select'
                            classNamePrefix='select'
                            options={''}
                            defaultValue={''}
                            name='firstTechnology'
                        />
                    </Col>

                    <Col md='6' className='mb-1'>
                        <Label className='form-label' for='secondTechnology'>
                            تکنولوژی دوم
                        </Label>
                        <Select
                            theme={selectThemeColors}
                            isClearable={false}
                            id={`secondTechnology`}
                            className='react-select'
                            classNamePrefix='select'
                            options={''}
                            defaultValue={''}
                            name='secondTechnology'
                        />
                    </Col>
                </Row>
                <div className='d-flex justify-content-start'>
                    <Button type='submit' color='success' className='btn-next'>
                        <span className='align-middle d-sm-inline-block d-none'>ثبت دوره</span>
                    </Button>
                </div>
            </Form>
        </Fragment>
    )

}

export default AddTechnology