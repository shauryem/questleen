import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Teams from './pages/Teams';
import './App.css';

function Home() {
  const navigate = useNavigate();
  const [message, setMessage] = useState('Loading...');
  const [name, setName] = useState('');
  const [names, setNames] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/api/hello?name=questleen')
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch(() => setMessage('Error fetching message'));

    fetchNames();
  }, []);

  const fetchNames = async () => {
    try {
      const response = await fetch('/api/names');
      const data = await response.json();
      setNames(data.names);
      setError('');
    } catch (err) {
      setError('Error fetching names');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name.trim()) {
      try {
        const response = await fetch('/api/names', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name: name.trim() }),
        });
        const data = await response.json();
        
        if (response.ok) {
          setNames(data.names);
          setName('');
          setError('');
        } else {
          setError(data.error || 'Error adding name');
        }
      } catch (err) {
        setError('Error submitting name');
      }
    }
  };

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
          margin: '0 0 2rem 0',
          textAlign: 'center',
        }}
      >
        {message}
      </p>
      
      <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter a name"
          style={{
            padding: '0.5rem 1rem',
            fontSize: '1rem',
            borderRadius: '4px',
            border: '1px solid #ccc',
            marginRight: '0.5rem',
          }}
        />
        <button
          type="submit"
          style={{
            padding: '0.5rem 1rem',
            fontSize: '1rem',
            borderRadius: '4px',
            border: 'none',
            backgroundColor: '#4CAF50',
            color: 'white',
            cursor: 'pointer',
          }}
        >
          Add Name
        </button>
      </form>

      {error && (
        <p style={{ color: '#ff0000', margin: '1rem 0' }}>{error}</p>
      )}

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem',
          marginBottom: '2rem',
        }}
      >
        {names.map((n, index) => (
          <div
            key={index}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: 'rgba(255, 255, 255, 0.7)',
              borderRadius: '4px',
              fontSize: '1.1rem',
            }}
          >
            {n}
          </div>
        ))}
      </div>

      {names.length >= 2 && (
        <button
          onClick={() => navigate('/teams')}
          style={{
            padding: '1rem 2rem',
            fontSize: '1.2rem',
            backgroundColor: '#2196F3',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          }}
        >
          Start Team Assignment
        </button>
      )}
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/teams" element={<Teams />} />
      </Routes>
    </Router>
  );
}

export default App;
