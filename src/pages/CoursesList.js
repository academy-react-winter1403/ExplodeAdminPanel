import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Table from '../components/CoursePage/Table'
import { fetchAllCourses } from '../redux/coursesSlice'

const CoursesList = () => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const { courses } = useSelector((state) => state.courses)
  const fetchData = async () => {
    setLoading(true)
    await dispatch(fetchAllCourses())
    setLoading(false)
  }

  useEffect(() => {
    fetchData();
  }, [])

  return (
    <>
      <Table />
    </>
  )
}

export default CoursesList