import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Table from '../components/CoursePage/Table'
import { fetchAllCourses, fetchCoursesListData } from '../redux/coursesSlice'
import { Spinner } from 'reactstrap'
import { useLocation } from 'react-router-dom'
import { fetchBlogs } from '../redux/blogSlice'

const CoursesList = () => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const { pathname } = useLocation()
  const blogs = pathname == '/blogList' ? true : false
  const fetchData = async () => {
    try {
      setLoading(true)
      if (blogs) {
        await dispatch(fetchBlogs())
      }
      else {
        await dispatch(fetchAllCourses())
        await dispatch(fetchCoursesListData())
      }
      setLoading(false)
    } catch {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData();
  }, [pathname])
  if (loading) {
    return (
      <div className="text-center my-5">
        <Spinner color="primary" />
        <p className="mt-1">{blogs ? 'درحال دریافت اطلاعات بلاگ ها ...' : 'در حال دریافت اطلاعات دوره ها ...'}</p>
      </div>
    );
  }
  return (
    <>
      <Table />
    </>
  )
}

export default CoursesList