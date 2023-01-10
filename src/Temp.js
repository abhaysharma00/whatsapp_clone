import React from "react";
import "./Temp.css";
import Sidebar from "./Sidebar";
import Chat from "./Chat";

function Temp() {
  return (
    <div className="app">
      <div className="app_body">
        <Sidebar />
        <Chat />
      </div>
    </div>
  );
}

export default Temp;
