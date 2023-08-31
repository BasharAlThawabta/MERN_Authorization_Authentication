import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from "../App.module.css";
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [data, setData] = useState({ userData: [], userSession: [] });
  const navigate = useNavigate(); 

  useEffect(() => {
    axios.get('/dashboard')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        if (error.response && error.response.status === 401) {
          navigate('/login');
        }
      });
  }, []);

  const handleDelete = (sessionToken) => {
  axios.get(`/delete/${sessionToken}`)
    .then(response => {
     
      navigate('/login');
    })
    .catch(error => {
      console.error('Error deleting session:', error);
    });
};

  if (!data.userData.length && !data.userSession.length) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className={styles.table}>
        <h1>Dashboard</h1>
        <div>
          <h2>User Email:</h2>
          <ul>
            {data.userData.map(user => (
              <li key={user.id}>{user.email}</li>
            ))}
          </ul>
        </div>
        <div>
          <h2>User Session:</h2>
          <table className={styles.sessionTable}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Email</th>
                <th>Session Token</th>
                <th>Session expired date</th>
                <th>CookiemaxAge</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {data.userSession.map(session => (
                <tr key={session.session_token}>
                  <td>{session.id}</td>
                  <td>{session.email}</td>
                  <td>{session.session_token}</td>
                  <td>{session.expiredDate}</td>
                  <td>{session.CookiemaxAge}</td>
                  <td>
                    <button onClick={() => handleDelete(session.session_token)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
};

export default Dashboard;
