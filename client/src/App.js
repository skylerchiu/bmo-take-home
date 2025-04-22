import logo from './logo.svg';
import './App.css';
import {react, useState} from 'react'

const apiUrl = process.env.REACT_APP_API_URL;
function App() {

  const [data, setData] = useState(null);

  const sampleCall = async () => {
    try {
      const response = await fetch(`${apiUrl}/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        // body: JSON.stringify({
        // }),
      });
      const resp = await response.json();
      setData(resp.response); 
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <button onClick={sampleCall}>
        PRESS
      </button>
      <h1>{data}</h1>
      </header>
    </div>
  );
}

export default App;
