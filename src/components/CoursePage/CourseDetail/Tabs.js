// ** Reactstrap Imports
import { Col, Nav, NavItem, NavLink } from 'reactstrap'

// ** Icons Imports


const Tabs = ({ activeTab, toggleTab }) => {
    return (

        <Col>
            <Nav pills className='mb-2  p-1' >
                <NavItem>
                    <NavLink active={activeTab === '1'} onClick={() => toggleTab('1')}>
                        <span className='fw-bold'>رزرو کننده ها</span>
                    </NavLink>
                </NavItem>

                <NavItem>
                    <NavLink active={activeTab === '2'} onClick={() => toggleTab('2')}>
                        <span className='fw-bold'>دانشجویان</span>
                    </NavLink>
                </NavItem>

                <NavItem>
                    <NavLink active={activeTab === '3'} onClick={() => toggleTab('3')}>
                        <span className='fw-bold'>پرداخت شده ها</span>
                    </NavLink>
                </NavItem>

                <NavItem>
                    <NavLink active={activeTab === '4'} onClick={() => toggleTab('4')}>
                        <span className='fw-bold'>پرداخت نشده ها</span>
                    </NavLink>
                </NavItem>

                <NavItem>
                    <NavLink active={activeTab === '5'} onClick={() => toggleTab('5')}>
                        <span className='fw-bold'>در انتظار تایید</span>
                    </NavLink>
                </NavItem>
            </Nav>
        </Col>

    )
}

export default Tabs