import React, { useEffect, useState } from 'react'
import { Card, CardBody, Col, Row, Spinner } from 'reactstrap'
import { useDispatch } from 'react-redux';
import { fetchAllStatus } from '../redux/coursesSlice';
import CourseStatusTable from '../components/CoursePage/CourseStatus/Table';




const CourseLevels = () => {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const fetchData = async () => {
        try {
            setLoading(true)
            await dispatch(fetchAllStatus())
            setLoading(false)
        }
        catch {
            setLoading(false)
        }
    }
    useEffect(() => {
        fetchData()
    }, [])

    if (loading) {
        return (
            <div className="text-center my-5">
                <Spinner color="primary" />
                <p className="mt-1">در حال دریافت اطلاعات ...</p>
            </div>
        );
    }
    return (
        <>
            <Row>
                <Col>
                    <Card>
                        <CardBody>
                            <CourseStatusTable />
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default CourseLevels