import { Col, Row } from "reactstrap";
// ** Styles
import "@styles/react/apps/app-users.scss";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NewsInfoCard from "../@core/components/news-detail/NewsInfoCard";
import NewsTab from "../@core/components/news-detail/NewsTab";
import getNewsDetail from "../core/services/api/getNewsDetail";

function NewsDetail() {
  const [cardDetail, setCardDetail] = useState([]);
  const [commentDetail, setCommentDetail] = useState([]);

  const { id } = useParams();

  const getDetail = async () => {
    try {
      const result = await getNewsDetail(id);
      setCardDetail(result.detailsNewsDto);
      setCommentDetail(result.commentDtos);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDetail(id);
  }, []);

  return (
    <div className="app-user-view">
      <Row>
        <Col xl="4" lg="5" xs={{ order: 1 }} md={{ order: 0, size: 5 }}>
          <NewsInfoCard cardDetail={cardDetail} />
        </Col>
        <Col xl="8" lg="7" xs={{ order: 0 }} md={{ order: 1, size: 7 }}>
          <NewsTab commentDetail={commentDetail} />
        </Col>
      </Row>
    </div>
  );
}

export default NewsDetail;
