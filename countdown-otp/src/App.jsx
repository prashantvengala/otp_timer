import React, { useEffect, useState } from "react";
import "./App.css";
const App = () => {
  // State variables to mange OTP input, minutes and seconds
  const [otp, setOtp] = useState("");
  const [minutes, setMinutes] = useState(1);
  const [seconds, setSeconds] = useState(59);

  const resendOtp = () => {
    setMinutes(1);
    setSeconds(30);
  };
  const handleSubmit = () => {
    if (otp.length !== 6 || isNaN(otp)) {
      alert("Please enter a valid 6-digit OTP.");
      return;
    }
    alert("OTP Verified Successfully!");
  };
  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(interval);
        } else {
          setSeconds(59);
          setMinutes(minutes - 1);
        }
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [seconds, minutes]);

  return (
    <div className="container">
      <div className="card">
        <h4>Verify OTP</h4>
        <input
          placeholder="Enter OTP"
          value={otp}
          onChange={({ target }) => {
            setOtp(target.value);
          }}
        />
        <div className="countdown-text">
          <p>
            Time Remaining:{" "}
            <span style={{ fontWeight: 600 }}>
              {minutes < 10 ? `0${minutes}` : minutes}:
              {seconds < 10 ? `0${seconds}` : seconds}
            </span>
          </p>

          <button
            disabled={seconds > 0 || minutes > 0}
            style={{
              color: seconds > 0 || minutes > 0 ? "#DFE3E5" : "#FF5630",
            }}
            onClick={resendOtp}
          >
            Resend
          </button>
        </div>
        <button className="submit-btn" onClick={handleSubmit}>
          SUBMIT
        </button>
      </div>
    </div>
  );
};

export default App;
