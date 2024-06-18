import { useState, useEffect, useCallback } from 'react';
import moment from 'moment';

const useTimer = (initialTime: number, handleEnd: () => void) => {
  const [time, setTime] = useState(moment.duration(initialTime, 'minutes'));
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timer: any;
    if (isRunning) {
      timer = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime.asSeconds() <= 0) {
            clearInterval(timer);
            handlePass();
            return moment.duration(0);
          }
          return moment.duration(prevTime.asSeconds() - 1, 'seconds');
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning, handleEnd]);

  const handleStart = useCallback(() => {
    setTime(moment.duration(initialTime, 'minutes'));
    setIsRunning(true);
  }, []);

  const handlePass = useCallback(() => {
    setIsRunning(false);
    handleEnd();
  }, [handleEnd]);

  const formattedTime = `${time.hours().toString().padStart(2, '0')}:${time
    .minutes()
    .toString()
    .padStart(2, '0')}:${time.seconds().toString().padStart(2, '0')}`;

  return { formattedTime, handleStart, handlePass, isRunning };
};

export default useTimer;
