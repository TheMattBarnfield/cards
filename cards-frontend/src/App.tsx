import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import socketio from 'socket.io-client'

const io = socketio('http://localhost:8000')
function App() {


  useEffect(() => {
    io.on('pulse', () => {
      console.log('pulse')
    });
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
