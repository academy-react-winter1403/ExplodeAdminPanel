// ** Reactstrap Imports
import { Book, Plus } from 'react-feather'
import { Nav, NavItem, NavLink } from 'reactstrap'

// ** Icons Imports


const Tabs = ({ activeTab, toggleTab }) => {
  return (
    <Nav pills className='mb-2 bg-white p-1' style={{ boxShadow: '0 0 10px #e2e2e2' }}>
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
  )
}

export default Tabs
