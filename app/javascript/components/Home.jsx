import React, { useState, useEffect } from 'react';
import Loader from './Loader';
// import Pending from './Pending';
// import Completed from './Completed';

const Home  = () => {
  const [timeLogs, setTimeLogs] = useState({});
  const [loading, setLoading] = useState(true);
  const [isTimeRunning, setIsTimeRunning] = useState(false);

  useEffect(() => {
    const url = "time_logs/all_time_logs";
    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(response => {
        setTimeLogs(response?.data);
        setIsTimeRunning(response?.data[0]?.ended_at == null && response.data.length > 0)
        setLoading(false);
      })
      .catch(() => console.log('An error occurred while fetching the time entries'));
  }, [isTimeRunning]);

  const clockIn = () => {
    const url = "time_logs/clock_in";
    fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error("Network response was not ok.");
    })
    .then(response => {
      setIsTimeRunning(true)
    })
    .catch(() => console.log('An error occurred while fetching the time entries'));
  }

  const clockOut = () => {
    const url = "time_logs/clock_out?log_id=" + timeLogs[0]?.id;
    fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error("Network response was not ok.");
    })
    .then(response => {
      setIsTimeRunning(false)
    })
    .catch(() => console.log('An error occurred while fetching the time entries'));
  }

  return (
    <div className="d-flex">
      <div className="container secondary-color">
        <h1 className="display-4">Time Logs</h1>
        <div className="col-lg-12">
          <button className="btn btn-primary" onClick={() => clockIn()} disabled={isTimeRunning}>
            Clock In
          </button>
          <button className="btn btn-primary" onClick={() => clockOut()} disabled={!(isTimeRunning)}>
            Clock Out
          </button>
        </div>
        
        <hr/>
        <p className="lead">
          List of time entries.
        </p>
        {
          loading ? <Loader /> : (
            <div>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Clocked In</th>
                    <th scope="col">Clocked Out</th>
                  </tr>
                </thead>
                <tbody>
                  {timeLogs.map((log) =>
                    <tr key={log.id}>
                      <th scope="row">{log.id}</th>
                      <td>{log.started_at}</td>
                      <td>{log.ended_at}</td>
                    </tr>
                  )}  
                </tbody>
              </table>
            </div>
          )
        }
      </div>
    </div>
  )
}

export default Home;