// ** Reactstrap Imports
import { Book, Plus } from 'react-feather'
import { Col, Nav, NavItem, NavLink } from 'reactstrap'

// ** Icons Imports


const Tabs = ({ activeTab, toggleTab }) => {
  return (

    <Col>
      <Nav pills className='mb-2  p-1' >
        <NavItem>
          <NavLink active={activeTab === '1'} onClick={() => toggleTab('1')}>
            <Book /> <span className='fw-bold'>دوره ها</span>
          </NavLink>
        </NavItem>

        <NavItem>
          <NavLink active={activeTab === '2'} onClick={() => toggleTab('2')}>
            <Plus /><span className='fw-bold'>ایجاد دوره جدید</span>
          </NavLink>
        </NavItem>
      </Nav>
    </Col>

  )
}

export default Tabs
