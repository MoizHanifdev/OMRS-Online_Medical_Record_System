import { useState, useEffect, useRef } from 'react';
import { useAuth } from './useAuth';

export function useSessionTimeout(idleMinutes = 25, warningMinutes = 5) {
  const [isIdle, setIsIdle] = useState(false);
  const [countdown, setCountdown] = useState(warningMinutes * 60);
  const { logout } = useAuth();
  
  const timerRef = useRef<NodeJS.Timeout>();
  const countdownRef = useRef<NodeJS.Timeout>();

  const resetTimer = () => {
    if (isIdle) return; // Don't reset if already showing warning modal
    
    if (timerRef.current) clearTimeout(timerRef.current);
    
    timerRef.current = setTimeout(() => {
      setIsIdle(true);
      setCountdown(warningMinutes * 60);
    }, idleMinutes * 60 * 1000);
  };

  useEffect(() => {
    if (isIdle) {
      countdownRef.current = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(countdownRef.current);
            logout();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (countdownRef.current) clearInterval(countdownRef.current);
    }

    return () => {
      if (countdownRef.current) clearInterval(countdownRef.current);
    };
  }, [isIdle, logout]);

  useEffect(() => {
    const events = ['mousedown', 'keydown', 'touchstart', 'scroll'];
    const handleActivity = () => resetTimer();

    events.forEach((e) => window.addEventListener(e, handleActivity));
    resetTimer();

    return () => {
      events.forEach((e) => window.removeEventListener(e, handleActivity));
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isIdle]);

  const stayLoggedIn = () => {
    setIsIdle(false);
    resetTimer();
    // ping server to keep session alive if necessary
  };

  return { isIdle, countdown, stayLoggedIn };
}
