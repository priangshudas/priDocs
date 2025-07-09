import { motion } from "framer-motion";
import { FiPlus } from "react-icons/fi";
import { collection, addDoc, serverTimestamp } from "firebase/firestore"; 
import { db ,auth} from '../firebase'; 


export default function AddTaskButton() {
const user = auth.currentUser;
    if (!user) return console.log("Please log in");
    //Document creation function by firebaseS
    const buttonClickedHandler = async () => {
    try {
            const data = {
            desc: "",
            filesize: "",
            close: false,
            tag: { isOpen: false, tagTitle: "init", tagColor: "blue" },
            createdAt: serverTimestamp() ,
            file: {},
            downloadble: false       
            };
            const filesCollectionRef = collection(db, "users", user.uid, "files");
            const docRef = await addDoc(filesCollectionRef, data);
    }catch (e) {
            console.error("Error adding document: ", e);
    }
    };

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="fixed top-6 right-6 z-50 px-4 py-3 bg-white/10 backdrop-blur-md text-white shadow-xl border border-white/20 rounded-full flex items-center gap-2 hover:bg-white/20 hover:shadow-2xl transition duration-300"
      onClick={buttonClickedHandler}
    >
      <FiPlus className="text-lg" />
    </motion.button>
  );
}
