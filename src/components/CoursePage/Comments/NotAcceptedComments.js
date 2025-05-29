import React, { useEffect, useState } from 'react'
import Tabs from './Tabs'
import { Card, CardBody, Col, TabContent, TabPane } from 'reactstrap'
import TableData from './NotAcceptedComments/Table'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux';
import { fetchCourseNotAcceptedComments, setCourseId } from '../../../redux/coursesSlice'





const NotAcceptedComments = ({ courseId }) => {
    const [activeTab, setActiveTab] = useState('1')
    const toggleTab = tab => {
        setActiveTab(tab)
    }
    const dispatch = useDispatch()
    const { notAcceptedMains } = useSelector((state) => state.courses)
    const { notAcceptedReplies } = useSelector((state) => state.courses)
    useEffect(() => {
        dispatch(setCourseId(courseId))
        dispatch(fetchCourseNotAcceptedComments())
    }, [courseId])
    return (
        <Col sm='12'>
            <Tabs className='mb-2' activeTab={activeTab} toggleTab={toggleTab} />
            <TabContent activeTab={activeTab}>
                <TabPane tabId='1'>
                    <Col sm='12'>
                        <Card>
                            <CardBody>
                                <TableData data={notAcceptedMains} />
                            </CardBody>
                        </Card>
                    </Col>
                </TabPane>

                <TabPane tabId='2'>
                    <Card>
                        <CardBody>
                            <TableData data={notAcceptedReplies} />
                        </CardBody>
                    </Card>
                </TabPane>

            </TabContent>
        </Col>
    )
}

export default NotAcceptedComments