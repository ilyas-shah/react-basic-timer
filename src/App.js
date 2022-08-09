import React, { Fragment, useState } from "react";

function Solution() {
  const [time, setTime] = useState("00.00");
  const [mins, setMins] = useState("");
  const [secs, setSecs] = useState("");
  const [pause, togglePause] = useState(false);
  const formatTime = (mins, seconds) => {
    mins = Number(mins);
    seconds = Number(seconds);

    if (mins < 10) {
      mins = "0" + mins;
    } else if (mins < 1) {
      mins = "00";
    }

    if (seconds < 10) {
      seconds = "0" + seconds;
    } else if (seconds < 1) {
      seconds = "00";
    }

    return `${mins}:${seconds}`;
  };

  const displayTime = (mins, secs) => {
    const formattedTime = formatTime(mins, secs);
    setTime(formattedTime);
  };

  const handleTime = () => {
    let seconds = Number(secs),
      minutes = Number(mins);

    if (!window.timer) {
      window.timer = setInterval(() => {
        // change minutes as per seconds, 2 minutes 65 seconds
        // will become 3 minutes 5 seconds
        if (seconds > 60) {
          minutes = minutes + Math.floor(seconds / 60);
          seconds = seconds % 60;
        }

        if (minutes && seconds === 0) {
          console.log("minutes && seconds === 0");
          // reset seconds when it is zero and decrement the mins
          seconds = 60;
          minutes = minutes - 1;
        } else if (minutes === 0 && seconds === 0) {
          minutes = 0;
          seconds = 0;
          return reset();
        }
        seconds = seconds - 1;
        displayTime(minutes, seconds);
      }, 1000);
    }
  };

  const clearTimer = () => {
    clearInterval(window.timer);
    window.timer = 0;
  };

  const parseTime = () => {
    let [m, s] = time.split(":");

    m = parseInt(m, 10);
    s = parseInt(s, 10);

    return [m, s];
  };

  const reset = () => {
    setMins("");
    setSecs("");
    setTime("00:00");
    clearTimer();
  };

  const saveTime = () => {
    const [m, s] = parseTime();

    setMins(m);
    setSecs(s);
  };

  const handlePauseResume = () => {
    togglePause(!pause);
    clearTimer();
    saveTime();

    if (pause) {
      return handleTime();
    }
  };

  return (
    <Fragment>
      <label>
        <input
          type="number"
          value={mins}
          onChange={(e) => setMins(e.target.value)}
        />
        Minutes
      </label>
      <label>
        <input
          type="number"
          value={secs}
          onChange={(e) => setSecs(e.target.value)}
        />
        Seconds
      </label>

      <button onClick={handleTime}>START</button>
      <button onClick={handlePauseResume}>PAUSE / RESUME</button>
      <button onClick={reset}>RESET</button>

      <h1 data-testid="running-clock">{time}</h1>
    </Fragment>
  );
}

export default Solution;
