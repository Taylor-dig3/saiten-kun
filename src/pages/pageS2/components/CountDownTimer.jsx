import React from 'react';
import { useTimer } from 'react-timer-hook';

export default function CountDownTimer({ timeLimit,setTimeUpFlag}) {
    const expiryTimestamp = new Date();
    expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + (timeLimit * 60));
    
    const {
        seconds,
        minutes,
       
      } = useTimer({ expiryTimestamp, onExpire: () => {
        setTimeUpFlag(true)
        console.warn('onExpire called') }});

      const formatTime = (time) => {
        return String(time).padStart(2, "0");
      };
      return (
        <div style={{textAlign: 'center'}}>
          <p>Timer Demo</p>
          <div style={{fontSize: '50px'}}>
            <span>{formatTime(minutes)}</span>:<span>{formatTime(seconds)}</span>
          </div>
          
        </div>
      );
    }

