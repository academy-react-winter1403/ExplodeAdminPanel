// ** Reactstrap Imports
import { Card, Col, DropdownMenu, DropdownToggle, Modal, UncontrolledDropdown, ModalBody, ModalHeader } from 'reactstrap'
import pic from '../../../assets/images/avatars/avatar-blank.png'
import { useEffect, useState } from 'react'
// ** Third Party Components
import { CheckCircle, ChevronDown ,Eye , FileText, Trash2 } from 'react-feather'
import DataTable from 'react-data-table-component'
import ReplyNewsCommentTab from './ReplyNewsCommentTab'
// ** Custom Components
import Avatar from '@components/avatar'


// ** Styles
import '@styles/react/libs/tables/react-dataTable-component.scss'
import AddReply from './AddReply'

export const columns = [
  {
    sortable: true,
    maxWidth: '200px',
    name: ' نام کاربر',
    selector: row => row.commentDetail,
    cell: row => {
      return (
        <div className='d-flex justify-content-left align-items-center'>
          <div className='avatar-wrapper'>
          {row.pictureAddress !== null && row.pictureAddress !== 'Not-set' ? <Avatar img={row.pictureAddress } className='me-1' imgWidth='32'/>: <Avatar img={pic} className='me-1' imgWidth='32'/>}
          </div>
          <div className='d-flex flex-column'>
            <span className='text-truncate fw-bolder'>{row.title}</span>
          </div>
        </div>
      )
    }
  },
  {
    name: '  عنوان کامنت ',
    maxWidth:'200px',
    selector: row => row.title
  },

  {
    sortable: true,
    maxWidth: '300px',
    name: ' متن کامنت',
    cell: row => {
      return (
        <div className='d-flex justify-content-left align-items-center' onClick={() => setShow(true)}>
            <span className='text-truncate fw-bolder' >{row.describe}</span>
        </div>
      )
    }
  },
  {
    name: 'پاسخ دادن',
    maxWidth:'70px',
    cell: row => {
      const [show, setShow] = useState(false);
      return(
      <div className='column-action'>
        <UncontrolledDropdown>
          <DropdownToggle tag='div' className='btn btn-sm'>
            <FileText size={16} className='cursor-pointer' onClick={()=>setShow(!show)}/>
          </DropdownToggle>
        </UncontrolledDropdown>
        <Modal isOpen={show} toggle={() => setShow(!show)} className='modal-dialog-centered modal-lg'>
        <ModalHeader className='bg-transparent' toggle={() => setShow(!show)}></ModalHeader>
        <ModalBody className='px-sm-5 pt-50 pb-5'>

          <AddReply CommentId={row.id} newsId={row.newsId}/>
        </ModalBody>
      </Modal>
      </div>)
    }
  },
  {
    name: 'پاسخ ها',
    maxWidth:'100px',
    cell: row => {
      const [show, setShow] = useState(false);
      return(
      <div className='column-action'>
        <UncontrolledDropdown>
          <DropdownToggle tag='div' className='btn btn-sm'>

            <Eye size={16} className='cursor-pointer' onClick={()=>setShow(!show)}/>

          </DropdownToggle>
        </UncontrolledDropdown>
        <Modal isOpen={show} toggle={() => setShow(!show)} className='modal-dialog-centered modal-lg'>
        <ModalHeader className='bg-transparent' toggle={() => setShow(!show)}></ModalHeader>
        <ModalBody className='px-sm-5  pb-2'>

          <ReplyNewsCommentTab id={row?.id}/>

        </ModalBody>
      </Modal>
      </div>)
  }
  }
 
]

const CommentTab = ({commentDetail}) => {
 
console.log(commentDetail)

  return (
    <Card>
      <div className='react-dataTable user-view-account-projects'>
        <DataTable
          noHeader
          responsive
          columns={columns}
          data={commentDetail}
          className='react-dataTable'
          sortIcon={<ChevronDown size={10} />}
        />
      </div>
      
    </Card>
  )
}

export default CommentTab
