import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [message, setMessage] = useState('Loading...');

  useEffect(() => {
    fetch('/api/hello?name=questleen')
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch(() => setMessage('Error fetching message'));
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        width: '100vw',
        padding: '1rem',
        margin: 0,
        background: 'linear-gradient(135deg, #FFDEE9 0%, #B5FFFC 100%)',
      }}
    >
      <h1
        style={{
          fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
          fontSize: 'clamp(2.5rem, 8vw, 5rem)',
          color: '#333',
          margin: '0.5rem',
          textShadow: '2px 2px rgba(0,0,0,0.1)',
          textAlign: 'center',
        }}
      >
        questleen
      </h1>
      <p
        style={{
          fontFamily: 'Arial, sans-serif',
          fontSize: 'clamp(1rem, 4vw, 1.25rem)',
          color: '#555',
          margin: 0,
          textAlign: 'center',
        }}
      >
        {message}
      </p>
    </div>
  );
}

export default App;
