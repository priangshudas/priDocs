import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { motion } from "framer-motion";
import { MdMarkEmailRead } from "react-icons/md";
import { useEffect, useRef } from "react";

const handleLogout = async () => {
    await signOut(auth);
    window.location.reload(); // Reload the page to reflect the logout state
};

const LogOutButton = ({ reference, user }) => {
  const imgRef = useRef(null);

  useEffect(() => {
    const imgElement = imgRef.current;
    if (imgElement) {
      const handleDragStart = (e) => e.preventDefault();
      imgElement.addEventListener("dragstart", handleDragStart);
      return () => {
        imgElement.removeEventListener("dragstart", handleDragStart);
      };
    }
  }, []);

  return (
    <motion.div
      drag
      dragConstraints={reference}
      whileDrag={{ scale: 1.2 }}
      id="card_div"
      className="relative flex-shrink-0 w-52 h-60 rounded-[30px] bg-zinc-900/50 text-white overflow-hidden shadow-2xl hover:shadow-indigo-500/50"
    >
      {user?.photoURL && (
        <img
          ref={imgRef}
          src={user.photoURL}
          alt="Profile"
          className="w-20 h-20 rounded-full mx-auto mt-4 object-cover"
        />
      )}
      <h6 className="text-xs mt-5 font-semibold leading-tight text-center">
        {user?.displayName || "User Name"}
      </h6>
      <footer className="absolute bottom-0 left-0 w-full h-15 ">
        <div className="flex items-center justify-between px-6 py-4 text-xs font-semibold leading-tight">
          <p className="text-xs font-semibold leading-tight">
          <span>
            <MdMarkEmailRead />
          </span>
          </p>
            {user?.email &&
            <p>{user.email}</p>

            }
        </div>

        <div
          className="progress w-full px-6 py-3 bg-red-600 flex justify-center items-center cursor-pointer"
          onClick={handleLogout}
        >
          <p className="text-xs font-semibold leading-tight">LogOut</p>
        </div>
      </footer>
    </motion.div>
  );
};

export default LogOutButton;
// This component is used to log out the user from the application.