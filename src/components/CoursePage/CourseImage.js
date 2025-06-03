// ** React Imports
import { Fragment, useState } from 'react'
import MainImage from './MainImage'
import { Button, Row, Spinner } from 'reactstrap'
import { ArrowLeft, ArrowRight } from 'react-feather'
import { useDispatch, useSelector } from 'react-redux';
import { fetchAddCourse, setCourseImage, setCourseUUID } from '../../redux/addCourseSlice';
import { nanoid } from '@reduxjs/toolkit'
import { useForm } from 'react-hook-form';
import { createNewBlog } from '../../@core/services/blogs';
import toast from 'react-hot-toast';

const CourseImage = ({ stepper, isBlogs }) => {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const { courseTitle } = useSelector((state) => state.addCourse)
    const { newBlogData, blogImage } = useSelector((state) => state.blogCategories)
    const [files, setFiles] = useState([])
    const generateUniqueUrlString = (title) => {
        const slug = title
            .toLowerCase()
            .trim()
            .replace(/\s+/g, '-')     // فاصله‌ها → خط تیره
            .replace(/[^\w\-]+/g, '') // حذف کاراکترهای خاص
            .substring(0, 50);         // محدود به ۵۰ کاراکتر

        const uniqueId = nanoid(5); // مقدار یکتا

        return `${slug}-${uniqueId}`; // خروجی نهایی
    };

    const {
    } = useForm()

    const handleOnClick = async () => {
        if (isBlogs) {
            try {
                setLoading(true)
                const { message } = await createNewBlog(newBlogData,blogImage)
                setLoading(false)
                if (message == "عملیات با موفقیت انجام شد.") {
                    toast.success('بلاگ مورد نظر اضاف شد و پس از فعال کردن در لیست بلاگ ها نمایش داده میشود')
                    setFiles([])
                    stepper.to(1)
                }
            }
            catch {
                setLoading(false)
            }
        }
        else {
            try {
                dispatch(setCourseUUID(generateUniqueUrlString(courseTitle)))
                setLoading(true)
                const result = await dispatch(fetchAddCourse(setLoading))
                dispatch(setCourseImage(false))
                setLoading(false)
                if (result.payload.id) {
                    setFiles([])
                }
                stepper.next()
            }
            catch {
                setLoading(false)
            }
        }
    }
    return (
        <Fragment>
            <Row>
                <MainImage files={files} setFiles={setFiles} isBlogs={isBlogs} />
            </Row>
            <div className='d-flex justify-content-between'>
                <Button type='button' color='primary' className='btn-prev' onClick={() => stepper.previous()}>
                    <ArrowLeft size={14} className='align-middle me-sm-25 me-0'></ArrowLeft>
                    <span className='align-middle d-sm-inline-block d-none'>مرحله قبل</span>
                </Button>
                <Button type='button' color='primary' className='btn-next' onClick={handleOnClick} >
                    {
                        loading ? <Spinner /> : <>
                            <span className='align-middle d-sm-inline-block d-none'>مرحله بعد</span>
                            <ArrowRight size={14} className='align-middle ms-sm-25 ms-0'></ArrowRight>
                        </>
                    }

                </Button>
            </div>
        </Fragment>
    )
}

export default CourseImage