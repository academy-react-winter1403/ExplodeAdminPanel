// ** React Imports
import { Fragment } from 'react'

// ** Reactstrap Imports
import { Nav } from 'reactstrap'

// ** Icons Imports
import {MessageCircle } from 'react-feather'

// ** User Components
// import InvoiceList from './InvoiceList'

import CommentTab from './CommentTab'


const NewsTab = ({ commentDetail}) => {
  return (
    <Fragment>
      <Nav pills className='mb-2'>  
        <MessageCircle className='font-medium-3 me-50' />
        <span className='fw-bold'>کامنت ها</span>
      </Nav>
      <CommentTab commentDetail={commentDetail} />
    </Fragment>
  )
}
export default NewsTab
