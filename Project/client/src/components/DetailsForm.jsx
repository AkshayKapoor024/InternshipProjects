import InputField from './InputField';
import { useState } from 'react';
import { useNavigate , useLocation } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
export default function DetailsForm() {
  const [FormData, setForm] = useState({
    name: '',
    contact: '',
    email: '',
    state: '',
    paymentMethod: '',
    upiId: '',
    bankName: '',
    accountNumber: '',
    ifscCode: ''
  });
  const [validContact,setContact] = useState(true)
  const [validEmail,setValidEmail]= useState(true)
  const navigate = useNavigate()
  const handleInputChange = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
      /*if(!FormData.endswith('@gmail.com')){
        return toast.error('Email field must end with @gmail.com')
      }*/
      if(FormData.contact.length>11){
        setContact(false)
       return toast.error('Contact length must be maximum 10 digits')
      }else setContact(true)

      if(!FormData.email.includes('@')){
        setValidEmail(false)
       return toast.error('Email must have an @')
      }else setValidEmail(true)


    try{console.log(FormData)
      let response = await axios.post('http://192.168.1.31:3000/furtherDetails',FormData)
      navigate('/submittedDetails')
      toast.success('Further user details added successfully!')
      console.log(FormData); // For now: log the full payload
    } catch(err){
      toast.error(`Error : ${err.message}`)
    }   
  };

  return (
    <div className="bg-[#171717] h-auto w-[375px] 2xl:w-[1300px] rounded-3xl flex flex-col gap-5 2xl:gap-10 justify-center items-center shadow-xl mb-10 p-5">
      <InputField label="Full Name" placeholder="Ex - Matt Carodona" name="name" value={FormData.name} handleInputChange={handleInputChange} />
      <InputField label="Contact Number" type="number" placeholder="Enter your contact details" name="contact" value={FormData.contact} handleInputChange={handleInputChange} />
      {validContact==false?<div className='text-red-600'>Please enter a valid contact number</div>:''}
      <InputField label="Email" type="email" placeholder="Enter your registered email" name="email" value={FormData.email} handleInputChange={handleInputChange} />
       {validEmail==false?<div className='text-red-600'>Please enter a valid Email id</div>:''}
      <InputField label="State" placeholder="Delhi, Mumbai, Kolkata etc." name="state" value={FormData.state} handleInputChange={handleInputChange} />

      {/* Payment Method Selection */}
      <div className="2xl:w-[1200px] flex flex-col gap-5">
        <label className="text-xl md:text-2xl lg:text-3xl font-semibold">Choose Your Method</label>
        <div className="flex flex-col gap-5">
          {/* UPI */}
          <label
            className={`flex justify-between items-center p-4 rounded-xl cursor-pointer ${
              FormData.paymentMethod === 'UPI' ? 'ring-3 ring-[#75C9FF]' : 'ring-2 ring-white'
            } bg-[#262626] text-white text-xl 2xl:text-2xl font-semibold`}
          >
            <input
              type="radio"
              name="paymentMethod"
              value="UPI"
              checked={FormData.paymentMethod === 'UPI'}
              onChange={handleInputChange}
              className="mr-3 hidden"
            />
            <span>Google Pay (UPI)</span>
            <img src="https://img.icons8.com/fluency/48/google-pay.png" alt="google-pay" className="w-[40px] h-[40px]" />
          </label>

          {/* Amazon Pay */}
          <label
            className={`flex justify-between items-center p-4 rounded-xl cursor-pointer ${
              FormData.paymentMethod === 'Amazon Pay' ? 'ring-3 ring-[#75C9FF]' : 'ring-2 ring-white'
            } bg-[#262626] text-white text-xl 2xl:text-2xl font-semibold`}
          >
            <input
              type="radio"
              name="paymentMethod"
              value="Amazon Pay"
              checked={FormData.paymentMethod === 'Amazon Pay'}
              onChange={handleInputChange}
              className="mr-3 hidden"
            />
            <span>Amazon Pay</span>
            <img src="https://img.icons8.com/color/48/amazon_shopping_app.png" alt="amazon-pay" className="w-[40px] h-[40px]" />
          </label>

          {/* NEFT/RTGS */}
          <label
            className={`flex justify-between items-center p-4 rounded-xl cursor-pointer ${
              FormData.paymentMethod === 'NEFT/RTGS via Bank Account' ? 'ring-3 ring-[#75C9FF]' : 'ring-2 ring-white'
            } bg-[#262626] text-white text-xl 2xl:text-2xl font-semibold`}
          >
            <input
              type="radio"
              name="paymentMethod"
              value="NEFT/RTGS via Bank Account"
              checked={FormData.paymentMethod === 'NEFT/RTGS via Bank Account'}
              onChange={handleInputChange}
              className="mr-3 hidden"
            />
            <span>NEFT/RTGS via Bank Account</span>
            <img src="https://img.icons8.com/arcade/64/bank.png" alt="bank" className="w-[40px] h-[40px]" />
          </label>
        </div>

        {/* Dynamic Fields */}
        {FormData.paymentMethod === 'UPI' && (
          <InputField label="UPI ID" placeholder="yourupi@bank" name="upiId" value={FormData.upiId} handleInputChange={handleInputChange} />
        )}
        {FormData.paymentMethod === 'NEFT/RTGS via Bank Account' && (
          <>
            <InputField label="Bank Name" placeholder="Ex - HDFC Bank" name="bankName" value={FormData.bankName} handleInputChange={handleInputChange} />
            <InputField label="Account Number" placeholder="Enter your account number" name="accountNumber" value={FormData.accountNumber} handleInputChange={handleInputChange} />
            <InputField label="IFSC Code" placeholder="Ex - HDFC0001234" name="ifscCode" value={FormData.ifscCode} handleInputChange={handleInputChange} />
          </>
        )}
      </div>

      {/* Submit Button */}
      <div
        className="bg-[#75C9FF] h-16 w-30 2xl:w-54 flex justify-center items-center rounded-full text-2xl font-bold shadow-xl hover:cursor-pointer mb-10"
        onClick={handleSubmit}
      >
        Submit
      </div>
    </div>
  );
}