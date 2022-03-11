import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import React from "react";
import NavBarComponent from "../components/NavBar";
import { AuthContext } from "../context/auth.context";
import moment from "moment";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Area,
  AreaChart,
  ComposedChart,
  Bar,
} from "recharts";

const API_URL = "https://flow-acquarium-app.herokuapp.com";

function Charts(props) {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [acquarium, setAcquarium] = useState([]);
  const { isLoggedIn } = useContext(AuthContext);

  function formatXAxis(item) {
    // If using moment.js
    return moment(item).format("DD/MM/YY");
  }

  useEffect(() => {
    const getAcquariums = () => {
      // Get the token from the localStorage
      const storedToken = localStorage.getItem("authToken");

      // Send the token through the request "Authorization" Headers
      axios
        .get(`${API_URL}/acquarium/${id}`, {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
        .then((response) => {
          let dataArray = [];
          setAcquarium(response.data);
          let logsArray = response.data.logs;
          logsArray.forEach((obj) => {
            Object.keys(obj).forEach((key) => {
              if (key === "measurements") {
                obj[key].forEach((value) => {
                  dataArray.push(value);
                });
              }
            });
          });

          setData(dataArray);
        })
        .catch((error) => console.log(error));
    };
    getAcquariums();
  }, []);

  return (
    <section className="background">
      <NavBarComponent />

      {data.length === 0 && (
        <p className="text-white">Add logs to see charts data</p>
      )}
      {!isLoggedIn && (
        <div className="alert alert-danger" role="alert">
          Log in to see Charts!
        </div>
      )}
      {data.length > 0 && (
        <div>
          <div className="alert alert-primary" role="alert">
            Acquarium: {acquarium.name}
          </div>
          <div className="container centered">
            <div className="row">
              <div className="col-sm-12 col-md-6 col-lg-4">
                <LineChart
                  width={500}
                  height={300}
                  data={data}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="timestamp"
                    tick={{ fill: "rgba(255,255,255, 0.7)" }}
                    tickFormatter={formatXAxis}
                  />
                  <YAxis tick={{ fill: "rgba(255,255,255, 0.7)" }} />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="temperature"
                    stroke="#8884d8"
                    activeDot={{ r: 8 }}
                  />
                  <Line type="monotone" dataKey="ph" stroke="#82ca9d" />
                </LineChart>
              </div>
              <div className="col-sm-12 col-md-6 col-lg-4">
                <LineChart
                  width={500}
                  height={300}
                  data={data}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="timestamp"
                    tickFormatter={formatXAxis}
                    tick={{ fill: "rgba(255,255,255, 0.7)" }}
                  />
                  <YAxis tick={{ fill: "rgba(255,255,255, 0.7)" }} />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="alkalinity"
                    stroke="#8884d8"
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </div>
              <div className="col-sm-12 col-md-6 col-lg-4">
                <LineChart
                  width={500}
                  height={300}
                  data={data}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="timestamp"
                    tickFormatter={formatXAxis}
                    tick={{ fill: "rgba(255,255,255, 0.7)" }}
                  />
                  <YAxis tick={{ fill: "rgba(255,255,255, 0.7)" }} />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="ammonia"
                    stroke="#8884d8"
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </div>
              <div className="col-sm-12 col-md-6 col-lg-4">
                <LineChart
                  width={500}
                  height={300}
                  data={data}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="timestamp"
                    tickFormatter={formatXAxis}
                    tick={{ fill: "rgba(255,255,255, 0.7)" }}
                  />
                  <YAxis tick={{ fill: "rgba(255,255,255, 0.7)" }} />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="nitrite"
                    stroke="#8884d8"
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </div>
              <div className="col-sm-12 col-md-6 col-lg-4">
                <BarChart
                  width={500}
                  height={300}
                  data={data}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="timestamp"
                    tickFormatter={formatXAxis}
                    tick={{ fill: "rgba(255,255,255, 0.7)" }}
                  />
                  <YAxis
                    yAxisId="left"
                    orientation="left"
                    stroke="#8884d8"
                    tick={{ fill: "rgba(255,255,255, 0.7)" }}
                  />
                  <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                  <Tooltip />
                  <Legend />
                  <Bar yAxisId="left" dataKey="nitrite" fill="#8884d8" />
                  <Bar yAxisId="right" dataKey="nitrate" fill="#82ca9d" />
                </BarChart>
              </div>
              <div className="col-sm-12 col-md-6 col-lg-4">
                <AreaChart
                  width={500}
                  height={270}
                  data={data}
                  margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="timestamp" tickFormatter={formatXAxis} />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="salinity"
                    stackId="1"
                    stroke="#8884d8"
                    fill="#8884d8"
                  />
                  <Area
                    type="monotone"
                    dataKey="calcium"
                    stackId="1"
                    stroke="#82ca9d"
                    fill="#82ca9d"
                  />
                  <Area
                    type="monotone"
                    dataKey="alkalinity"
                    stackId="1"
                    stroke="#ffc658"
                    fill="#ffc658"
                  />
                </AreaChart>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="wave wave1"></div>
      <div className="wave wave2"></div>
      <div className="wave wave3"></div>
      <div className="wave wave4"></div>
    </section>
  );
}

export default Charts;
