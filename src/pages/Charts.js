import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import AddAcquarium from "../components/AddAcquarium";
import LogRow from "../components/LogRow";
import { Button, Card, Table } from "react-bootstrap";
import NavBar from "../components/NavBar";
import React, { PureComponent } from "react";
import NavBarComponent from "../components/NavBar";
import moment from "moment";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

const data = [];

const API_URL = "https://flow-acquarium-app.herokuapp.com";

function Charts(props) {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [acquarium, setAcquarium] = useState([]);

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
      <h2 className="titles">Acquarium: {acquarium.name}</h2>
      {data.length === 0 && <p>Add logs to see charts data</p>}
      {data.length > 0 && (
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
                  dataKey="calcium"
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
                  dataKey="ph"
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
                  dataKey="name"
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
                <Bar yAxisId="left" dataKey="pv" fill="#8884d8" />
                <Bar yAxisId="right" dataKey="uv" fill="#82ca9d" />
              </BarChart>
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
