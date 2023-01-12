import React from 'react';
import { useTimer } from 'react-timer-hook';

export default function CountDownTimer({ timeLimit, setTimeUpFlag, submitTest }) {
  const expiryTimestamp = new Date();
  expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + (timeLimit * 60));

  const {
    seconds,
    minutes,
  } = useTimer({
    expiryTimestamp, onExpire: () => {
      console.warn('onExpire called');
      // setTimeUpFlag(true);
      submitTest(true);
    }
  });

  const formatTime = (time) => {
    return String(time).padStart(2, "0");
  };
  return (
    <span className='testTimer'>
      <div>
        <span className='testTimer-title'>あと</span>
        <span>{formatTime(minutes)}</span>:<span>{formatTime(seconds)}</span>
      </div>
    </span>
  );
}

