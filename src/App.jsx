import { Route, Link, Routes } from "react-router-dom";
import { Layout, Typography, Space } from "antd";
import {
  Navbar,
  Homepage,
  CryptoDetails,
  Cryptocurrencies,
  News,
} from "./components";
import "./App.css";
import 'antd/dist/reset.css'
function App() {
  return (
    
      <div className="app">
        <div className="navbar">
          <Navbar />
        </div>
        <div className="main">
          <Layout>
            <div className="routes">
              <Routes>
                <Route path="/" element={<Homepage />} />
                
                <Route
                  path="/cryptocurrencies"
                  element={<Cryptocurrencies />}
                />
                <Route path="/crypto/:coinId" element={<CryptoDetails />} />
                <Route path="/news" element={<News />} />
              </Routes>
            </div>
          </Layout>
          <div className="footer">
            <Typography.Title
              style={{ color: "white", textAlign: "center" }}
            >
              Crypto Pulse <br />
              All rights reserved
            </Typography.Title>
            <Space>
              <Link to="/">Home</Link>

              <Link to="/news">News</Link>
            </Space>
          </div>
        </div>
      </div>
  
  );
}

export default App;
