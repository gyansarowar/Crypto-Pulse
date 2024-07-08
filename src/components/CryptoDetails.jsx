import React, {useState } from "react";
import {useParams } from "react-router-dom";
import {
  useGetCryptoDetailsQuery,
  useGetCryptoHistoryQuery,
} from "../services/cryptoApi";
import moment from "moment";
import millify from "millify";
import { Col, Row, Typography, Select, Card } from "antd";
import {
  MoneyCollectOutlined,
  DollarCircleOutlined,
  FundOutlined,
  ExclamationCircleOutlined,
  StopOutlined,
  TrophyOutlined,
  CheckOutlined,
  NumberOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";
const demoImageUrl =
  "https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News";
import LineChart from "./LineChart";
import { useGetRealTimeCryptoNewsQuery } from "../services/realTimeCryptoNewsApi";
import Loading from "./Loading";

const { Title, Text } = Typography;
const { Option } = Select;
const CryptoDetails = () => {
  const { coinId } = useParams();
  const [timePeriod, setTimePeriod] = useState("7d");

  const { data: coinHistory } = useGetCryptoHistoryQuery({
    coinId,
    timePeriod,
  });
  const { data, isFetching } = useGetCryptoDetailsQuery(coinId);
  const cryptoDetails = data?.data?.coin;
  const { data: realTimeNews } = useGetRealTimeCryptoNewsQuery(
    cryptoDetails?.name
  );
  if (isFetching) return <Loading />;
  const relatedArticles = realTimeNews?.data;

  const time = ["3h", "24h", "7d", "30d", "1y", "3m", "3y", "5y"];

  const stats = [
    {
      title: "Price to USD",
      value: `$ ${cryptoDetails?.price && millify(cryptoDetails?.price)}`,
      icon: <DollarCircleOutlined />,
    },
    { title: "Rank", value: cryptoDetails?.rank, icon: <NumberOutlined /> },
    {
      title: "24h Volume",
      value: `$ ${
        cryptoDetails?.["24hVolume"] && millify(cryptoDetails?.["24hVolume"])
      }`,
      icon: <ThunderboltOutlined />,
    },
    {
      title: "Market Cap",
      value: `$ ${
        cryptoDetails?.marketCap && millify(cryptoDetails?.marketCap)
      }`,
      icon: <DollarCircleOutlined />,
    },
    {
      title: "All-time-high(daily avg.)",
      value: `$ ${
        cryptoDetails?.allTimeHigh?.price &&
        millify(cryptoDetails?.allTimeHigh?.price)
      }`,
      icon: <TrophyOutlined />,
    },
  ];

  const genericStats = [
    {
      title: "Number Of Markets",
      value: cryptoDetails?.numberOfMarkets,
      icon: <FundOutlined />,
    },
    {
      title: "Number Of Exchanges",
      value: cryptoDetails?.numberOfExchanges,
      icon: <MoneyCollectOutlined />,
    },
    {
      title: "Aprroved Supply",
      value: cryptoDetails?.supply?.confirmed ? (
        <CheckOutlined />
      ) : (
        <StopOutlined />
      ),
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: "Total Supply",
      value: `$ ${
        cryptoDetails?.supply?.total && millify(cryptoDetails?.supply?.total)
      }`,
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: "Circulating Supply",
      value: `$ ${
        cryptoDetails?.supply?.circulating &&
        millify(cryptoDetails?.supply?.circulating)
      }`,
      icon: <ExclamationCircleOutlined />,
    },
  ];
  return (
    <Col className="coin coin-detail-container">
      <Col className="coin-heading-container">
        <Title level={2} className="coin-name">
          {cryptoDetails?.name} ({cryptoDetails?.symbol}) Price
        </Title>
        <p>
          {cryptoDetails?.name} live price in USD. View value statistics,market
          cap and supply.
        </p>
      </Col>
      <Select
        defaultValue={`7d`}
        className="select-timeperiod"
        placeholder="Select Time Period"
        onChange={(value) => setTimePeriod(value)}
      >
        {time.map((option) => (
          <Option key={option}>{option}</Option>
        ))}
      </Select>
      <LineChart
        coinHistory={coinHistory}
        currentPrice={millify(cryptoDetails?.price)}
        coinName={cryptoDetails?.name}
      />
      <Col className="stats-container">
        <Col className="coin-value-statistics">
          <Col className="coin-value-statistics-heading">
            <Title level={3} className=" coin-details-heading">
              {cryptoDetails?.name} Value Statistics
            </Title>
            <p>An overview showing the stats of {cryptoDetails?.name}</p>
          </Col>
          {stats.map(({ title, value, icon }, i) => (
            <Col className="coin-stats" key={i}>
              {/* {console.log(i)} */}
              <Col className="coin-stats-name">
                <Text>{icon}</Text>
                <Text>{title}</Text>
              </Col>
              <Text className="stats">{value}</Text>
            </Col>
          ))}
        </Col>
        <Col className="other-stats-info">
          <Col className="coin-value-statistics-heading">
            <Title level={3} className=" coin-details-heading">
              Other Statistics
            </Title>
            <p>An overview showing the stats of all cryptocurrencies.</p>
          </Col>
          {genericStats.map(({ title, value, icon }, i) => (
            <Col className="coin-stats" key={i}>
              <Col className="coin-stats-name">
                <Text>{icon}</Text>
                <Text>{title}</Text>
              </Col>
              <Text className="stats">{value}</Text>
            </Col>
          ))}
        </Col>
      </Col>
      <Col className="coin-desc-link">
        <Row className="coin-desc">
          <Title level={3} className="coin-details-heading">
            What is {cryptoDetails?.name}?<br />
            <p>{cryptoDetails?.description}</p>
          </Title>
          <Title level={3} className="coin-details-heading">
            Related Articles
          </Title>
          <Row gutter={[24, 24]} className="related-article">
            {relatedArticles?.map((news, i) => (
              <Col xs={24} key={i}>
                <Card hoverable>
                  <a href={news.link} target="_blank" rel="noreferrer">
                    <div className="news-image-container">
                      <Title className="news-title" level={4}>
                        {news.title}
                      </Title>
                      <img
                        src={
                          news.photo_url ||
                          // news.source_logo_url ||
                          news.source_favicon_url ||
                          demoImageUrl
                        }
                        alt="news"
                        className="news-img"
                      />
                    </div>

                    <div className="provider-container">
                      <div>
                        <Text>
                          {moment(news.published_datetime_utc)
                            .startOf("ss")
                            .fromNow()}
                        </Text>
                      </div>
                    </div>
                  </a>
                </Card>
              </Col>
            ))}
          </Row>
        </Row>
        <Col className="coin-links">
          <Title level={3} className="coin-details-heading">
            {cryptoDetails?.name} Links
          </Title>
          {cryptoDetails?.links.map((link) => (
            <Row className="coin-link" key={link.name}>
              <Title level={5} className="link-name">
                {link.type}
              </Title>
              <a href={link.url} target="_blank" rel="noreferrer">
                {link.name}
              </a>
            </Row>
          ))}
        </Col>
      </Col>
    </Col>
  );
};

export default CryptoDetails;
