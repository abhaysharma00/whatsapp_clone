import React, { useState, useEffect } from "react";
import "./Sidebar.css";
import "./Sidebar_chat.css";
import db from "./firebase";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import {
  doc,
  collection,
  query,
  where,
  onSnapshot,
  getDocs,
  getDoc,
  addDoc,
  QuerySnapshot,
  documentId,
  orderBy,
  serverTimestamp,
  deleteDoc,
} from "firebase/firestore";

// icons used
import { Avatar } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import IconButton from "@mui/material/IconButton";

//error of <Link> was resolved by putting it inside <BrowserRoute>

function Sidebar_chat({ roomID, name, addnewchat }) {
  const [messages, setMessages] = useState([]);
  const [color, setcolor] = useState("black");

  // fetching last message
  useEffect(() => {
    if (roomID) {
      const q = query(
        collection(db, "rooms", `${roomID}`, `messages`),
        orderBy("timestamp", "desc")
      );
      const unsub = onSnapshot(q, (snapshot) => {
        const temp = [];
        snapshot.docs.map((doc) => {
          temp.push(doc.data());
        });
        setMessages(temp);
      });
    }
  }, [roomID]);

  // creating the chat
  const createchat = async () => {
    const roomname = prompt("enter the name");
    if (roomname) {
      try {
        const docRef = await addDoc(collection(db, "rooms"), {
          name: roomname,
        });
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }
  };

  // deleting the chat
  const deletechat = async (id) => {
    console.log("delete>", id);
    const response = await deleteDoc(doc(db, `rooms/${roomID}`));
  };

  // changing color
  const changecolor = (str) => {
    setcolor(str);
  };

  return !addnewchat ? (
    <Link to={`rooms/${roomID}`}>
      <div className="sidebar_chat">
        <div className="horizontal">
          <small>
            <Avatar
              src={`https://avatars.dicebear.com/api/adventurer/${Math.floor(
                Math.random() * 5000
              )}.svg`}
            />
          </small>
        </div>
        <div className="vertical">
          <small>
            <h3>{name}</h3>
            <p>{messages[0]?.message}</p>
          </small>
        </div>
        <div className="deleteicon">
          <IconButton>
            <DeleteOutlineIcon
              sx={{ color: `${color}` }}
              onMouseOver={() => changecolor("red")}
              onMouseOut={() => changecolor("black")}
              onClick={() => deletechat(roomID)}
            />
          </IconButton>
        </div>
      </div>
    </Link>
  ) : (
    <div className="sidebar_chat" id="addnew" onClick={createchat}>
      <h3>Add new chat</h3>
    </div>
  );
}

export default Sidebar_chat;

// commented out
// onClick={() => deletechat(roomID)}
