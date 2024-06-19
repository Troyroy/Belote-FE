import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { statsWebSocket } from "../connection/StatsWebSockets";
import { LineChart, barElementClasses } from "@mui/x-charts";
import { axisClasses } from "@mui/x-charts/ChartsAxis";
import StatsConnection from "../connection/StatsConnection";
import "./AdminPage.css";
function AdminPage() {
  let times1 = 1;

  const { messagesReceived } = statsWebSocket();
  const [total, setTotal] = useState([1]);
  const [time, setTime] = useState([1]);
  const [leaderBoard, setLeaderBoard] = useState([]);
  useEffect(() => {
    StatsConnection.getLeaderBoard().then((result) => {
      setLeaderBoard(result);
    });
  }, []);

  useEffect(() => {
    if (!isNaN(parseInt(messagesReceived[messagesReceived.length - 1]))) {
      console.log(total);
      console.log(time);
      if (total.length > 10) {
        total.shift();
        time.shift();
        console.log(time);
        console.log(total);
      }
      setTotal((prevMessages) => [
        ...prevMessages,
        parseInt(messagesReceived[messagesReceived.length - 1]),
      ]);

      setTime((prevMessages) => [...prevMessages, times1]);
      times1 = time[time.length - 1] + 1;
      console.log(times1);
    }
  }, [messagesReceived]);

  return (
    <div>
      AdminPage
      <h1>Current number of games:</h1>
      <LineChart
        sx={(theme) => ({
          [`.${barElementClasses.root}`]: {
            fill: theme.palette.background.paper,
            strokeWidth: 2,
          },
          [`.MuiBarElement-series-l_id`]: {
            stroke: "#FFFFFF",
          },
          [`.MuiBarElement-series-r_id`]: {
            stroke: "#000000",
          },
          [`.${axisClasses.root}`]: {
            [`.${axisClasses.tick}, .${axisClasses.line}`]: {
              stroke: "#006BD6",
              strokeWidth: 3,
            },
            [`.${axisClasses.tickLabel}`]: {
              fill: "#006BD6",
            },
          },

          border: `1px solid rgba(${
            theme.palette.mode === "dark" ? "255,255,255" : "0, 0, 0"
          }, 0.1)`,
          backgroundImage: `linear-gradient(rgba(${
            theme.palette.mode === "dark" ? "255,255,255" : "0, 0, 0"
          }, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(${
            theme.palette.mode === "dark" ? "255,255,255" : "0, 0, 0"
          }, 0.1) 1px, transparent 1px)`,
          backgroundSize: "35px 35px",
          backgroundPosition: "20px 20px, 20px 20px",
        })}
        xAxis={[{ data: time }]}
        series={[
          {
            data: total,
            area: true,
          },
        ]}
        width={800}
        height={300}
      />
      <h1>LeaderBoard</h1>
      <div className="horizontal">
        <li className="horizontal">
          {leaderBoard.map((item) => (
            <div>
              <li key={item.username} id={item.username}>
                <p>
                  {item.username} : {item.gamesWon}
                </p>
              </li>
            </div>
          ))}
        </li>
      </div>
    </div>
  );
}

export default AdminPage;
