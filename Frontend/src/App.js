import MyRouter from "./routes/MyRouter";
import MyNavbar from "./components/MyNavbar/MyNavbar";
import './App.css'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

function App() {
  return (
    <div>
      <MyNavbar/>
      <MyRouter />
    </div>
  );
}

export default App;
