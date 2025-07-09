import { useRef,  useEffect, useState } from "react";
import Card from "./Card";
import LogOutButton from "../components/LogOutButton";
import AddTaskButton from "./AddTaskButton";
import {collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db,auth } from "../firebase"; // Adjust the import path as necessary

const Foreground = ({user}) => {
  const ref = useRef(null);
  const data = [
    {
      desc: "My name is priangshu,i created this app this is called priDocs",
      filesize: ".9mb",
      close: false,
      tag: { isOpen: false, tagTitle: "Know", tagColur: "green" },
    },
    {
      desc: "Soumyadeep's card, no one scammer boy but good heart loves to listen to music and involving in social activites (DALAL) ",
      filesize: ".12mb",
      close: true,
      tag: { isOpen: true, tagTitle: "Download", tagColur: "green" },
    },
    {
      desc: "Subhadeep's card, aka murgi vive hai , but examiner er sathe match hoi na tai back chole ase, fakibazz, memebuddy",
      filesize: ".30mb",
      close: true,
      tag: { isOpen: true, tagTitle: "Upload", tagColor: "blue" },
    },
    {
      desc: "Naren's card, lives in amazon forest no signel zone, alsi pro max always wrote assignments through friends, wants to be photographer",
      filesize: ".30mb",
      close: true,
      tag: { isOpen: false, tagTitle: "Upload", tagColor: "green" },
    },
    {
      desc: "Cier's card, special talents are 1- not interested in talking when in a call, love drugs, always come late but first in results and always fuck with subhosir",
      filesize: ".30mb",
      close: false,
      tag: { isOpen: true, tagTitle: "Upload", tagColor: "blue" },
    },
    {
      desc: "Debjoyte's card, multitalented- hacker,devloper and buisnessmen introvert our vibes match on tech faild everytime in no-nut-november",
      filesize: ".30mb",
      close: false,
      tag: { isOpen: true, tagTitle: "Upload", tagColor: "green" },
    },
  ];
  const authuser = auth.currentUser;// getting the auth user from the login user
  const constraintsRef = useRef(null);
  const [cards, setCards] = useState([]);

  
  useEffect(() => {
    if (!authuser) return;
    const filesRef = collection(db, "users", authuser.uid, "files");
    const q = query(filesRef, orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => { // Firebase default function to detect changes in realtime like socket.io
      const docs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCards(docs);  //data save dynmically in the cards state like  you use as data array 
    });

    return () => unsubscribe(); // ✅ Cleanup
  }, [authuser]); // only run once when authuser is available


  return (
    <div ref={constraintsRef} className="fixed top-0 left-0 z-[3] w-full h-full flex gap-5 flex-wrap p-5">
      <AddTaskButton />  {/* Button to add new card,  on click it will crate a empty card  */}

      {cards.map((item) => (
        <Card
          key={item.id}
          data={item}
          user={user}
          reference={constraintsRef}
        />
      ))}

      <LogOutButton reference={constraintsRef} user={user} />
    </div>
  );
};

export default Foreground;
