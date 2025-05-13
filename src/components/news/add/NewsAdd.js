// ** React Imports
import { Fragment } from 'react'

// ** Reactstrap Imports
import { Row, Col } from 'reactstrap'

// ** Demo Components
import BasicHookForm from './BasicHookForm'


const NewsAdd = () => {
  return (
    <Fragment>
      <Row className='match-height'>
        <Col md='12'>
          <BasicHookForm />
        </Col>
      </Row>
    </Fragment>
  )
}

export default NewsAdd
