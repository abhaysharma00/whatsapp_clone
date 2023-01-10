import React from "react";
import "./Login.css";
import { auth, provider } from "./firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useStateValue } from "./StateProvider";
import { actionTypes } from "./reducer";

function Login() {
  const [{}, dispatch] = useStateValue();
  const signin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        dispatch({
          type: actionTypes.SET_USER,
          user: result.user,
        });

        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        alert(error);
        // console.log(error);
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  return (
    <div className="login">
      <div className="login_container">
        <img
          src="https://previews.123rf.com/images/jemastock/jemastock1811/jemastock181103229/111468932-friends-young-people-faces-group-cartoon-vector-illustration-graphic-design.jpg"
          alt="logo"
        />
        <div className="login_text">
          <h3>LOGIN FIRST</h3>
        </div>
        <button onClick={signin}>
          <b>Sign In With Google</b>
        </button>
      </div>
    </div>
  );
}

export default Login;
