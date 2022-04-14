import {useState, useEffect} from 'react';
import LoginPage from './Components/LoginPage/LoginPage';
import './main.css';

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
      <LoginPage />
    </div>
  );
}

export default App;
