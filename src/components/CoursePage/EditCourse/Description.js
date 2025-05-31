import { Fragment } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import * as yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { ArrowLeft, ArrowRight } from 'react-feather';
import { yupResolver } from '@hookform/resolvers/yup';
import { Form, Label, Input, Row, Col, Button, FormFeedback } from 'reactstrap';
import { useDispatch } from 'react-redux';
import { setCourseDescribe, setCourseMiniDescribe, setCourseTitle } from '../../../redux/editCourse';

const Description = ({ stepper, courseData }) => {
  const dispatch = useDispatch();

  const fieldsSchema = yup.object().shape({
    courseTitle: yup.string().required('عنوان را وارد کنید'),
    courseExcerpt: yup.string().required('توضیح کوتاه را وارد کنید'),
    describe: yup
      .string()
      .required('توضیحات دوره اجباری است')
      .test('is-not-empty', 'توضیحات نمی‌تواند خالی باشد', (value) => {
        const cleanText = value ? value.replace(/<[^>]+>/g, '').trim() : '';
        return cleanText.length > 0;
      }),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue, // برای تنظیم دستی مقادیر
  } = useForm({
    resolver: yupResolver(fieldsSchema),
    defaultValues: {
      courseTitle: courseData.title || '',
      courseExcerpt: courseData.excerpt || '',
      describe: courseData.describe || '',
    },
  });

  const onSubmit = (data) => {
    dispatch(setCourseTitle(data.courseTitle));
    dispatch(setCourseMiniDescribe(data.courseExcerpt));
    dispatch(setCourseDescribe(data.describe));
    stepper.next();
  };

  return (
    <Fragment>
      <div className="content-header">
        <h5 className="mb-0">عنوان و توضیحات دوره</h5>
      </div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col md="12" className="mb-1">
            <Label className="form-label" for="courseTitle">
              عنوان دوره
            </Label>
            <Controller
              id="courseTitle"
              name="courseTitle"
              control={control}
              render={({ field }) => (
                <Input
                  placeholder="عنوان دوره را بنویسید"
                  invalid={!!errors.courseTitle}
                  {...field}
                />
              )}
            />
            {errors.courseTitle && <FormFeedback>{errors.courseTitle.message}</FormFeedback>}
          </Col>

          <Col md="12" className="mb-1">
            <Label className="form-label" for="courseExcerpt">
              توضیح کوتاه دوره
            </Label>
            <Controller
              id="courseExcerpt"
              name="courseExcerpt"
              control={control}
              render={({ field }) => (
                <Input
                  type="textarea"
                  maxLength="120"
                  placeholder="توضیح مختصری وارد کنید (120 کاراکتر مجاز)"
                  invalid={!!errors.courseExcerpt}
                  {...field}
                />
              )}
            />
            {errors.courseExcerpt && <FormFeedback>{errors.courseExcerpt.message}</FormFeedback>}
          </Col>

          <Col md="12" className="mb-1">
            <Label className="form-label" for="describe">
              توضیحات دوره
            </Label>
            <Controller
              id="describe"
              name="describe"
              control={control}
              render={({ field: { onChange, value } }) => (
                <CKEditor
                  editor={ClassicEditor}
                  data={value}
                  onReady={(editor) => {
                    editor.editing.view.change((writer) => {
                      writer.setStyle('min-height', '500px', editor.editing.view.document.getRoot());
                      writer.setStyle('max-height', '800px', editor.editing.view.document.getRoot());
                      writer.setStyle('overflow-y', 'auto', editor.editing.view.document.getRoot());
                    });
                  }}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    onChange(data); // به‌روزرسانی مقدار در React Hook Form
                  }}
                  config={{
                    language: 'fa',
                    toolbar: [
                      'heading',
                      '|',
                      'bold',
                      'italic',
                      'link',
                      'bulletedList',
                      'numberedList',
                      'blockQuote',
                      '|',
                      'imageUpload',
                      'insertTable',
                      'mediaEmbed',
                      '|',
                      'undo',
                      'redo',
                    ],
                    image: {
                      toolbar: [
                        'imageTextAlternative',
                        'imageStyle:inline',
                        'imageStyle:block',
                        'imageStyle:side',
                      ],
                    },
                  }}
                />
              )}
            />
            {errors.describe && <FormFeedback>{errors.describe.message}</FormFeedback>}
          </Col>
        </Row>
        <div className="d-flex justify-content-between">
          <Button
            type="button"
            color="primary"
            className="btn-prev"
            onClick={() => stepper.previous()}
          >
            <ArrowLeft size={14} className="align-middle me-sm-25 me-0" />
            <span className="align-middle d-sm-inline-block d-none">مرحله قبل</span>
          </Button>
          <Button type="submit" color="primary" className="btn-next">
            <span className="align-middle d-sm-inline-block d-none">مرحله بعد</span>
            <ArrowRight size={14} className="align-middle ms-sm-25 ms-0" />
          </Button>
        </div>
      </Form>
    </Fragment>
  );
};

export default Description;