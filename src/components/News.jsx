import { Card, Col, Row, Typography } from "antd";
import React from "react";
import { useGetCryptoNewsQuery } from "../services/cryptoNewsApi";
import moment from "moment";
import Loading from "./Loading";

const { Text, Title } = Typography;
const demoImageUrl =
  "https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News";
const News = ({ count = 30 }) => {
  const { data: cryptoNews, isLoading } = useGetCryptoNewsQuery({
    count,
    
  });
  if (isLoading) {
    return <Loading/>;
  }
  const newsToShow = cryptoNews?.data?.slice(0, count);
  return (
    <Row gutter={[24, 24]}>
      {newsToShow?.map((news, i) => (
        <Col xs={24} sm={12} lg={8} key={i}>
          <Card hoverable className="news-card">
            <a href={news.url} target="_blank" rel="noreferrer">
              <div className="news-image-container">
                <Title className="news-title" level={4}>
                  {news.title}
                </Title>
                <img
                  src={news.thumbnail || demoImageUrl}
                  alt="news"
                  className="news-img"
                />
              </div>
              <p>
                {news.description > 100
                  ? `${news.description.substring(0, 100)}...`
                  : news.description}
              </p>
              <div className="provider-container">
                <div>
                  
                  <Text>{moment(news.createdAt).startOf("ss").fromNow()}</Text>
                </div>
              </div>
            </a>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default News;
