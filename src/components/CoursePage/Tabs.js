// ** Reactstrap Imports
import { Book, Plus } from 'react-feather'
import { useLocation } from 'react-router-dom'
import { Col, Nav, NavItem, NavLink } from 'reactstrap'

// ** Icons Imports


const Tabs = ({ activeTab, toggleTab }) => {
  const { pathname } = useLocation()
  const blogs = pathname == '/blogList' ? true : false
  return (

    <Col>
      <Nav pills className='mb-2  p-1' >
        <NavItem>
          <NavLink active={activeTab === '1'} onClick={() => toggleTab('1')}>
            <Book /> <span className='fw-bold'> {blogs ? 'بلاگ ها':'دوره ها'}</span>
          </NavLink>
        </NavItem>

        <NavItem>
          <NavLink active={activeTab === '2'} onClick={() => toggleTab('2')}>
            <Plus /><span className='fw-bold'>{blogs ? 'ایجاد بلاگ جدید':'ایجاد دوره جدید'}</span>
          </NavLink>
        </NavItem>
      </Nav>
    </Col>

  )
}

export default Tabs
