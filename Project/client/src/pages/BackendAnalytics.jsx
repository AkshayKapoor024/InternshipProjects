import List from "../components/List"
import { motion, useScroll } from "framer-motion";
import { useEffect ,useState} from "react";
import { Typewriter } from "react-simple-typewriter";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CountUp from "../components/Counter";
export default function BackendAnalytics() {
const [user,setUser] = useState({})
const [info,setInfo] = useState({})
const navigate = useNavigate()
    const handleLogout = async()=>{
        try{
            let response = await axios.get('http://192.168.1.31:3000/logout')
            toast.success(`Logout Successfull!`)
            navigate('/login')
        }catch(error){
            toast.error(`Error ${error.response.data}`)
        }
    }
    useEffect(()=>{
        const connectTouser = async()=>{
            try{
                const UserResponse = await axios.get('http://192.168.1.31:3000/isAuthenticated',{withCredentials: true})
                const infoResponse = await axios.get('http://192.168.1.31:3000/findInfo')
                console.log(UserResponse)
                if(UserResponse) setUser(UserResponse.data)
                    if(infoResponse) setInfo(infoResponse.data)
            }catch(error){
                console.log(error)
                toast.error(`Error ${error.response}`)
            }
        }
        connectTouser()
    },[])
    return (<>
        <motion.div
            className="bg-gradient-to-tl from-[#0B1E3C] via-[#123A60] via-[#245A8B] via-[#3A78B3] to-[#5A9BDA] h-auto flex-col w-[100vw] font-bold gap-2 2xl:gap-5 flex justify-start items-center">
                <div className="bg-[#0000006c] w-full h-[10vh] flex items-center px-10 text-xl 2xl:text-4xl font-semibold justify-between">
                    <div>Good Evening , {user.username} 👋</div>
                    <div className=" 2xl:h-[8vh] 2xl:w-[4.5vw] rounded-full flex justify-center items-center bg-green-400 hover:cursor-pointer bg-[#ff7b00ab]"><img width="60" height="60" src="https://img.icons8.com/color/48/standing-man.png" alt="standing-man" onClick={handleLogout}/></div>
                </div>
                <div className=" xl:h-[30vh] flex mb-10 xl:flex-row flex-col">
                    {<CountUp target={info.contactLength} title={'Users'} heading={'Total Users😎'} bgcolor="bg-green-700"/>}
                    {<CountUp target={info.pending} title={'Users'} heading={'Dropped Users😭'} bgcolor="bg-cyan-700" ringcolor="ring-cyan-500"/>}
                    {<CountUp target={info.couponLength} title={'Coupons'} heading={'Total Available Coupons 📩'} bgcolor="bg-orange-700" ringcolor="ring-orange-600"/>}
                    {<CountUp target={info.totalCoupons} title={'Coupons'} heading={'Total Coupons Redeemed💵'} bgcolor="bg-red-700" ringcolor="ring-red-600"/>}
                </div>
            <div className="text-3xl 2xl:text-[60px]">
                 <Typewriter
          words={["List of winners 🤩🥳"]}
          typeSpeed={80}
          delaySpeed={1000}
          cursor
          />
</div>
            <List />
        </motion.div>
          </>
    )
}