import React, { useState, useEffect } from 'react';

function Teams() {
  const [names, setNames] = useState([]);
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    // Fetch names when component mounts
    fetch('/api/names')
      .then((res) => res.json())
      .then((data) => setNames(data.names))
      .catch((error) => console.error('Error fetching names:', error));
  }, []);

  const generateTeams = () => {
    // Shuffle names array
    const shuffledNames = [...names].sort(() => Math.random() - 0.5);
    
    // Split into two teams
    const midpoint = Math.ceil(shuffledNames.length / 2);
    const team1 = shuffledNames.slice(0, midpoint);
    const team2 = shuffledNames.slice(midpoint);
    
    setTeams([team1, team2]);
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: '100vh',
        padding: '2rem',
        background: 'linear-gradient(135deg, #FFDEE9 0%, #B5FFFC 100%)',
      }}
    >
      <h1
        style={{
          fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
          fontSize: 'clamp(2rem, 5vw, 3rem)',
          color: '#333',
          marginBottom: '2rem',
          textAlign: 'center',
        }}
      >
        Team Assignments
      </h1>

      <button
        onClick={generateTeams}
        style={{
          padding: '1rem 2rem',
          fontSize: '1.2rem',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          marginBottom: '2rem',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        }}
      >
        Generate Teams
      </button>

      {teams.length > 0 && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '2rem',
            width: '100%',
            maxWidth: '1200px',
            flexWrap: 'wrap',
          }}
        >
          {teams.map((team, index) => (
            <div
              key={index}
              style={{
                flex: '1',
                minWidth: '300px',
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                padding: '2rem',
                borderRadius: '12px',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
              }}
            >
              <h2
                style={{
                  color: '#333',
                  marginBottom: '1rem',
                  textAlign: 'center',
                }}
              >
                Team {index + 1}
              </h2>
              <ul
                style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0,
                }}
              >
                {team.map((name, nameIndex) => (
                  <li
                    key={nameIndex}
                    style={{
                      padding: '0.5rem',
                      borderBottom: '1px solid #eee',
                      textAlign: 'center',
                      fontSize: '1.1rem',
                    }}
                  >
                    {name}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Teams; 