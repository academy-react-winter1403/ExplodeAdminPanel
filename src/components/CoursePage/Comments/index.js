import { Card, CardBody, CardHeader, CardTitle, Col, Modal, ModalBody, ModalHeader, Row } from 'reactstrap'
import AcceptedComments from './AcceptedComments'
import { MessageCircle } from 'react-feather'

const Comment = ({ setCommentModal, commentModal, courseId }) => {
  return (
    <Modal isOpen={commentModal} toggle={() => setCommentModal(!commentModal)} className='modal-dialog-centered modal-xl'>
      <ModalHeader toggle={() => setCommentModal(!commentModal)}><MessageCircle /> لیست نظرات دوره</ModalHeader>
      <ModalBody>
        <Row>
          <Col sm='12' xl='6'>
            <Card>
              <CardHeader>
                <CardTitle tag="h2"><MessageCircle /> نظرات تایید شده</CardTitle>
              </CardHeader>
              <CardBody>
                <AcceptedComments courseId={courseId} />
              </CardBody>
            </Card>
          </Col>

          <Col sm='12' xl='6'>
            <Card>
              <CardHeader>
                <CardTitle tag="h2"><MessageCircle /> نظرات تایید نشده</CardTitle>
              </CardHeader>
              <CardBody>
                لیست تایید نشده ها
              </CardBody>
            </Card>
          </Col>
        </Row>
      </ModalBody>
    </Modal>
  )
}

export default Comment