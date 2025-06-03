// ** React Imports
import { Fragment, useState } from 'react'
import { Button, Row, Spinner } from 'reactstrap'
import { ArrowLeft, ArrowRight } from 'react-feather'
import { useDispatch, useSelector } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit'
import MainImage from './MainImage';
import { fetchEditCourse, setCourseId, setCourseImage, setCourseUUID } from '../../../redux/editCourse';
import { useNavigate } from 'react-router-dom';
import { updateBlogInfo } from '../../../@core/services/blogs';

const ImageUploader = ({ stepper, courseData, courseId, isBlogs }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    const { courseTitle } = useSelector((state) => state.addCourse)
    const { newBlogData, blogId, blogImage } = useSelector((state) => state.blogCategories)
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

    const handleOnClick = async () => {

        try {
            setLoading(true)
            if (isBlogs) {
                await updateBlogInfo(newBlogData, blogId, blogImage)
                navigate(`/blogdetail/${blogId}`)
                
            }
            else {
                dispatch(setCourseId(courseData.courseId))
                dispatch(setCourseUUID(generateUniqueUrlString(courseTitle)))
                const result = await dispatch(fetchEditCourse(setLoading))
                dispatch(setCourseImage(null))
                if (result.payload.id) {
                    setFiles([])
                    navigate(`/coursedetail/${result.payload.id}`)
                }
            }
            setLoading(false)
        }
        catch {
            setLoading(false)
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

export default ImageUploader