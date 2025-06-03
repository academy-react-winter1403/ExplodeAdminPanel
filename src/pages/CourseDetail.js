import React, { useEffect, useState } from 'react'
import { NavLink, useLocation, useParams } from 'react-router-dom'
import { Button, Card, CardBody, Col, Row, Spinner, TabContent, Table, TabPane } from 'reactstrap'
import { getCourseById, getCourseGroups, getCoursePayments, getCoursePaymentsList, getCourseReserve, getCourseStatusList } from '../@core/services/courses'
import { useDispatch, useSelector } from 'react-redux'
import { setCourseGroups, setCoursePaymentListNotAccept, setCoursePaymentsDone, setCoursePaymentsNotDone, setCourseReserveList, setCourseStatus, setCourseStatusValue } from '../redux/courseDetailSlice'
import CourseGroups from '../components/CoursePage/CourseDetail/CourseGroups'
import CourseInfo from '../components/CoursePage/CourseDetail/CourseInfo'
import Tabs from './../components/CoursePage/CourseDetail/Tabs';
import Reserve from '../components/CoursePage/CourseDetail/Reserve'
import Student from './../components/CoursePage/CourseDetail/Students';
import PaymentDone from '../components/CoursePage/CourseDetail/PaymentDone'
import PaymentNotDone from '../components/CoursePage/CourseDetail/PaymentNotDone'
import PaymentNotAccept from '../components/CoursePage/CourseDetail/NotAcceptPayments'
import { ValidURL } from './../utility/ValidUrl';
import { getNewsById } from '../@core/services/blogs'

const CourseDetail = () => {
  const { id: courseId } = useParams()
  const [courseData, setCourseData] = useState({})
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState('1')
  const [statusList, setStatusList] = useState([])
  const dispatch = useDispatch()
  const { pathname } = useLocation()
  const isBlogs = pathname.includes('/blogdetail') ? true : false
  const { courseGroups, courseReserveList, coursePaymentsDone, coursePaymentsNotDone, coursePaymentListNotAccept } = useSelector((state) => state.courseDetails)

  const fetchData = async () => {
    setLoading(true)
    if (isBlogs) {
      const { detailsNewsDto } = await getNewsById(courseId)
      setCourseData(detailsNewsDto)
    }
    else {
      const result = await getCourseById(courseId)
      const courseGroups = await getCourseGroups({ CourseId: result.courseId, TeacherId: result.teacherId })
      const reserveResult = await getCourseReserve(courseId)
      const allPayments = await getCoursePayments(courseId)
      const notAcceptedPayment = await getCoursePaymentsList(courseId)
      const allStatus = await getCourseStatusList()
      setStatusList(allStatus)
      dispatch(setCourseStatusValue(result.courseStatusName))
      dispatch(setCourseReserveList(reserveResult))
      dispatch(setCourseGroups(courseGroups))
      dispatch(setCourseStatus(result.isActive))
      dispatch(setCoursePaymentsDone(allPayments.donePays))
      dispatch(setCoursePaymentsNotDone(allPayments.notDonePays))
      dispatch(setCoursePaymentListNotAccept(notAcceptedPayment))
      setCourseData(result)
    }
    setLoading(false)
  }

  const toggleTab = tab => {
    setActiveTab(tab)
  }

  useEffect(() => {
    fetchData()
  }, [courseId])

  if (loading) {
    return (
      <div className="text-center my-5">
        <Spinner color="primary" />
        {
          isBlogs ? <p className="mt-1">در حال دریافت اطلاعات بلاگ...</p> : <p className="mt-1">در حال دریافت اطلاعات دوره...</p>
        }
      </div>
    );
  }

  return (
    <>
      <Row>
        <Col sm='6'>
          <Card>
            <CardBody>
              <Col sm='12' className='d-flex justify-content-center'>
                <img src={isBlogs ? (ValidURL(courseData.currentImageAddress) ? courseData.currentImageAddress : '/src/assets/images/not-set-image.jpg') : (ValidURL(courseData.imageAddress) ? courseData.imageAddress : '/src/assets/images/not-set-image.jpg')} style={{ width: '100%', height: '430px', borderRadius: '10px' }} />
              </Col>
              {
                isBlogs && <NavLink to={`/editblog/${courseData.id}`} style={{ width: '100%', marginTop: '30px', display: 'block' }}><Button style={{ width: '100%' }} color='primary'>ویرایش</Button></NavLink>
              }
              <Col sm='12' className='mt-3 '>
                <h4 className='mb-2'>{isBlogs ? 'عنوان بلاگ' : 'عنوان دوره'}  : <span style={{ marginRight: '5px' }}>{courseData.title}</span></h4>
                <div>
                  <h4>{isBlogs ? 'توضیحات بلاگ :' : 'توضیحات دوره :'}</h4>
                  {courseData.describe}
                </div>
                {
                  isBlogs ?
                    <>
                    </>
                    :
                    <>
                      <CourseInfo courseData={courseData} courseId={courseId} allStatus={statusList} />
                      <CourseGroups courseGroups={courseGroups} courseId={courseId} />
                    </>
                }
              </Col>
            </CardBody>
          </Card>
        </Col>

        <Col sm='6'>
          <Card>
            <CardBody>

              {
                isBlogs ?
                  <>
                    <Table responsive>
                      <thead>
                        <tr>
                          <th>فیلد</th>
                          <th>اطلاعات</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>توضیح کوتاه</td>
                          <td>{courseData.miniDescribe}</td>
                        </tr>

                        <tr>
                          <td>عنوان گوگل</td>
                          <td>{courseData.googleTitle}</td>
                        </tr>

                        <tr>
                          <td>توضیح گوگل</td>
                          <td>{courseData.googleDescribe}</td>
                        </tr>

                        <tr>
                          <td>کلمه کلیدی</td>
                          <td>{courseData.keyword}</td>
                        </tr>

                        <tr>
                          <td>دسته بندی</td>
                          <td>{courseData.newsCatregoryName}</td>
                        </tr>

                        <tr>
                          <td>نویسنده</td>
                          <td>{courseData.addUserFullName}</td>
                        </tr>
                      </tbody>
                    </Table>
                  </>
                  :
                  <>
                    <Tabs className='mb-2' activeTab={activeTab} toggleTab={toggleTab} />
                    <TabContent activeTab={activeTab}>
                      <TabPane tabId='1'>
                        <Reserve courseId={courseId} courseReserveList={courseReserveList} courseGroups={courseGroups} />
                      </TabPane>

                      <TabPane tabId='2'>
                        <Student courseReserveList={courseReserveList} />
                      </TabPane>

                      <TabPane tabId='3'>
                        <PaymentDone payments={coursePaymentsDone} />
                      </TabPane>

                      <TabPane tabId='4'>
                        <PaymentNotDone payments={coursePaymentsNotDone} />
                      </TabPane>

                      <TabPane tabId='5'>
                        <PaymentNotAccept payments={coursePaymentListNotAccept} courseId={courseId} />
                      </TabPane>
                    </TabContent>
                  </>
              }


            </CardBody>
          </Card>
        </Col>
      </Row>



    </>

  )
}

export default CourseDetail