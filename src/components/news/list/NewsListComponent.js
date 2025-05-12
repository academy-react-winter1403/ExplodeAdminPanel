import {Row, Col} from "reactstrap";
import StatsHorizontal from "./StatsHorizontal.js";
import NewsTable from "./NewsTable.js";
import { User, UserCheck, UserX } from 'react-feather'
import { newsCount, newsList } from "./newsList.js";
import { useEffect, useState } from "react";

function NewsListComponent() {

  const [news, setNews] = useState([])
  const [allNews, setAllNews] = useState([])
  const [statics , setStatics] = useState([]);
  const [search, setSearch] = useState('')
  const [activation, setActivation] = useState({ value: '', label: 'انتخاب وضعیت' })
  const [currentPage, setCurrentPage] = useState(1)


  const getAllNewsList = async(currentPage, search, activation)=>{
    try {
      const result = await newsList(10, currentPage, search, activation)
      setNews(result.news)
      
    } catch (error) {
      
    }
  }

  const getNewsStatic = async()=>{
    try {
      const result = await newsCount(1000, 1)
      setStatics(result.news)
      setAllNews(result.totalCount)
    } catch (error) {
      
    }
  }
  const active = statics?.filter((e)=>e.isActive==true)
  const activeNumber = active.length
  const inactive = statics?.filter((e)=>e.isActive=false)
  const inactiveNumber = inactive.length


  useEffect(()=>{
    getAllNewsList(currentPage, search, activation?.value); 
    getNewsStatic();
},[currentPage, search, activation?.value]);

// useEffect(() => {

// }, [])


  return (
    <div className='app-user-list'>
    <Row>
      <Col lg='4' sm='6'>
        <StatsHorizontal
          color='primary'
          statTitle='تعداد خبرها '
          icon={<User size={20} />}
          renderStats={<h3 className='fw-bolder mb-75'>{allNews}</h3>}
        />
      </Col>
      <Col lg='4' sm='6'>
        <StatsHorizontal
          color='success'
          statTitle=' خبر فعال'
          icon={<UserCheck size={20} />}
          renderStats={<h3 className='fw-bolder mb-75'>{activeNumber}</h3>}
        />
      </Col>
      <Col lg='4' sm='6'>
        <StatsHorizontal
          color='danger'
          statTitle='خبر غیر فعال'
          icon={<UserX  size={20} />}
          renderStats={<h3 className='fw-bolder mb-75'>{inactiveNumber}</h3>}
        />
      </Col>
      {/* <Col lg='3' sm='6'>
        <StatsHorizontal
          color='success'
          statTitle='دانشجویان'
          icon={<UserX size={20} />}
          renderStats={<h3 className='fw-bolder mb-75'>237</h3>}
        />
      </Col> */}
    </Row>
    <NewsTable news={news} setSearch={setSearch} setActivation={setActivation} activation={activation} currentPage={currentPage} setCurrentPage={setCurrentPage} allNews={allNews}/>
  </div>

  )
}

export default NewsListComponent;