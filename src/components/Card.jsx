import React from "react";
import { motion } from "framer-motion";
import { FaRegFileAlt } from "react-icons/fa";
import { IoMdCloudDownload } from "react-icons/io";
import { RiCloseLine } from "react-icons/ri";

const Card = ({ data, reference }) => {
  return (
    <motion.div
      drag
      dragConstraints={reference}
      whileDrag={{ scale: 1.2 }}
      id="card_div"
      className="relative flex-shrink-0 w-52 h-60 rounded-[30px] bg-zinc-900/50 text-white px-6 py-8 overflow-hidden shadow-2xl hover:shadow-indigo-500/50"
    >
      <FaRegFileAlt />
      <p className="text-xs mt-5 font-semibold leading-tight">{data.desc}</p>
      <footer className="absolute bottom-0 left-0 w-full h-15 ">
        <div className="flex items-center justify-between px-6 py-4">
          <p className="text-xs font-semibold leading-tight">{data.filesize}</p>
          <span>{data.close ? <RiCloseLine /> : <IoMdCloudDownload />}</span>
        </div>
        {data.tag.isOpen && (
          <div
            className={`progress w-full px-6 py-3 ${
              data.tag.tagColor === "blue" ? "bg-blue-600" : "bg-green-600"
            } flex justify-center items-center`}
          >
            <p className="text-xs font-semibold leading-tight">
              {data.tag.tagTitle}
            </p>
          </div>
        )}
      </footer>
    </motion.div>
  );
};

export default Card;
