import React, { useState, useEffect } from "react";
import "./Chat.css";
import { Routes, Route, useParams } from "react-router-dom";
import db from "./firebase";
import { useStateValue } from "./StateProvider";
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
} from "firebase/firestore";

// importing icons
import { Avatar } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import MoreVert from "@mui/icons-material/MoreVert";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import MicIcon from "@mui/icons-material/Mic";

function Chat() {
  const [{ user }, dispatch] = useStateValue();

  const [input, setInput] = useState("");
  const [roomname, setRoomname] = useState("");
  const [messages, setMessages] = useState([]);
  const { roomID } = useParams();

  // getting the room name
  useEffect(() => {
    if (roomID) {
      const docRef = doc(db, "rooms", roomID);
      onSnapshot(docRef, (doc) => {
        setRoomname(doc.data().name);
      });
    }
  }, [roomID]);

  // getting the messages
  useEffect(() => {
    if (roomID) {
      const q = query(
        collection(db, "rooms", `${roomID}`, `messages`),
        orderBy("timestamp")
      );
      const unsub = onSnapshot(q, (snapshot) => {
        const temp = [];
        snapshot.docs.map((doc) => {
          temp.push(doc.data());
        });
        setMessages(temp);
      });
    }
    // return unsub();
  }, [roomID]);

  // sending message
  const sendmessage = async (e) => {
    e.preventDefault();

    const path = `rooms/${roomID}/messages`;
    const docRef = collection(db, path);
    await addDoc(docRef, {
      name: user.displayName,
      message: input,
      timestamp: serverTimestamp(),
    });
    console.log("message sent");
    setInput("");
  };

  return (
    <div className="chat">
      <div className="chat_header">
        <Avatar
          src={`https://avatars.dicebear.com/api/adventurer/${Math.floor(
            Math.random() * 5000
          )}.svg`}
        />
        <div className="chat_headerInfo">
          <h2>{roomname}</h2>
          <p>
            <small>
              Last seen on <nbsp />
              <b>
                {new Date(
                  messages[messages.length - 1]?.timestamp?.toDate()
                ).toUTCString()}
              </b>
            </small>
          </p>
        </div>
        <div className="chat_headerRight">
          <IconButton>
            <SearchIcon />
          </IconButton>
          <IconButton>
            <AttachFileIcon />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>
      <div className="chat_body">
        {messages.map((message) => (
          <p
            className={`chat_message ${
              message.name == user.displayName && "chat_receiver"
            }`}
          >
            <span className="chat_name">{message.name}</span>
            {message.message}
            <span className="chat_time">
              {new Date(message.timestamp?.toDate()).toUTCString()}
            </span>
          </p>
        ))}
      </div>

      <div className="chat_footer">
        <IconButton>
          <InsertEmoticonIcon />
        </IconButton>
        <form>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="   enter you reply"
          />
          <button onClick={sendmessage} type="submit">
            Send message
          </button>
        </form>
        <IconButton>
          <MicIcon />
        </IconButton>
      </div>
    </div>
  );
}

export default Chat;

// useEffect(() => {
//     db.collection("rooms").onSnapshot((snapshot) =>(
//       settemp(snapshot.docs.map(doc=>doc.data()))
//     ))
// }, []);

// useEffect(() => {
//   db.collection("rooms").onSnapshot(snapshot=>(
//     // settemp(snapshot.docs.map(doc=>doc.data()))
//     settemp(snapshot.docs)
//   ));
// }, []);

// everything that i commented out

{
  /* <div className="chat">
      <div className="chat_header">
        <div className="chat_header_left  horizontal">
          <img src="" alt="img" />
          <div className="vertical">
            <h2>Roomname</h2>
            <p>last seen</p>
          </div>
        </div>
        <div className="chat_header_right">icons</div>
      </div>
      <div className="chat_body">
        <h1>hello</h1> */
}
{
  /* 
  {messages.map((message) => (
          <p
            className={`chat_message ${
              message.name == user.displayName && "chat_receiver"
            }`}
          >
            <span className="chat_name">
              {message.name}
              </span>
            {message.message}
            <span className="chat_time">
              {new Date(message.timestamp?.toDate()).toUTCString()}
            </span>
          </p>
        ))} 
  */
}
//   </div>
//   <div className="chat_footer">
//     <p>emoji</p>
//     <form action="">
//       <input
//         type="text"
//         value={input}
//         onChange={(e) => setInput(e.target.value)}
//         placeholder="     Type your message here"
//       />
//       <button onClick={sendmessage} type="submit">
//         send
//       </button>
//     </form>
//   </div>
// </div>
