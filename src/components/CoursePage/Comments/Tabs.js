// ** Reactstrap Imports
import { MessageCircle } from 'react-feather'
import { Col, Nav, NavItem, NavLink } from 'reactstrap'

// ** Icons Imports


const Tabs = ({ activeTab, toggleTab }) => {
    return (

        <Col>
            <Nav pills className='mb-2  p-1' >
                <NavItem>
                    <NavLink active={activeTab === '1'} onClick={() => toggleTab('1')}>
                        <MessageCircle /> <span className='fw-bold'>اصلی ها</span>
                    </NavLink>
                </NavItem>

                <NavItem>
                    <NavLink active={activeTab === '2'} onClick={() => toggleTab('2')}>
                        <MessageCircle /><span className='fw-bold'>پاسخ ها</span>
                    </NavLink>
                </NavItem>
            </Nav>
        </Col>

    )
}

export default Tabs
