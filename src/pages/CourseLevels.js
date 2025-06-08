import React, { useEffect, useState } from 'react'
import { Card, CardBody, Col, Row, Spinner } from 'reactstrap'
import { useDispatch } from 'react-redux';
import CourseLevelTable from '../components/CoursePage/CourseLevels/Table';
import { fetchCourseLevels } from '../redux/coursesSlice';




const CourseLevels = () => {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const fetchData = async () => {
        try {
            setLoading(true)
            await dispatch(fetchCourseLevels())
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
                            <CourseLevelTable />
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default CourseLevels