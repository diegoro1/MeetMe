import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      { fetch('http://127.0.0.1:8000/').then(res => res.json()).then(data => console.log(data))}
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
          nothing to see here
        </a>
      </header>
    </div>
  );
}

export default App;
