import { useState } from "react"
import InputField from "../components/InputField"
import axios from "axios"
import { useNavigate , useLocation } from 'react-router-dom'
import { toast } from "react-toastify"
export default function InitialInfo() {
        const navigate = useNavigate()
    const [Initform, setInit] = useState({ email: '', code: '' });
    const handleInputChange = (e)=>{
       const field = e.target.name
        const value = e.target.value
        setInit((prev) => {
            return { ...prev, [field]: value }
        })
    }
 const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post(' http://192.168.1.31:3000/addContact', Initform);

    if (response.data?.error) {
      toast.error(response.data.error); // Show backend error if present
      return;
    }

    const couponType = response.data?.coupon?.type;
    if (!couponType) {
      toast.error('Invalid coupon response from server.');
      return;
    }

    toast.success('An OTP has been sent to your registered email');

    const route = `/otpValidation/${response.data._id}`;

    navigate(route, { state: response.data });

  } catch (error) {
    toast.error(`Server error: ${error.message}`);
  }
};
    return (
        <div className="h-[100vh] min-w-screen flex flex-col justify-start items-center bg-[#101010]">
            <div className="bg-gradient-to-r from-[#75C9FF] to-[#009BFF] h-64 w-full 2xl:h-64 2xl:w-full">
                
            </div>
            <div className="h-24 lg:h-54 flex flex-col justify-center items-center 2xl:h-[100px] ">
                <div className="text-[#009BFF] text-2xl lg:text-[50px] font-bold">Win with Rockford😎</div>
                <div className="font-medium lg:text-2xl ">Add your Info to start claiming offers🎁</div>
            </div>
            {/*bg-[#171717] m-5 flex flex-col justify-center items-center gap-4 md:gap-8 h-96 md:h-[450px] lg:h-[600px] 2xl:bg-red-100 shadow-3xl 2xl:m-0 2xl:w-[1200px] 2xl:mb-5*/ }
            <form className="bg-[#171717] m-5 flex flex-col justify-center items-center w-[375px] md:w-[725px] lg:w-[950px] xl:w-[1200px] gap-4 md:gap-8 shadow-3xl h-96 md:h-[450px] lg:h-[600px] 2xl:w-[1350px] 2xl:h-[500px] 2xl:gap-10 xl:gap-10 " onSubmit={handleSubmit}>
                <InputField label="Email" placeholder="Enter your registered email" name="email" value={Initform.email} handleInputChange={handleInputChange}/>
                <InputField label="Coupon Code" placeholder="Enter the coupon code you have" name="code" value={Initform.code} handleInputChange={handleInputChange}/>
                <button type="submit" className="bg-[#75C9FF] h-16 w-36 lg:h-24 lg:w-74 lg:text-3xl  rounded-full font-medium hover:cursor-pointer">Submit Details</button>
            </form>
        </div>
    )
}