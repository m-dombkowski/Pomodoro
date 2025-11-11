/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { createContext, useContext, useReducer } from "react";

type Timer = {
  isRunning: boolean;
  startTime: number | null;
  elapsedTime: number | null;
  currentTimer: number;
};
type TimerAction =
  | { type: "START_TIMER"; startTime: number }
  | { type: "STOP_TIMER"; stopTime: number }
  | { type: "RESET_TIMER" }
  | { type: "UPDATE_TIMER"; currentTimer: number };

const initialTimer: Timer = {
  isRunning: false,
  startTime: null,
  elapsedTime: null,
  currentTimer: 0,
};
const TimerContext = createContext<Timer | null>(null);
const TimerDispatchContext = createContext<React.Dispatch<TimerAction> | null>(
  null
);

let interval: ReturnType<typeof setInterval>;

export function TimerProvider({ children }: { children: React.ReactNode }) {
  const [timer, dispatch] = useReducer(timerReducer, initialTimer);

  return (
    <TimerContext.Provider value={timer}>
      <TimerDispatchContext.Provider value={dispatch}>
        {children}
      </TimerDispatchContext.Provider>
    </TimerContext.Provider>
  );
}

const timerReducer = (timer: Timer, action: TimerAction) => {
  switch (action.type) {
    case "START_TIMER":
      return {
        ...timer,
        isRunning: true,
        startTime: action.startTime,
        currentTimer: timer.elapsedTime ?? timer.currentTimer,
      };
    case "STOP_TIMER":
      return {
        ...timer,
        isRunning: false,
        elapsedTime:
          (timer.elapsedTime ?? 0) + (action.stopTime - (timer.startTime ?? 0)),
      };
    case "RESET_TIMER":
      return {
        isRunning: false,
        startTime: null,
        elapsedTime: 0,
        currentTimer: 0,
      };

    case "UPDATE_TIMER":
      return {
        ...timer,
        currentTimer: action.currentTimer,
      };

    default: {
      const _exhaustiveCheck: never = action;
      throw new Error(`Unhandled action type: ${JSON.stringify(action)}`);
    }
  }
};

export function useTimer() {
  const context = useContext(TimerContext);
  if (!context) {
    throw new Error("useTimer must be used within a TimerProvider");
  }
  return context;
}

export function useTimerDispatch() {
  const context = useContext(TimerDispatchContext);
  if (!context) {
    throw new Error("useTimerDispatch must be used within a TimerProvider");
  }
  return context;
}

export const manageCountDown = (
  timeLeft?: number,
  updateVisual?: (value: TimerAction) => void,
  isRunning?: boolean
) => {
  clearInterval(interval);
  if (!isRunning) return;

  interval = setInterval(() => {
    if (timeLeft && updateVisual) {
      timeLeft--;

      updateVisual({ type: "UPDATE_TIMER", currentTimer: timeLeft });

      if (timeLeft <= 0) {
        updateVisual({ type: "RESET_TIMER" });
        clearInterval(interval);
        return;
      }
    }
  }, 1000);
};
