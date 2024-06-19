import { useState, useEffect, useCallback } from 'react';
import moment from 'moment';

const useTimer = (initialTime: number, timerEndCallback: () => void) => {
  const [time, setTime] = useState(moment.duration(initialTime, 'minutes'));
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timer: any;
    if (isRunning) {
      timer = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime.asSeconds() <= 0) {
            clearInterval(timer);
            timerEndCallback();
            return moment.duration(0);
          }
          return moment.duration(prevTime.asSeconds() - 1, 'seconds');
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning, timerEndCallback]);

  const resetTimer = useCallback(() => {
    setTime(moment.duration(initialTime, 'minutes'));
    setIsRunning(true);
  }, []);

  const stopTimer = useCallback(() => {
    setIsRunning(false);
  }, []);

  const formattedTime = `${time.hours().toString().padStart(2, '0')}:${time
    .minutes()
    .toString()
    .padStart(2, '0')}:${time.seconds().toString().padStart(2, '0')}`;

  return { formattedTime, resetTimer, stopTimer, isRunning };
};

export default useTimer;
