import Router from "./router/Router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <div className="relative min-h-[100vh] bg-gradient-main-light dark:bg-gradient-main-dark transition-colors duration-300">
      <Router />
      <ToastContainer position="top-right" />
    </div>
  );
}

export default App;
