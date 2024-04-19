import React, { useState, useEffect } from 'react';

const EmailTimer: React.FC = () => {
  const [countdown, setCountdown] = useState(300);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(prevCountdown => {
        if (prevCountdown > 0) {
          return prevCountdown - 1;
        } else {
          clearInterval(interval);
          return 0;
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `0${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div>{formatTime(countdown)}</div>
  );
};

export default EmailTimer;
