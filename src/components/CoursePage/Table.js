import React, { useState } from 'react'
import { Col, Row, TabContent, TabPane, CardBody, Card } from 'reactstrap'
import CoursesTable from './CoursesTable'
import Tabs from './Tabs'
import ReactPaginate from 'react-paginate'
import { useDispatch, useSelector } from 'react-redux'

import { fetchAllCourses, setCurrentPage } from '../../redux/coursesSlice'
import AddCourse from './AddCourse'
const Table = () => {
    const [activeTab, setActiveTab] = useState('1')
    const dispatch = useDispatch()
    const toggleTab = tab => {
        setActiveTab(tab)
    }
    const handlePagination = (page) => {
        dispatch(setCurrentPage(page.selected + 1))
        dispatch(fetchAllCourses())
        window.scrollTo(0, 0)
    }
    const { totalCount, currentPage } = useSelector((state) => state.courses)
    return (
        <Row>
            <Col sm="12">
                <Tabs className='mb-2' activeTab={activeTab} toggleTab={toggleTab} />
                <TabContent activeTab={activeTab}>
                    <TabPane tabId='1'>
                        <Card >
                            <CardBody className='bg-white'>
                                <CoursesTable />
                                <ReactPaginate
                                    previousLabel={''}
                                    nextLabel={''}
                                    pageCount={Math.ceil(totalCount / 10)}
                                    activeClassName='active'
                                    forcePage={currentPage !== 0 ? currentPage - 1 : 0}
                                    onPageChange={page => handlePagination(page)}
                                    pageClassName={'page-item'}
                                    nextLinkClassName={'page-link'}
                                    nextClassName={'page-item next'}
                                    previousClassName={'page-item prev'}
                                    previousLinkClassName={'page-link'}
                                    pageLinkClassName={'page-link'}
                                    containerClassName={'pagination react-paginate justify-content-center my-2 pe-1'}
                                />
                            </CardBody>
                        </Card>
                    </TabPane>

                    <TabPane tabId='2'>
                        <Card >
                            <CardBody className='bg-white'>
                                <AddCourse />
                            </CardBody>
                        </Card>
                    </TabPane>
                </TabContent>

            </Col>


        </Row>
    )
}

export default Table