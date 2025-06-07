import React, { useEffect, useState } from 'react'
import { Card, CardBody, Col, Spinner, TabContent, TabPane } from 'reactstrap'
import Tabs from '../components/Buildings/Tabs'
import ActiveBuildings from '../components/Buildings/ActiveBuildings'
import NotActiveBuildings from '../components/Buildings/NotActiveBuildings'
import { useDispatch } from 'react-redux'
import { fetchBuldings } from '../redux/coursesSlice'

const Buildings = () => {
    const [activeTab, setActiveTab] = useState('1')
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const toggleTab = tab => {
        setActiveTab(tab)
    }
    const fetchData = async () => {
        try {
            setLoading(true)
            await dispatch(fetchBuldings())
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
                <p className="mt-1"> درحال دریافت اطلاعات ... </p>
            </div>
        );
    }
    return (
        <>

            <Col sm='12'>
                <Card className='p-1'>
                    <Tabs className='mb-2' activeTab={activeTab} toggleTab={toggleTab} />
                    <TabContent activeTab={activeTab}>
                        <TabPane tabId='1'>
                            <Card >
                                <CardBody >
                                    <ActiveBuildings />
                                </CardBody>
                            </Card>
                        </TabPane>

                        <TabPane tabId='2'>
                            <CardBody>
                                <NotActiveBuildings />
                            </CardBody>
                        </TabPane>
                    </TabContent>
                </Card>
            </Col>
        </>
    )
}

export default Buildings