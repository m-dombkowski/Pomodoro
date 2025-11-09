import "./App.css";

import Home from "./routes/Home";
import { TimerProvider } from "./stores/TimerStore";

function App() {
  return (
    <TimerProvider>
      <Home />
    </TimerProvider>
  );
}

export default App;
