import './App.css';
import { useState, useEffect } from 'react';

function App() {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [error, setError] = useState('');
  const [timer, setTimer] = useState(false);

  useEffect(() => {
    let interval;
    if(timer) {
      interval = setInterval(() => {
        if(seconds <= 0) {
          setMinutes(minutes - 1);
          setSeconds(60);
        } else {
          setSeconds(seconds - 1)
        }
      }, 1000);

      if(minutes < 0) {
        setMinutes(0);
        setSeconds(0);
        setTimer(false);
      }
    }
    return () => clearInterval(interval);
  });


  const handleMinChange = (event) => {
    let min = parseInt(event.target.value);
    console.log('min: ', min);
    if(min < 0 || min > 60) {
      setError('Please enter a valid number of minutes');
    } else {
      setMinutes(min);
    }
  }

  const handleSecChange = event => {
    let sec = parseInt(event.target.value);
    console.log('sec: ', sec);
    if(sec < 0 || sec > 60) {
      setError('Please enter a valid number of seconds');
    } else {
      setSeconds(sec);
    }
  }

  const handleSubmit = event => {
    event.preventDefault();
    // console.log('minutes: ', minutes);
    // console.log('seconds: ', seconds);
    setTimer(true);
  }

  return (
    <div className="App">
      {
        error !== '' ? (
          <div>
            {error}
          </div>
        ) : (
  
          <div>
            <h1>{minutes}:{seconds}</h1>
            <input type="number" id="minutes" placeholder="Enter minutes" onChange={handleMinChange}/>
            <br /><br />
            <input type="number" id="seconds" placeholder="Enter seconds" onChange={handleSecChange}/>
            <br /><br />
            <button onClick={handleSubmit}>Start Timer</button>
          </div>
        )
      }
    </div>
  );
}

export default App;
