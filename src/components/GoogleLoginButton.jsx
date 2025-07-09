import { auth, provider } from "../firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

export default function GoogleLoginButton({ onLogin }) {
  const handleLogin = async () => {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const accessToken = credential.accessToken;// It is different from the user token, this is the access token that can be used to access Google APIs

    onLogin({ user, accessToken }); // Pass accessToken to parent function which we will make use of later
  };

  return (
    <button onClick={handleLogin} className="bg-blue-600 text-white px-4 py-2 rounded">
      Sign in with Google
    </button>
  );

}