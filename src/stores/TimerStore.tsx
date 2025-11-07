/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext, useReducer } from "react";

type Timer = {
  isRunning: boolean;
  startTime: number | null;
  elapsedTime: number;
  currentTimer: number;
};
type TimerAction =
  | { type: "START_TIMER"; startTime: number }
  | { type: "STOP_TIMER"; stopTime: number }
  | { type: "RESET_TIMER" };

const initialTimer: Timer = {
  isRunning: false,
  startTime: null,
  elapsedTime: 0,
  currentTimer: 0,
};

export function TimerProvider({ children }: { children: React.ReactNode }) {
  const TimerContext = createContext<Timer | null>(null);
  const TimerDispatchContext =
    createContext<React.Dispatch<TimerAction> | null>(null);

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
        currentTimer: timer.elapsedTime ?? 0,
      };
    case "STOP_TIMER":
      return {
        ...timer,
        isRunning: false,
        elapsedTime:
          timer.elapsedTime + (action.stopTime - (timer.startTime ?? 0)),
      };
    case "RESET_TIMER":
      return {
        isRunning: false,
        startTime: null,
        elapsedTime: 0,
        currentTimer: 0,
      };
    default: {
      const _exhaustiveCheck: never = action;
      throw new Error(`Unhandled action type: ${JSON.stringify(action)}`);
    }
  }
};
