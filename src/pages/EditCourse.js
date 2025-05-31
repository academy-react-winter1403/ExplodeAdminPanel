import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getCourseById, getCourseInfoForCreate } from '../@core/services/courses'
import { useDispatch } from 'react-redux'
import { setBasicInfo } from '../redux/editCourse'
import { Spinner } from 'reactstrap'
import Wizard from '@components/wizard'
import BasicInfo from '../components/CoursePage/EditCourse/BasicInfo'
import '@styles/react/libs/flatpickr/flatpickr.scss'
import Description from '../components/CoursePage/EditCourse/Description'
import ImageUploader from '../components/CoursePage/EditCourse/ImageUploader'
const EditCourse = () => {
    // ** Ref
    const ref = useRef(null)
    // ** State
    const [stepper, setStepper] = useState(null)
    const [loading, setLoading] = useState(false)
    const { id: courseId } = useParams()
    const [courseData, setCourseData] = useState({})
    const dispatch = useDispatch()
    const fetchData = async () => {
        try {
            setLoading(true)
            const basicInfo = await getCourseInfoForCreate()
            const result = await getCourseById(courseId)
            setCourseData(result)
            dispatch(setBasicInfo(basicInfo))
            setLoading(false)
        }
        catch {
            setLoading(false)
        }

    }
    useEffect(() => {
        if (courseId) {
            fetchData()
        }
    }, [courseId])

    if (loading) {
        return (
            <div className="text-center my-5">
                <Spinner color="primary" />
                <p className="mt-1">در حال دریافت اطلاعات دوره...</p>
            </div>
        );
    }


    const steps = [
        {
            id: 'basic-info',
            title: 'اطلاعات اولیه',
            subtitle: 'اطلاعات اولیه (اجباری) ',
            content: <BasicInfo stepper={stepper} courseData={courseData} />
        },
        {
            id: 'course-desc',
            title: 'توضیحات دوره',
            subtitle: 'عنوان و توضیحات (اجباری)',
            content: <Description stepper={stepper} courseData={courseData} />
        },
        {
            id: 'course-img',
            title: 'عکس',
            subtitle: 'عکس اصلی دوره',
            content: <ImageUploader stepper={stepper} courseData={courseData}/>
        }
    ]
    return (
        <div className='horizontal-wizard'>
            <Wizard instance={el => setStepper(el)} ref={ref} steps={steps} />
        </div>
    )
}

export default EditCourse