import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Table from '../components/CoursePage/Table'
import { fetchAllCourses, fetchCoursesListData } from '../redux/coursesSlice'

const CoursesList = () => {
  const dispatch = useDispatch()

  const fetchData = async () => {
    await dispatch(fetchAllCourses())
    await dispatch(fetchCoursesListData())
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