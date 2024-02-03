import Home from "./Components/Home.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div>
      <div style={{ zIndex: "999" }}>
        <ToastContainer autoClose={500} />
      </div>
      <Home />
    </div>
  );
}

export default App;
