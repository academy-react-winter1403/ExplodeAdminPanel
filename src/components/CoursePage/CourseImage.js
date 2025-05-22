// ** React Imports
import { Fragment } from 'react'


import MainImage from './MainImage'
import Thumbnail from './Thumbnail'
import { Button, Row } from 'reactstrap'
import { ArrowLeft, ArrowRight } from 'react-feather'

const CourseImage = ({ stepper }) => {
    const handleOnClick = () => {
        stepper.next()
    }
    return (
        <Fragment>
            <Row>
                <MainImage />
                <Thumbnail />
            </Row>
            <div className='d-flex justify-content-between'>
                <Button type='button' color='primary' className='btn-prev' onClick={() => stepper.previous()}>
                    <ArrowLeft size={14} className='align-middle me-sm-25 me-0'></ArrowLeft>
                    <span className='align-middle d-sm-inline-block d-none'>مرحله قبل</span>
                </Button>
                <Button type='button' color='primary' className='btn-next' onClick={handleOnClick} >
                    <span className='align-middle d-sm-inline-block d-none'>مرحله بعد</span>
                    <ArrowRight size={14} className='align-middle ms-sm-25 ms-0'></ArrowRight>
                </Button>
            </div>
        </Fragment>
    )
}

export default CourseImage