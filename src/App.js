import "./App.css";
import Sidebar from "./Sidebar";
import Chat from "./Chat";
import Login from "./Login";
import { useStateValue } from "./StateProvider";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

function App() {
  const [{ user }, dispatch] = useStateValue();

  function NotFound() {
    return (
      <div className=" app app_body not_found">
        <h2>Refresh or Click on the chat</h2>
        <p>Requested URL not found</p>
      </div>
    );
  }

  function Temp() {
    return (
      <div className="app app_body not_found">
        click on chat to view the chat
      </div>
    );
  }

  return (
    <div className="app">
      {!user ? (
        <h2>
          <Login />
        </h2>
      ) : (
        <div className="app_body">
          <BrowserRouter>
            <Sidebar />
            <Routes>
              <Route path="/" element={<Temp />} />
              <Route path="/rooms/:roomID" element={<Chat />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </div>
      )}
    </div>
  );
}
export default App;
