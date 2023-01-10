import React, { useEffect, useState } from "react";
import "./Sidebar.css";
import Sidebar_chat from "./Sidebar_chat.js";
import db from "./firebase";
import {
  doc,
  collection,
  query,
  where,
  onSnapshot,
  getDocs,
  QuerySnapshot,
} from "firebase/firestore";

// icons used
import SearchIcon from "@mui/icons-material/Search";
import DonutLargeIcon from "@mui/icons-material/DonutLarge";
import MessageIcon from "@mui/icons-material/Message";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";

function Sidebar() {
  const [rooms, setRooms] = useState([]);

  // fetching the chats
  useEffect(() => {
    const q = query(collection(db, "rooms"));
    const unsub = onSnapshot(q, (snapshot) => {
      setRooms(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
    return () => {
      unsub();
    };
  }, []);

  return (
    <div className="sidebar">
      <div className="sidebar_header">
        <div className="sidebar_headerLeft">
          <Avatar
            alt="Abhay"
            src="https://avatars.dicebear.com/api/adventurer/dsnbsd.svg"
          />
        </div>
        <div className="sidebar_headerRight">
          <IconButton>
            <DonutLargeIcon />
          </IconButton>
          <IconButton>
            <MessageIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className="sidebar_search">
        <IconButton>
          <SearchIcon />
        </IconButton>
        <div className="sidebar_searchContainer">
          <input type="text" placeholder="start a new chat" />
        </div>
      </div>
      <div className="sidebar_chats">
        <Sidebar_chat addnewchat />
        {rooms.map((room) => (
          <Sidebar_chat key={room.id} roomID={room.id} name={room.data.name} />
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
