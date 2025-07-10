import { useEffect, useState } from "react";
import Background from "./components/Background";
import Foreground from "./components/Foreground";
import { LoginCard } from "./components/LoginCard";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";

function App() {
  const [user, setUser] = useState(null);

  /// The function to handle login and save the access token to localStorage to use it later in the app to upload files nothing to do with firebase auth
  const handleLogin = ({ user, accessToken }) => {
    console.log("Logged in:", user.email);
    localStorage.setItem("googleAccessToken", accessToken);
  };


  useEffect(() => {
    // this effect listens for changes in the authentication state the default firebase auth function
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return () => unsub(); // Cleanup listener on unmount
  }, []);


  return (
    <div className="realative w-full h-screen bg-zinc-800">
      <Background user={user} /> {/*  //passing user to Background component to show the background image based on the user */}
      <Foreground user={user} /> {/* //passing user to Foreground component to show the foreground content based on the user firest Name or Last Name*/}
      {!user && <LoginCard onLogin={handleLogin} />} {/* // If user is not logged in, show the login card and blurred background*/}
    </div>
  );
}

export default App;
