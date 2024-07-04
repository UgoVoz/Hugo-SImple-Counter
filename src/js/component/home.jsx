import React, { useState, useEffect }from "react";


function SimpleCounterBonus() {
  // Todo código JS
  const [isActive, setIsActive] = useState(false);
  const [counter, setCounter] = useState(0);
  const [countDown, setCountDown] = useState(false);
  const [status, setStatus] = useState({
    icon: "fas fa-clock",
    title: "Clock",
    className: "text-center"
  });

  const handleReset = () => {
    setIsActive(false);
    setCounter(0);
    setCountDown(false);
    setStatus({ icon: "fas fa-clock", title: "Clock", className: "text-center" });
  };

  const handleStart = () => {
    setIsActive(!isActive);  
    if (countDown) {
      setStatus({
        icon: "fas fa-history",
        title: "Timer",
        className: "text-center text-danger"
      });
    } else {
      setStatus({
        icon: "fas fa-stopwatch",
        title: "Chronometer",
        className: "text-center text-primary"
      });
    }
  };

  const handleTimer = (e) => {
    if (
      e.target.value !== null &&
      e.target.value >= 0 &&
      e.target.value.length > 0 &&
      !isNaN(e.target.value)
    ) {
      setCounter(parseInt(e.target.value));
      setCountDown(true);
      setStatus({ icon: "fas fa-history", title: "Timer", className: "text-center text-danger" });
    } else {
      setCounter(0);
      e.target.value = "";
    }
  }


  useEffect(() => {
    if (isActive) {
      const nIntervalId = setInterval(() => {
        if (countDown === true && counter >= 0) {
          if (counter === 0) {
            setCounter(0);
            setIsActive(false);
          } else {
            setCounter(counter => counter - 1);
          }
        } else 
          if (countDown === false) {
           setCounter(counter => counter + 1);
        }
      }, 10);
      return () => clearInterval(nIntervalId);
    }
  }, [isActive, counter, countDown]);


  return (
    <div>
      <h1 className="text-center mt-7">{"Simple Counter"}</h1>
      <h2 className={status.className}>{status.title}</h2>
      <div className="big-counter">
        <div><i className={status.icon} /></div>
        <div>{Math.floor(counter / 10000000) % 10}</div>
        <div>{Math.floor(counter / 1000000) % 10}</div>
        <div>{Math.floor(counter / 100000) % 10}</div>
        <div>{Math.floor(counter / 10000) % 10}</div>
        <div>{Math.floor(counter / 1000) % 10}</div>
        <div>{Math.floor(counter / 100) % 10}</div>
        <div>,</div>
        <div>{Math.floor(counter / 10) % 10}</div>
        <div>{counter % 10}</div>
        <div className="btn-group-horizontal btn-group-sm" role="group" aria-label="Horizontal button group">
          <button type="button" className="btn btn-outline-success"
            onClick={() => handleStart()}>
            {isActive ? "Pause" : "Start"}
          </button>
          <button type="button" className="btn btn-outline-info"
            onClick={() => handleReset()}>
            {"Reset"}
          </button>
        </div>
      </div>
      <div className="container bg-light barra">
        <div className="input-group my-3 p-2 barra1">
          <span className="input-group-text bg-warning">Establecer temporizador</span>
          <input type="text" aria-label="First name" className="form-control barra"
            placeholder="Configura el cronómetro (décimas de segundo)"
            onChange={(e) => handleTimer(e)} />
        </div>
      </div>
    </div>
  );
};


export default SimpleCounterBonus;