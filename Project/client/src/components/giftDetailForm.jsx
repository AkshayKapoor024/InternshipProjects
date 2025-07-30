import InputField from './InputField';
import { useState } from 'react';
import { useNavigate, useLocation, Form } from 'react-router-dom';
import { toast } from 'react-toastify'
export default function DocumentUploadForm() {
  const location = useLocation()
  const contactdetails = location.state || {}
  const navigate = useNavigate()
  const [FormData, setForm] = useState({
    postalAddress: '',
    aadhaarFile: null,
    panFile: null
  });
  const allowedFormats = ['.jpg', '.png', 'jpeg', 'webp', '.pdf']
  const handleInputChange = (e) => {
    const { name, value, files } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: e.target.type === 'file' ? files[0] : value
    }));
  };
  let [fileSizes, setSizes] = useState({ aadhaarFileSize: 0, panFileSize: 0 })
  const handleSubmit = () => {
    console.log(FormData);
    let aadhaarFileName = FormData.aadhaarFile.name
    let panFileName = FormData.panFile.name
    let aadhaarFileSize = FormData.aadhaarFile.size
    let panFileSize = FormData.panFile.size
    setSizes({ aadhaarFileSize, panFileSize })
    let allowed = allowedFormats.includes(aadhaarFileName.slice(aadhaarFileName.length - 4)) && allowedFormats.includes(panFileName.slice(panFileName.length - 4))
    console.log(allowed)
    if (allowed == false) {
      toast.error('Provide files in allowed formats only ! Try again')
      setForm({ ...FormData, postalAddress: '' })
    } else if (aadhaarFileSize > 5000 || panFileSize > 5000) {
      toast.error('Provide files in allowed size only ! Try again')
      setForm({ ...FormData, postalAddress: '' })
    } else {
      toast.success('Successfully claimed the offer!!')
      navigate('/submittedDetails', { state: contactdetails })
    }
    // You can use FormData object for backend if needed later
    // const payload = new FormData();
    // Object.entries(FormData).forEach(([key, value]) => payload.append(key, value));
  };

  return (
    <div className="bg-[#171717] h-auto w-[375px] 2xl:w-[1300px] rounded-3xl flex flex-col gap-5 justify-center items-center shadow-xl mb-10 p-5">
      <InputField
        label="Postal Address"
        placeholder="Enter your full delivery address"
        name="postalAddress"
        value={FormData.postalAddress}
        handleInputChange={handleInputChange}
        required={true}
      />

      <InputField
        label="Upload Aadhaar Card"
        name="aadhaarFile"
        type="file"
        handleInputChange={handleInputChange}
        required={true}
      />
      {fileSizes.aadhaarFileSize>5000?<div className="text-sm text-red-600 -mt-3">Max file size: 5MB</div>:''}

      <InputField
        label="Upload PAN Card"
        name="panFile"
        type="file"
        handleInputChange={handleInputChange}
        required={true}
      />
      {fileSizes.panFileSize>5000?<div className="text-sm text-red-600 -mt-3">Max file size: 5MB</div>:''}

      <div
        className="bg-[#75C9FF] h-16 w-36 2xl:w-54 flex justify-center items-center rounded-full text-2xl font-bold shadow-xl hover:cursor-pointer mt-4"
        onClick={handleSubmit}
      >
        Submit
      </div>
    </div>
  );
}