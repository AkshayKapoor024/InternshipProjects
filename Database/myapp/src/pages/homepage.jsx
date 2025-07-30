import { Typewriter } from 'react-simple-typewriter';
import { useNavigate ,Link} from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { toast } from 'react-toastify';
import Navbar from '../components/navbar';
export default function Homepage() {
  const [user, setUser] = useState({})
  const navigate = useNavigate()
  const handleDelivery = () => {
    navigate('/table')
  }
  const handleCircle = () => {
    navigate('/getCircle')
  }
      const handleLogout=()=>{}
  return (
    <div class="bg-gray-650 text-white rounded-xl shadow-xl w-[100vw] xl:h-[97.8vh] flex flex-col justify-start items-center gap-10 overflow-hidden mb-5" style={{ fontFamily: 'Montserrat , sans-serif' }}>
      <Navbar></Navbar>
      <div className='text-md mt-5 xl:text-[60px] font-bold '>
        <Typewriter
          words={['Database Handler 😉']}
          loop={1}
          cursorStyle="|"
          typeSpeed={70}
          deleteSpeed={50}
          delaySpeed={1500}
        />
      </div>
      <div className=' flex flex-col xl:flex-row justify-center items-center xl:h-[60vh] xl:w-full gap-12'>
        <div className='bg-[#0000004e] w-[85vw] xl:w-[22vw] h-[90%] rounded-3xl shadow-2xl p-6 
                  hover:scale-[1.08] hover:bg-gradient-to-tr
                  transition-all duration-500 ease-out cursor-pointer hover:mx-5 flex flex-col justify-start items-center'>
          <h2 className="text-3xl h-[10vh] font-bold flex items-center gap-2">
            <i className="fas fa-cloud-upload-alt text-lime-300"></i> Import Data 🚀
          </h2>
          <p className="mt-2 text-white/80 text-md h-[15vh] flex items-center font-semibold">
            Upload massive datasets effortlessly. Supports CSV, SQL dumps, and real-time validation.
          </p>
          <div className="mt-4 text-white space-y-1 text-md flex flex-col justify-evenly font-semibold h-[20vh] w-[90%]">
            <div>🚀 Optimized for bulk imports</div>
            <div>🔍 Instant schema checks</div>
            <div>🧪 Error previews & rollback support</div>
          </div>
          <button className="mt-6 px-6 py-2 rounded-lg bg-emerald-600 w-[70%] h-[15%] hover:bg-lime-400 text-white font-semibold transition text-xl" onClick={() => { navigate('/import') }}>
            Start Import ✨
          </button>
        </div>

        {/* Export Card */}
        <div className='bg-[#0000004e] w-[85vw] xl:w-[22vw] h-[90%] rounded-3xl shadow-2xl p-6 
                  hover:scale-[1.08] transition-all duration-500 ease-out cursor-pointer hover:mx-5 flex flex-col justify-start items-center'>
          <h2 className="text-3xl h-[10vh] font-bold flex items-center gap-2">
            <i className="fas fa-cloud-download-alt text-blue-300"></i> Export Records 📦
          </h2>
          <p className="mt-2 text-white/80 text-md h-[15vh] flex items-center font-semibold">
            Download filtered data securely in CSV format. Custom ranges, status filters, and more.
          </p>
          <div className="mt-4 text-white space-y-1 text-md flex flex-col justify-evenly font-semibold h-[20vh] w-[90%]">
            <div>📂 One-click CSV download</div>
            <div>🎯 Region + status based filters</div>
            <div>🔐 Secure export with auth validation</div>
          </div>
          <button className="mt-6 px-6 py-2 rounded-lg bg-cyan-600 hover:bg-blue-400  text-white font-semibold transition w-[70%] h-[15%] text-xl" onClick={() => { navigate('/export') }}>
            Export Now 🚀
          </button>
        </div>


        <div className='bg-[#0000004e] w-[85vw] xl:w-[22vw] h-[90%] rounded-3xl shadow-2xl p-6 
                  hover:scale-[1.08]
                  transition-all duration-500 ease-out cursor-pointer hover:mx-5 flex flex-col justify-start items-center'>
          <h2 className="text-3xl h-[10vh] font-bold flex items-center gap-2">
            <i className="fas fa-cloud-download-alt text-blue-300"></i> Get Tabular view 👌
          </h2>
          <p className="mt-2 text-white/80 text-md h-[15vh] flex items-center font-semibold">
            Add your desired filters and get started...
          </p>
          <div className="mt-4 text-white space-y-1 text-md flex flex-col justify-evenly font-semibold h-[20vh] w-[90%]">
            <div>📂 Fetch data from Google Cloud </div>
            <div>🎯 Apply categories and filters of your choice</div>
            <div>🔐 Get Fast visuals </div>
          </div>
          <button className="mt-6 px-6 py-2 rounded-lg btn btn-secondary  text-white font-semibold transition w-[70%] h-[15%] text-xl" onClick={handleDelivery}>
            Begin Now 🚀
          </button>
        </div>


        <div className='bg-[#0000004e] w-[85vw] xl:w-[22vw] h-[90%] rounded-3xl shadow-2xl p-6 
                  hover:scale-[1.08]
                  transition-all duration-500 ease-out cursor-pointer hover:mx-5 flex flex-col justify-start items-center'>
          <h2 className="text-3xl h-[10vh] font-bold flex items-center gap-2">
            <i className="fas fa-cloud-download-alt text-blue-300"></i> Convert CSV File 👋
          </h2>
          <p className="mt-2 text-white/80 text-md h-[15vh] flex items-center font-semibold">
          <div className='text-center'>Import a file containing series mobile code and get instant downloadable file with mapped circle codes of city... </div>
          </p>
          <div className="mt-4 text-white space-y-1 text-md flex flex-col justify-evenly font-semibold h-[20vh] w-[90%]">
            <div>📂 Add a CSV file with series code </div>
            <div>🎯 Get Instant csv download with suitable circle codes</div>
            <div>🔐 Instant results </div>
          </div>
          <button className="mt-6 px-6 py-2 rounded-lg btn btn-warning  text-white font-semibold transition w-[70%] h-[15%] text-xl" onClick={handleCircle}>
            Start Process🚀
          </button>
        </div>

      </div>
    </div>
  )
}
