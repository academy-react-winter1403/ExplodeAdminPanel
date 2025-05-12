// ** Icons Imports
import { Search } from 'react-feather'

// ** Reactstrap Imports
import { Row, Col, InputGroup, Input, InputGroupText } from 'reactstrap'

const ProductsSearchbar = props => {
  // ** Props
  const { setSearch } = props

  return (
    <div id='ecommerce-searchbar' className='ecommerce-searchbar'>
      <Row >
        <Col sm='12'>
          <InputGroup className='input-group-merge'>
            <Input
              className='search-product'
              placeholder='جستجوی خبرها'
              type='text'  
              name='SearchCourse'
              onChange={(e)=>setSearch(e.target.value)}
            />
            <InputGroupText>
              <Search className='text-muted' size={14} />
            </InputGroupText>
          </InputGroup>
        </Col>
      </Row>
    </div>
  )
}

export default ProductsSearchbar
