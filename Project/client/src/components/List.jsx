import { AnimatePresence,motion } from "framer-motion";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Card from "./card";
import IndividualCard from "./IndividualCard";
import { useRef } from "react";
import {useNavigate , useLocation} from "react-router-dom";
export default function List() {
  const navigate=useNavigate()
  
    const [contacts, setContacts] = useState([]);
    const [selected, setSelected] = useState(null); // 👈 new
    const [user,setUser] = useState({})
const [cardOffset, setCardOffset] = useState(0);  
useEffect(() => {
      const findList = async () => {
            try {
                const response = await axios.get('http://192.168.1.31:3000/WinnersList');
                
                setContacts(response.data);
            } catch (err) {
                toast.error('Error fetching details!!!');
            }
        };
        findList();
    }, []);
useEffect(() => {
  if (selected) {
    const scrollY = window.scrollY;
    setCardOffset(scrollY + window.innerHeight * 0.2); // Push slightly down from current scroll
  }
}, [selected]);
const handleClick=async(contact)=>{
  setSelected(contact)
  navigate('/showCard',{state:contact})
}
    return (
        <>
            <motion.div
  initial={{ opacity: 0, y: 100 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
  className={`shadow-2xl w-[90vw] min-h-[40vh] mb-5 rounded-2xl 2xl:rounded-4xl flex justify-start items-center flex-col py-5 2xl:py-10 gap-5 2xl:gap-5 bg-[#ffffff2c] ${
    selected ? 'blur-md scale-[0.98]' : ''
  }`}
>
  {contacts.map((contact, i) => (
    <Card
      key={contact._id}
      index={i}
      contact={contact}
      onClick={()=>{handleClick(contact)}}
    />
  ))}
</motion.div>


  <AnimatePresence>
  {selected && (
    <>
      <div style={{ height: '30vh' }} /> {/* 🧊 Spacer to push card downward */}
      <IndividualCard contact={selected} onClose={() => setSelected(null)} />
    </>
  )}
</AnimatePresence>

        </>
    );
}