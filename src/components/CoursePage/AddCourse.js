import React, { useRef, useState } from 'react'
import Wizard from '@components/wizard'
import CourseBasicInfo from './CourseBasicInfo'
import '@styles/react/libs/flatpickr/flatpickr.scss'
import CourseDescription from './CourseDescription'
import CourseImage from './CourseImage'
import AddTechnology from './AddTechnology'
const AddCourse = () => {
    // ** Ref
    const ref = useRef(null)

    // ** State
    const [stepper, setStepper] = useState(null)

    const steps = [
        {
            id: 'basic-information',
            title: 'اطلاعات اولیه',
            subtitle: 'اطلاعات اولیه و اجباری ',
            content: <CourseBasicInfo stepper={stepper} />
        },
        {
            id: 'course-descriptions',
            title: 'توضیحات دوره',
            subtitle: 'عنوان و توضیحات',
            content: <CourseDescription stepper={stepper} />
        },
        {
            id: 'course-image',
            title: 'عکس',
            subtitle: 'تام نیل و عکس اصلی دوره',
            content: <CourseImage stepper={stepper} />
        },
        {
            id: 'course-technology',
            title: 'تکنولوژی',
            subtitle: 'مرحله پایانی و ثبت تکنولوژی دوره',
            content: <AddTechnology stepper={stepper} />
        }

    ]
    return (
        <div className='horizontal-wizard'>
            <Wizard instance={el => setStepper(el)} ref={ref} steps={steps} />
        </div>
    )
}

export default AddCourse