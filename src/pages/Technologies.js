import React, { useEffect, useState } from 'react'
import { Card, CardBody, CardHeader, Col, Row, Spinner } from 'reactstrap'
import { useDispatch } from 'react-redux';
import { fetchAllTechnologies, fetchBuldings, fetchDepartments } from '../redux/coursesSlice';
import TechnologiesTable from '../components/CoursePage/Technology/Table';



const Technologies = () => {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const fetchData = async () => {
        try {
            setLoading(true)
            await dispatch(fetchAllTechnologies())
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
                            <TechnologiesTable />
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default Technologies