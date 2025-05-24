// ** React Imports
import { Fragment, useState } from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

// ** Utils
import { isObjEmpty } from '@utils'

// ** Third Party Components
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { ArrowLeft, ArrowRight } from 'react-feather'
import { yupResolver } from '@hookform/resolvers/yup'
import { Form, Label, Input, Row, Col, Button, FormFeedback } from 'reactstrap'
import { useDispatch, useSelector } from 'react-redux';
import { setCourseDescribe, setCourseMiniDescribe, setCourseTitle } from '../../redux/addCourseSlice';
const CourseDescription = ({ stepper }) => {
  const [editorData, setEditorData] = useState('')
  const dispatch = useDispatch()
  const fieldsSchema = yup.object().shape({
    courseTitle: yup.string().required('عنوان را وارد کنید'),
  })

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(fieldsSchema)
  })

  const onSubmit = (data) => {
    dispatch(setCourseTitle(data.courseTitle))
    dispatch(setCourseMiniDescribe(data.courseExcerpt))
    dispatch(setCourseDescribe(editorData))
    stepper.next()
  }
  return (
    <Fragment>
      <div className='content-header'>
        <h5 className='mb-0'>عنوان و توضیحات دوره</h5>
      </div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col md='12' className='mb-1'>
            <Label className='form-label' for='courseTitle'>
              عنوان دوره
            </Label>
            <Controller
              id='courseTitle'
              name='courseTitle'
              control={control}
              render={({ field }) => <Input placeholder='عنوان دوره را بنویسید' invalid={errors.courseTitle && true} {...field} />}
            />
            {errors.courseTitle && <FormFeedback>{errors.courseTitle.message}</FormFeedback>}
          </Col>

          <Col md='12' className='mb-1'>
            <Label className='form-label' for='courseExcerpt'>
              توضیح کوتاه دوره
            </Label>
            <Controller
              id='courseExcerpt'
              name='courseExcerpt'
              control={control}
              render={({ field }) => <Input type='textarea' maxlength="120" placeholder='توضیح مختصری وارد کنید (120 کاراکتر مجاز)' invalid={errors.courseExcerpt && true} {...field} />}
            />
            {errors.courseExcerpt && <FormFeedback>{errors.courseExcerpt.message}</FormFeedback>}
          </Col>

          <Col md='12' className='mb-1' >
            <CKEditor
              editor={ClassicEditor}
              data=""
              onReady={(editor) => {
                // بهترین مکان برای تنظیم ارتفاع
                editor.editing.view.change((writer) => {
                  writer.setStyle(
                    'min-height',
                    '500px',
                    editor.editing.view.document.getRoot()
                  );
                  writer.setStyle(
                    'max-height',
                    '800px',
                    editor.editing.view.document.getRoot()
                  );
                  writer.setStyle(
                    'overflow-y',
                    'auto',
                    editor.editing.view.document.getRoot()
                  );
                });
              }}
              onChange={(event, editor) => {
                const data = editor.getData();
                setEditorData(data)
              }}
              config={{
                language: 'fa',
                toolbar: [
                  'heading', '|',
                  'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote', '|',
                  'imageUpload', 'insertTable', 'mediaEmbed', '|',
                  'undo', 'redo'
                ],
                // تنظیمات اضافی برای تصاویر
                image: {
                  toolbar: [
                    'imageTextAlternative',
                    'imageStyle:inline',
                    'imageStyle:block',
                    'imageStyle:side'
                  ]
                }
              }}
            />
          </Col>
        </Row>
        <div className='d-flex justify-content-between'>
          <Button type='button' color='primary' className='btn-prev' onClick={() => stepper.previous()}>
            <ArrowLeft size={14} className='align-middle me-sm-25 me-0'></ArrowLeft>
            <span className='align-middle d-sm-inline-block d-none'>مرحله قبل</span>
          </Button>
          <Button type='submit' color='primary' className='btn-next'>
            <span className='align-middle d-sm-inline-block d-none'>مرحله بعد</span>
            <ArrowRight size={14} className='align-middle ms-sm-25 ms-0'></ArrowRight>
          </Button>
        </div>
      </Form>

    </Fragment>
  )
}

export default CourseDescription