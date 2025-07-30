import { useState, useEffect } from "react"
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export default function Navbar() {
  const [user, setUser] = useState({})
    const [userLoaded, setUserLoaded] = useState(false);
    const [istrue,setTrue]=useState(false)
  const navigate = useNavigate()
  const handleLogout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      console.log('User logged out');
      toast.success('User Logout Successful')
      navigate('/login')
    } catch (error) {
      toast.error('User logout failed ! try again')
      console.error('Error:', error);
    }
  };
  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user)
         setUserLoaded(true);

        toast.success(`Logged in as ${user.email}`)
        console.log('🔥 Logged-in user:', user);
      } else {
        toast.error('Log in first to access this section')
        navigate('/login')
        console.log('⚠️ No user is currently signed in.');
      }
    });

    return () => unsubscribe(); // Cleanup listener on unmount
  }, []);
useEffect(()=>{
  setTimeout(() => {
    setTrue(true)
  }, 2000);

})
  return (
    <div className=' h-[10vh] w-full flex items-center justify-between xl:p-5 bg-[#15151575] '>
   <Link to='/'><div className='text-sm md:text-2xl xl:text-3xl font-bold h-full mr-2 flex justify-center items-center'>🔥Database Handler</div></Link>
      <div className='flex justify-center items-center gap-10'>
        <div className='text-sm md:text-2xl xl:text-2xl font-bold xl:w-auto h-[10vh] flex justify-center items-center'>{`Greetings!! ${user.email}`}</div>
        <div className=' w-[80px] h-[45px] xl:w-[70px] xl:h-[70px] rounded-full flex justify-center items-center'>
          <img
            src={user.photoURL? user.photoURL: "https://img.daisyui.com/images/profile/demo/yellingwoman@192.webp"
            }
            alt={user?.displayName || 'User'}
            className="w-full h-full rounded-full object-cover"
          />
        </div>
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn bg-gray-800 h-16 w-16  rounded-full xl:m-1 text-4xl">📂</div>
          <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-2xl text-xl font-bold ">
            <Link to='/import'><li><a>Import a file 📂</a></li></Link>
            <Link to='/export'><li><a>Export a file 🥸</a></li></Link>
            <Link to='/table'><li><a>Tabular view👌</a></li></Link>
            <Link to='/getCircle'><li><a>Add Circle©️</a></li></Link>
            <Link to=''><li onClick={handleLogout}><a>Logout 👋</a></li></Link>
          </ul>
        </div>
        </div>
      </div>
  )
}
