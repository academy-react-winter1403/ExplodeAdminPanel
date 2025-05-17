// ** Reactstrap Imports
import { Nav, NavItem, NavLink } from 'reactstrap'

// ** Icons Imports


const Tabs = ({ activeTab, toggleTab }) => {
  return (
    <Nav pills className='mb-2'>
      <NavItem>
        <NavLink active={activeTab === '1'} onClick={() => toggleTab('1')}>
          <span className='fw-bold'>دوره ها</span>
        </NavLink>
      </NavItem>

      <NavItem>
        <NavLink active={activeTab === '2'} onClick={() => toggleTab('2')}>
          <span className='fw-bold'>نظرات</span>
        </NavLink>
      </NavItem>
    </Nav>
  )
}

export default Tabs
