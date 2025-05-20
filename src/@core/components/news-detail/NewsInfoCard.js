// ** React Imports
import { useState, Fragment, useEffect } from "react";
import pic from "../../../assets/images/portrait/small/news.png";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import toast from "react-hot-toast";
import http from "../../../core/interceptor/index";

// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  CardBody,
  Button,
  Badge,
  Modal,
  Label,
  ModalBody,
  ModalHeader,
} from "reactstrap";

// ** Third Party Components
import { MessageCircle, Eye } from "react-feather";

// ** Custom Components
import Avatar from "@components/avatar";

// ** Styles
import "@styles/react/libs/react-select/_react-select.scss";
import {
  GetListNewsCategory,
  UpdateNews,
} from "../../../core/services/api/putNews";

const NewsInfoCard = ({ selectedUser, cardDetail }) => {
  // ** State
  const [show, setShow] = useState(false);
  const [newsCategory, setNewsCategory] = useState([]);
  console.log("detail", cardDetail);

  const GetCategory = async () => {
    try {
      const result = await GetListNewsCategory();
      setNewsCategory(result);
    } catch (error) {}
  };

  useEffect(() => {
    GetCategory();
  }, []);

  const insert = cardDetail?.insertDate?.toString();
  const update = cardDetail?.updateDate?.toString();

  const handleSubmit = async (e) => {
    const formData = new FormData();
    formData.append("Id", e.Id);
    formData.append("SlideNumber", e.SlideNumber);
    formData.append("CurrentImageAddress", e.CurrentImageAddress);
    formData.append("CurrentImageAddressTumb", e.CurrentImageAddressTumb);
    formData.append("Active", e.Active);
    formData.append("Title", e.Title);
    formData.append("GoogleTitle", e.GoogleTitle);
    formData.append("GoogleDescribe", e.GoogleDescribe);
    formData.append("MiniDescribe", e.MiniDescribe);
    formData.append("Describe", e.Describe);
    formData.append("Keyword", e.Keyword);
    formData.append("IsSlider", e.IsSlider);
    formData.append("NewsCatregoryId", e.NewsCatregoryId);
    formData.append("Image", e.Image);
    const result = await UpdateNews(formData);
    toast.success(result.message);
  };

  const handleActive = async (id) => {
    const data = new FormData();
    data.append("Active", "true");
    data.append("Id", id);
    const res = await http.put("/News/ActiveDeactiveNews", data);
    console.log(res)
  };

  const handleDeActive = async (id) => {
    const data = new FormData();
    data.append("Active", "false");
    data.append("Id", id);
    const res = await http.put("/News/ActiveDeactiveNews", data);
    console.log(res)
  };

  return (
    <Fragment>
      <Card>
        <CardBody>
          <div className="user-avatar-section">
            <div className="d-flex align-items-center flex-column">
              <img
                height="110"
                width="110"
                alt="user-avatar"
                src={cardDetail?.currentImageAddress ?? pic}
                className="img-fluid rounded mt-3 mb-2"
              />
              <div className="d-flex flex-column align-items-center text-center">
                <div className="user-info">
                  <h4>
                    {cardDetail !== null
                      ? cardDetail?.fullName
                      : "Eleanor Aguilar"}
                  </h4>
                  {selectedUser !== null ? (
                    <Badge
                      className="text-capitalize"
                      color={
                        cardDetail.active === true
                          ? "light-success"
                          : "light-danger"
                      }
                      pill
                    >
                      {cardDetail?.active === true ? "فعال" : "غیرفعال"}
                    </Badge>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-around my-2 pt-75">
            <div className="d-flex align-items-start me-2">
              <Badge color="light-primary" className="rounded p-75">
                <Eye className="font-medium-2" />
              </Badge>
              <div className="ms-75">
                <h4 className="mb-0">{cardDetail?.currentView}</h4>
                <small> بازدیدها </small>
              </div>
            </div>
            <div className="d-flex align-items-start">
              <Badge color="light-primary" className="rounded p-75">
                <MessageCircle className="font-medium-2" />
              </Badge>
              <div className="ms-75">
                <h4 className="mb-0">{cardDetail?.commentsCount}</h4>
                <small> کامنت ها</small>
              </div>
            </div>
          </div>
          <h4 className="fw-bolder border-bottom pb-50 mb-1">جزئیات</h4>
          <div className="info-container">
            {cardDetail !== null ? (
              <ul className="list-unstyled">
                <li className="mb-75">
                  <span className="fw-bolder me-25">نام نویسنده:</span>
                  <span>{cardDetail?.addUserFullName}</span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25"> دسته بندی:</span>
                  <span>{cardDetail?.newsCatregoryName}</span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">عنوان کوتاه :</span>
                  <span>{cardDetail?.miniDescribe}</span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">عنوان گوگل: </span>
                  <span>{cardDetail?.googleTitle}</span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">تاریخ ایجاد:</span>
                  <span>
                    {insert?.slice(0, 4) +
                      "/" +
                      insert?.slice(5, 7) +
                      "/" +
                      insert?.slice(8, 10)}
                  </span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">تاریخ بروزرسانی :</span>
                  <span>
                    {update?.slice(0, 4) +
                      "/" +
                      update?.slice(5, 7) +
                      "/" +
                      update?.slice(8, 10)}
                  </span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25"> توضیحات خبر :</span>
                  <span>{" " + cardDetail?.describe}</span>
                </li>
              </ul>
            ) : null}
          </div>
          <div className="d-flex justify-content-center pt-2">
            <Button color="primary" onClick={() => setShow(true)}>
              ویرایش
            </Button>
            {cardDetail?.active ? (
              <Button
                onClick={() => handleDeActive(cardDetail.id)}
                className="ms-1"
                color="danger"
                outline
              >
                {" "}
                {/* onClick={handleSuspendedClick} */}
                غیر فعال کردن
              </Button>
            ) : (
              <Button
                onClick={() => handleActive(cardDetail.id)}
                className="ms-1"
                color="success"
                outline
              >
                {" "}
                {/* onClick={handleSuspendedClick} */}
                فعال کردن
              </Button>
            )}
          </div>
        </CardBody>
      </Card>
      <Modal
        isOpen={show}
        toggle={() => setShow(!show)}
        className="modal-dialog-centered modal-lg"
      >
        <ModalHeader
          className="bg-transparent"
          toggle={() => setShow(!show)}
        ></ModalHeader>
        <ModalBody className="px-sm-5 pt-50 pb-5">
          <div className="text-center mb-2">
            <h1 className="mb-1">ویرایش اطلاعات اخبار و مقالات</h1>
          </div>
          <Formik
            initialValues={{
              Id: cardDetail.id,
              SlideNumber: 1,
              CurrentImageAddress: cardDetail.currentImageAddress,
              CurrentImageAddressTumb: cardDetail.currentImageAddressTumb,
              Active: cardDetail.active,
              Title: cardDetail.title,
              GoogleTitle: cardDetail.googleTitle,
              GoogleDescribe: cardDetail.googleDescribe,
              MiniDescribe: cardDetail.miniDescribe,
              Describe: cardDetail.describe,
              Keyword: cardDetail.keyword,
              IsSlider: cardDetail.isSlider,
              NewsCatregoryId: cardDetail.newsCatregoryId,
              Image: "",
            }}
            onSubmit={handleSubmit}
          >
            <Form>
              <Row className="gy-1 pt-75">
                <Col md={6} xs={12}>
                  <Label className="form-label" for="Title">
                    عنوان
                  </Label>
                  <Field
                    class="form-control form-control-md"
                    id="Title"
                    name="Title"
                  />
                  <ErrorMessage
                    name="Title"
                    component={"p"}
                    class="text-danger"
                  />
                </Col>
                <Col md={4} xs={12}>
                  <Label className="form-label" for="NewsCatregoryId">
                    دسته بندی
                  </Label>
                  <Field
                    as="select"
                    class="form-select form-select-md"
                    id="NewsCatregoryId"
                    name="NewsCatregoryId"
                  >
                    {newsCategory?.map((item, index) => {
                      return (
                        <option key={index} value={item.id}>
                          {item.categoryName}
                        </option>
                      );
                    })}
                  </Field>
                  <ErrorMessage
                    name="NewsCatregoryId"
                    component={"p"}
                    class="text-danger"
                  />
                </Col>
                <Col md={2} xs={12}>
                  <Label className="form-label" for="Active">
                    وضعیت
                  </Label>
                  <Field
                    as="select"
                    class="form-select form-select-md"
                    id="Active"
                    name="Active"
                  >
                    <option value={true}>فعال</option>
                    <option value={false}>غیرفعال</option>
                  </Field>
                  <ErrorMessage
                    name="Active"
                    component={"p"}
                    class="text-danger"
                  />
                </Col>
                <Col md={6} xs={12}>
                  <Label className="form-label" for="MiniDescribe">
                    توضیح کوتاه
                  </Label>
                  <Field
                    class="form-control form-control-md"
                    id="MiniDescribe"
                    name="MiniDescribe"
                  />
                  <ErrorMessage
                    name="MiniDescribe"
                    component={"p"}
                    class="text-danger"
                  />
                </Col>
                <Col md={6} xs={12}>
                  <Label className="form-label" for="Keyword">
                    کلمات کلیدی
                  </Label>
                  <Field
                    class="form-control form-control-md"
                    id="Keyword"
                    name="Keyword"
                    placeholder="111"
                  />
                  <ErrorMessage
                    name="Keyword"
                    component={"p"}
                    class="text-danger"
                  />
                </Col>
                <Col md={12} xs={12}>
                  <Label className="form-label" for="GoogleDescribe">
                    توضیحات گوگل
                  </Label>
                  <Field
                    class="form-control form-control-md"
                    id="GoogleDescribe"
                    name="GoogleDescribe"
                  />
                  <ErrorMessage
                    name="GoogleDescribe"
                    component={"p"}
                    class="text-danger"
                  />
                </Col>
                <Col md={12} xs={12}>
                  <Label className="form-label" for="GoogleTitle">
                    عنوان گوگل
                  </Label>
                  <Field
                    class="form-control form-control-md"
                    id="GoogleTitle"
                    name="GoogleTitle"
                  />
                  <ErrorMessage
                    name="GoogleDescribe"
                    component={"p"}
                    class="text-danger"
                  />
                </Col>
                <Col md={12} xs={12}>
                  <Label className="form-label" for="Describe">
                    توضیحات
                  </Label>
                  <Field
                    class="form-control form-control-md"
                    id="Describe"
                    name="Describe"
                  />
                  <ErrorMessage
                    name="Describe"
                    component={"p"}
                    class="text-danger"
                  />
                </Col>
                <Col md={6} xs={12}>
                  <Label className="form-label" for="CurrentImageAddress">
                    آپلود عکس
                  </Label>
                  <Field
                    class="form-control form-control-md"
                    id="CurrentImageAddress"
                    name="CurrentImageAddress"
                  />
                  <ErrorMessage
                    name="CurrentImageAddress"
                    component={"p"}
                    class="text-danger"
                  />
                </Col>
                <Col md={6} xs={12}>
                  <Label className="form-label" for="CurrentImageAddressTumb">
                    2آپلود عکس
                  </Label>
                  <Field
                    class="form-control form-control-md"
                    id="CurrentImageAddressTumb"
                    name="CurrentImageAddressTumb"
                  />
                  <ErrorMessage
                    name="CurrentImageAddressTumb"
                    component={"p"}
                    class="text-danger"
                  />
                </Col>

                <Col xs={12} className="text-center mt-2 pt-50">
                  <Button type="submit" className="me-1" color="primary">
                    ثبت
                  </Button>
                </Col>
              </Row>
            </Form>
          </Formik>
        </ModalBody>
      </Modal>
    </Fragment>
  );
};

export default NewsInfoCard;
