import { Col, Row, Typography } from "antd";
import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title as ChartTitle,
  Tooltip,
  Legend,
} from "chart.js";

// Register the necessary components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ChartTitle,
  Tooltip,
  Legend
);

const { Title } = Typography;
const LineChart = ({ coinHistory, currentPrice, coinName }) => {
  const coinPrice = [];
  const coinTimestamp = [];
  //   console.log('coinHistory',coinHistory);

  for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
    coinPrice.push(coinHistory.data.history[i].price);
    // console.log(coinHistory.data.history[i].timestamp.toLocaleString());
    coinTimestamp.push(
      new Date(coinHistory.data.history[i].timestamp * 1000).toLocaleString()
    );
  }
  coinPrice.reverse();
  coinTimestamp.reverse();
  const data = {
    labels: coinTimestamp,
    datasets: [
      {
        label: "Price in USD",
        data: coinPrice,
        fill: false,
        backgroundColor: "#0071bd",
        borderColor: "#0071bd",
      },
    ],
  };
  const options = {
    scales: {
      y: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  return (
    <>
      <Row className="chart-header">
        <Title level={2} className="chart-title">
          {" "}
          {coinName} Price Chart{" "}
        </Title>
        <Col className="price-container">
          <Title level={5} className="price-change">
            Price Change: {coinHistory?.data?.change} %
          </Title>
          <Title level={5} className="current-price">
            Current {coinName} Price: $ {currentPrice}
          </Title>
        </Col>
      </Row>
      <Line data={data} options={options} />
    </>
  );
};

export default LineChart;
