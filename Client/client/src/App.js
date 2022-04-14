import {useState, useEffect} from 'react';
import './App.css';

function App() {
  const [location, setLocation] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/')
    .then(res => {
      return res.text();
    })
    .then(data => {
      setLocation(data);
    });
    console.log(location);
  });

  return (
    <div className="App">
      <p>{location}</p>
    </div>
  );
}

export default App;
