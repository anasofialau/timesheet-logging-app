import React, { useState, useEffect } from 'react';
import Loader from './Loader';
import DateTimePicker from 'react-datetime-picker'
import Modal from 'react-modal';

const Home  = () => {
  const [timeLogs, setTimeLogs] = useState({});
  const [loading, setLoading] = useState(true);
  const [isTimeRunning, setIsTimeRunning] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [logToEdit, setLogToEdit] = useState({});
  const [username, setUsername] = useState("");

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
    if (username != "") {
      const url = "time_logs/clock_in";
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: username })
      };
      fetch(url, requestOptions)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(response => {
        setIsTimeRunning(true)
      })
      .catch(() => console.log('An error occurred while clocking in.'));
    } else {
      alert("Please enter the username in order to clock in/out")
    }
  };

  const clockOut = () => {
    if (username != "") {
      const url = "time_logs/clock_out?log_id=" + timeLogs[0]?.id;
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: username })
      };
      fetch(url, requestOptions)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(response => {
        setIsTimeRunning(false)
      })
      .catch(() => console.log('An error occurred while clocking out.'));
    } else {
      alert("Please enter the username in order to clock in/out")
    }
   
  };

  const formatTimestampDate = (date) => {
    if (date != undefined) {
      let d = new Date(date);
      return d.toLocaleString()
    }
  };

  const editLog = () => {
    if (username != "") {
      const url = "time_logs/" + logToEdit.id;
      const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ time_log: logToEdit, username: username })
      };
      fetch(url, requestOptions)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(response => {
        stopEditing()
      })
      .catch(() => alert('An error occurred while updating the time entries. Please check the clock in/out entries'));
    } else {
      alert("Please enter the username in order to clock in/out")
    }
  };

  const startEditing = (log) => {
    setLogToEdit(log);
    setIsModalOpen(true);
  }

  function stopEditing() {
    setIsModalOpen(false);
  }

  function setStartedAtForLogToEdit(e) {
    let log = logToEdit;
    log.started_at = e;
    setLogToEdit(log);
  }

  function setEndedAtForLogToEdit(e) {
    let log = logToEdit;
    log.ended_at = e;
    setLogToEdit(log);
  }

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

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
        <br/> 
        <label htmlFor="username">Username</label>
        <br/> 
        <input name="username" value={username} onChange={(e) => setUsername(e.target.value)}/>
        
        <hr/>
        <p className="lead">
          List of time entries.
        </p>

        <Modal
          isOpen={isModalOpen}
          ariaHideApp={false}
          style={customStyles}
        >
          <h2>Edit Time Log</h2>
          <div>
            <div>Started at</div>
            <DateTimePicker
              onChange={(e) => setStartedAtForLogToEdit(e)}
              value={new Date(logToEdit.started_at)}
            />
          </div>
          <div>
            <div>Ended at</div>
            <DateTimePicker
              onChange={(e) => setEndedAtForLogToEdit(e)}
              value={new Date(logToEdit.ended_at)}
            />
          </div>
          <br/>
          <button className="btn btn-primary" onClick={stopEditing}>Close</button>
          <button className="btn btn-primary" onClick={() => editLog()}>Edit</button>
        </Modal>
        
        {
          loading ? <Loader /> : (
            <div>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Clocked In</th>
                    <th scope="col">Clocked Out</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {timeLogs.map((log) =>
                    <tr key={log.id}>
                      <th scope="row">{log.id}</th>
                      <td>{formatTimestampDate(log.started_at)}</td>
                      <td>{formatTimestampDate(log.ended_at)}</td>
                      <td>
                        <button className="btn btn-primary" onClick={() => startEditing(log)}>Edit</button>
                      </td>
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