import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Table from '../components/CoursePage/Table'
import { fetchAllCourses, fetchCoursesListData } from '../redux/coursesSlice'
import { Spinner } from 'reactstrap'

const CoursesList = () => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const fetchData = async () => {
    try {
      setLoading(true)
      await dispatch(fetchAllCourses())
      await dispatch(fetchCoursesListData())
      setLoading(false)
    } catch {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData();
  }, [])
  if (loading) {
    return (
      <div className="text-center my-5">
        <Spinner color="primary" />
        <p className="mt-1">در حال دریافت اطلاعات دوره...</p>
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