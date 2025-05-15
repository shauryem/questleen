import React from 'react';
import './App.css';

function App() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        margin: 0,
        background: 'linear-gradient(135deg, #FFDEE9 0%, #B5FFFC 100%)',
        flexDirection: 'column',
      }}
    >
      <h1
        style={{
          fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
          fontSize: '5rem',
          color: '#333',
          margin: '0.5rem',
          textShadow: '2px 2px rgba(0,0,0,0.1)',
        }}
      >
        questleen
      </h1>
      <p
        style={{
          fontFamily: 'Arial, sans-serif',
          fontSize: '1.25rem',
          color: '#555',
          margin: '0',
        }}
      >
        Welcome to your adventure
      </p>
    </div>
  );
}

export default App;