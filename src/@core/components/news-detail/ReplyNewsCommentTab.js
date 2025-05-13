// ** Reactstrap Imports
import { Card } from 'reactstrap'

import { useEffect, useState } from 'react'
// ** Third Party Components
import { ChevronDown} from 'react-feather'
import DataTable from 'react-data-table-component'


// ** Styles
import '@styles/react/libs/tables/react-dataTable-component.scss'
import { getNewsRepliesComment } from '../../../core/services/api/getNewsRepliesComment'





export const columns = [
  {
    sortable: true,
    maxWidth: '150px',
    name: ' نام کاربر',
    cell: row => {
      return (
        <div className='d-flex justify-content-left align-items-center'>
          <div className='d-flex flex-column'>
            <span className='text-truncate fw-bolder'>{row.autor}</span>
          </div>
        </div>
      )
    }
  },
  

  {
    sortable: true,
    minWidth: '200px',
    name: ' متن پاسخ',
    cell: row => {
      return (
        <div className='d-flex justify-content-left align-items-center'>
            <span className='text-truncate fw-bolder' >{row.describe}</span>
        </div>
      )
    }
  },
]

const ReplyNewsCommentTab = ({id}) => {
  
  
  const [replies, setReplies] = useState([])
  // console.log(replies)


  const getReplies = async ()=>{
    try {
        const result = await getNewsRepliesComment(id)
        setReplies(result)
    } catch (error) {
        console.log(error)
    }
}

useEffect(() => {
  getReplies(id);
}, [])
  return (
    <Card>
      <div className='react-dataTable user-view-account-projects'>
        <DataTable
          noHeader
          responsive
          columns={columns}
          data={replies}
          className='react-dataTable'
          sortIcon={<ChevronDown size={10} />}
        />
      </div>
      
    </Card>
  )
}

export default ReplyNewsCommentTab
