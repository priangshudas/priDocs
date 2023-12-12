import React, { useRef } from "react";
import Card from "./Card";

const Foreground = () => {
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
  return (
    <div
      ref={ref}
      className="fixed top-0 left-0 z-[3] w-full h-full flex gap-5 flex-wrap p-5"
    >
      {data.map((item, index) => (
        <Card data={item} reference={ref} />
      ))}
    </div>
  );
};

export default Foreground;
