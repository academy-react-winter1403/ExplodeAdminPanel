import React, { useState } from 'react'
import { Col, Row, TabContent, TabPane, CardBody, Card, CardTitle, Label, Input, Button, Spinner } from 'reactstrap'
import CoursesTable from './CoursesTable'
import Tabs from './Tabs'
import ReactPaginate from 'react-paginate'
import { useDispatch, useSelector } from 'react-redux'
// ** Third Party Components
import Select from 'react-select'
import StatsHorizontal from "@components/widgets/stats/StatsHorizontal";
import CountUp from "react-countup";
// ** Utils
import { selectThemeColors } from '@utils'
import { fetchAllCourses, setCurrentPage, setQuery, setRowsOfPage } from '../../redux/coursesSlice'
import AddCourse from './AddCourse'
import { Book, User } from 'react-feather'
import { useLocation } from 'react-router-dom'
import { fetchBlogs, setBlogQuery, setBlogsCurrentPage, setBlogStatus } from '../../redux/blogSlice'
const Table = () => {
    const { pathname } = useLocation()
    const blogs = pathname == '/blogList' ? true : false
    const [activeTab, setActiveTab] = useState('1')
    const dispatch = useDispatch()
    const [contentLoading, setContentLoading] = useState(false)
    const [counter, setCounter] = useState(10)
    const [blogs_Status, setBlogsStatus] = useState(true)
    const { rowsOfPage } = useSelector((state) => state.courses)
    const toggleTab = tab => {
        setActiveTab(tab)
    }
    const handlePagination = (page) => {
        if (blogs) {
            dispatch(setBlogsCurrentPage(page.selected + 1))
            dispatch(fetchBlogs())
        }
        else {
            dispatch(setCurrentPage(page.selected + 1))
            dispatch(fetchAllCourses())
        }
        window.scrollTo(0, 0)
    }
    const { totalCount, currentPage, activeCourses, notActiveCourses, allCoursesCount, deletedCourses } = useSelector((state) => state.courses)
    const { activeTotalCount, currentPageBlog, blogRowsOfPage } = useSelector((state) => state.blogs)

    const handleSearch = async () => {
        setContentLoading(true)
        if (blogs) {
            dispatch(setBlogsCurrentPage(1))
            dispatch(setBlogStatus(blogs_Status))
            await dispatch(fetchBlogs())
        }

        else {
            dispatch(setCurrentPage(1))
            dispatch(setRowsOfPage(counter))
            await dispatch(fetchAllCourses())
        }
        setContentLoading(false)
    }

    const Rows_Of_Page = [
        { value: 5, label: '5' },
        { value: 10, label: '10' },
        { value: 15, label: '15' },
    ]

    const blogsStatus = [
        { value: true, label: 'فعال' },
        { value: false, label: 'غیر فعال' },
    ]
    return (
        <Row>
            {
                blogs ? '' :
                    <>
                        <Col lg="3" sm="3">
                            <StatsHorizontal
                                color="primary"
                                statTitle="کل دوره ها"
                                icon={<Book size={20} />}
                                renderStats={
                                    <h3 className="fw-bolder mb-75">
                                        {" "}
                                        <CountUp
                                            start={0}
                                            end={allCoursesCount}
                                            duration={3}
                                            separator=","
                                            style={{ fontSize: "2rem", fontWeight: "bold" }}
                                        />
                                    </h3>
                                }
                            />
                        </Col>
                        <Col lg="3" sm="3">
                            <StatsHorizontal
                                color="success"
                                statTitle="دوره های فعال "
                                icon={<Book size={20} />}
                                renderStats={
                                    <h3 className="fw-bolder mb-75">
                                        {" "}
                                        <CountUp
                                            start={0}
                                            end={activeCourses}
                                            duration={3}
                                            separator=","
                                            style={{ fontSize: "2rem", fontWeight: "bold" }}
                                        />
                                    </h3>
                                }
                            />
                        </Col>
                        <Col lg="3" sm="3">
                            <StatsHorizontal
                                color="warning"
                                statTitle="دوره های غیر فعال "
                                icon={<Book size={20} />}
                                renderStats={
                                    <h3 className="fw-bolder mb-75">
                                        {" "}
                                        <CountUp
                                            start={0}
                                            end={notActiveCourses}
                                            duration={3}
                                            separator=","
                                            style={{ fontSize: "2rem", fontWeight: "bold" }}
                                        />
                                    </h3>
                                }
                            />
                        </Col>
                        <Col lg="3" sm="3">
                            <StatsHorizontal
                                color="danger"
                                statTitle="دوره های حذف شده "
                                icon={<Book size={20} />}
                                renderStats={
                                    <h3 className="fw-bolder mb-75">
                                        {" "}
                                        <CountUp
                                            start={0}
                                            end={deletedCourses}
                                            duration={3}
                                            separator=","
                                            style={{ fontSize: "2rem", fontWeight: "bold" }}
                                        />
                                    </h3>
                                }
                            />
                        </Col>
                    </>
            }

            <Col sm='12'>
                <Card className='p-1'>
                    <CardTitle>{blogs ? 'فیلتر بلاگ ' : 'فیلتر دوره '}</CardTitle>
                    <CardBody >
                        <Row>
                            <Col sm='6'>
                                <Label>{blogs ? 'جستجو در نام بلاگ' : 'جستجو در نام دوره'}</Label>
                                <Input type='text' id='basicinput' placeholder={blogs ? 'نام بلاگ را وارد کنید' : 'نام دوره را وارد کنید'} onChange={blogs ? (event) => dispatch(setBlogQuery(event.target.value)) : (event) => dispatch(setQuery(event.target.value))} />
                            </Col>
                            <Col sm='6'>
                                <Label>{blogs ? 'وضعیت' : 'تعداد در صفحه'}</Label>
                                <Select
                                    theme={selectThemeColors}
                                    className='react-select'
                                    classNamePrefix='select'
                                    defaultValue={blogs ? blogsStatus[0] : Rows_Of_Page[1]}
                                    options={blogs ? blogsStatus : Rows_Of_Page}
                                    isClearable={false}
                                    onChange={blogs ? (option) => setBlogsStatus(option.value) : (option) => setCounter(option)}
                                />
                            </Col>
                        </Row>
                        <Button color='primary' style={{ width: '100%', marginTop: '10px' }} onClick={handleSearch}>{contentLoading ? <Spinner /> : 'جستجو'}</Button>
                    </CardBody>
                </Card>
            </Col>

            <Col sm='12'>
                <Card className='p-1'>
                    <Tabs className='mb-2' activeTab={activeTab} toggleTab={toggleTab} />
                    <TabContent activeTab={activeTab}>
                        <TabPane tabId='1'>
                            <Card >
                                <CardBody className='bg-white'>
                                    <CoursesTable />
                                    <ReactPaginate
                                        previousLabel={''}
                                        nextLabel={''}
                                        pageCount={blogs ? Math.ceil(activeTotalCount / blogRowsOfPage) : Math.ceil(totalCount / rowsOfPage)}
                                        activeClassName='active'
                                        forcePage={blogs ? (currentPageBlog !== 0 ? currentPageBlog - 1 : 0) : (currentPage !== 0 ? currentPage - 1 : 0)}
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
                            <AddCourse />
                        </TabPane>

                    </TabContent>
                </Card>
            </Col>


        </Row>
    )
}

export default Table