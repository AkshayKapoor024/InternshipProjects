import { useNavigate , useLocation } from "react-router-dom"
import IndividualCard from "../components/IndividualCard"
import { useScroll } from "framer-motion"
import { useState } from "react"
import { useEffect } from "react"
import { toast } from "react-toastify"
export default function ShowCard(){
    const [contact,setContacts] = useState({})
    const navigate = useNavigate()
    const location = useLocation()
    const onClose = ()=>{
        toast.success(`Reverted back to User Dashboard`)
        navigate(-1)
    }
    useEffect(()=>{
    const newContact =location.state || {}
        setContacts(newContact)
})

return(
    <div className="bg-gradient-to-tl from-[#0B1E3C] via-[#123A60] via-[#245A8B] via-[#3A78B3] to-[#5A9BDA] min-h-screen min-w-screen flex justify-center items-center">
        <div className=" relative bottom-[35vh] h-[10vh] flex justify-center items-center w-full 2xl:text-4xl font-bold text-xl">☎️Showing Details of {contact.name}</div>
        <IndividualCard contact={contact} onClose={onClose}/>
    </div>
)
}