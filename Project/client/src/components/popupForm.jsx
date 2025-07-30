import { useRef, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate, useLocation } from 'react-router-dom';

export default function PopupForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const contactdetails = location.state || {};
  const [otpFailed, setOtpFailed] = useState(false);

  const inputRefs = Array.from({ length: 6 }, () => useRef(null));

  const handleInput = (e, index) => {
    const val = e.target.value;
    if (!/^\d$/.test(val)) {
      e.target.value = '';
      return;
    }
    if (index < inputRefs.length - 1) {
      inputRefs[index + 1].current.focus();
    }
    const otp = inputRefs.map(ref => ref.current.value).join('');
    if (otp.length === 6) {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    const otp = inputRefs.map(ref => ref.current.value).join('');
    try {
      const response = await axios.get(`http://192.168.1.31:3000/checkOtp/${contactdetails._id}`, {
        params: { userotp: otp, email: contactdetails.email },
      });
      if (!response.error) {
        toast.success('Otp Validation Successful');
        console.log(contactdetails)
        if(contactdetails.coupon.type==='gift')navigate(`/provideGiftDetails`)
        else navigate(`/chooseRedeemMethod`);
      }
    } catch (err) {
      toast.error('OTP verification failed');
      setOtpFailed(true);
    }
  };

  const handleResend = async () => {
    try {
      await axios.post(`http://192.168.1.31:3000/resendOtp`, {
        id: contactdetails._id,
        email: contactdetails.email,
      });
      toast.success('A new OTP has been sent to your email');
      setOtpFailed(false);
    } catch (err) {
      toast.error('Failed to resend OTP');
    }
  };
  const handleCancel = ()=>{
    toast.error('Authentication cancelled')
    navigate(-1)
  }
  const outerdivClasses = `bg-[#101010] h-[60vh] max-h-[100vh] w-[375px] overflow-y-auto 2xl:w-[1200px] 2xl:h-[700px] shadow-xl rounded-2xl flex flex-col gap-7 2xl:gap-10 justify-start items-center transform transition-all duration-500 ease-in-out mb-5`;

  return (
    <div className={outerdivClasses}>
      <div className="mt-5 h-16 flex justify-center items-center text-2xl 2xl:text-4xl font-bold">One Time Password</div>
      <div className="h-8 flex justify-center items-center text-center text-sm font-base text-gray-400">
        Enter the one time password sent to your registered email
      </div>

      <div className="mt-5 flex gap-2 2xl:gap-10 justify-center items-center">
        {inputRefs.map((ref, index) => (
          <input
            key={index}
            type="text"
            maxLength="1"
            ref={ref}
            onChange={e => handleInput(e, index)}
            className="bg-[#262626] w-[50px] h-[50px] 2xl:w-30 2xl:h-30 2xl:text-[50px] rounded-2xl ring-1 ring-white focus:ring-5 focus:ring-[#75C9FF] text-center font-bold text-white"
          />
        ))}
      </div>

      {otpFailed && (
        <div className="mt-2 text-sm font-medium text-red-600 cursor-pointer">
          OTP verification failed! You have added wrong OTP
        </div>
      )}
      {otpFailed && (
        <div className="mt-2 text-sm font-medium text-[#75C9FF] underline cursor-pointer" onClick={handleResend}>
          OTP verification failed! Resend OTP
        </div>
      )}

      <div className="text-lg font-semibold flex justify-center items-center gap-5">
        Didn't get the OTP?
        <button className="bg-[#16a6ff64] h-12 w-36 2xl:h-16 2xl:w-36 rounded-full font-medium">Try Again?</button>
      </div>

      <div className="flex justify-center items-center gap-5">
        <button
          onClick={handleSubmit}
          className="h-12 w-36 2xl:h-16 2xl:w-96 2xl:text-3xl font-bold rounded-full bg-[#75C9FF] hover:cursor-pointer"
        >
          Confirm
        </button>
        <button
          onClick={handleCancel}
          className="h-12 w-36 2xl:h-16 2xl:w-96 2xl:text-3xl font-bold rounded-full bg-red-400 hover:cursor-pointer"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}