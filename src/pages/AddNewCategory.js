import React, { useEffect, useState } from 'react'
import { Button, Card, CardBody, CardHeader, Col, Row, Spinner } from 'reactstrap';
import CategoryTable from '../components/BlogPage/CategoryTable';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { fetchCategories } from '../redux/blogCategoriesSlice';

const AddNewCategory = () => {
  const { categories } = useSelector((state) => state.blogCategories)
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const { pathname } = useLocation()
  const fetchData = async() => {
    try {
      setLoading(true)
      await dispatch(fetchCategories())
      setLoading(false)
    }
    catch {
      setLoading(true)
    }
  }
  useEffect(() => {
    fetchData()
  }, [pathname])

  if (loading) {
    return (
      <div className="text-center my-5">
        <Spinner color="primary" />
        <p className="mt-1">در حال دریافت دسته بندی ها ...</p>
      </div>
    );
  }

  return (
    <Row>
      <Col sm='12'>
        <Card>
          <CardBody>
            <CategoryTable categories={categories} />
          </CardBody>
        </Card>
      </Col>
    </Row>
  )
}

export default AddNewCategory