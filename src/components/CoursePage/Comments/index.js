import { Card, CardBody, CardHeader, CardTitle, Col, Modal, ModalBody, ModalHeader, Row } from 'reactstrap'
import AcceptedComments from './AcceptedComments'
import { MessageCircle } from 'react-feather'
import NotAcceptedComments from './NotAcceptedComments'




const Comment = ({ setCommentModal, commentModal, courseId, isBlogs }) => {


  return (
    <Modal isOpen={commentModal} toggle={() => setCommentModal(!commentModal)} className='modal-dialog-centered modal-xl'>
      <ModalHeader toggle={() => setCommentModal(!commentModal)}><MessageCircle /> {isBlogs ? 'لیست نظرات بلاگ' : 'لیست نظرات دوره'}</ModalHeader>
      <ModalBody>
        <Row>
          <Col sm='12' xl={isBlogs ? '12' : '6'}>
            <Card>
              <CardHeader>
                <CardTitle tag="h2"><MessageCircle /> نظرات </CardTitle>
              </CardHeader>
              <CardBody>
                <AcceptedComments courseId={courseId} isBlogs={isBlogs} />
              </CardBody>
            </Card>
          </Col>

          {
            !isBlogs &&
            <Col sm='12' xl='6'>
              <Card>
                <CardHeader>
                  <CardTitle tag="h2"><MessageCircle /> نظرات تایید نشده</CardTitle>
                </CardHeader>
                <CardBody>
                  <NotAcceptedComments courseId={courseId} />
                </CardBody>
              </Card>
            </Col>
          }
        </Row>
      </ModalBody>
    </Modal>
  )
}

export default Comment