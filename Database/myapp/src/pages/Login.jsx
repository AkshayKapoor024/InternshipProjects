import { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import {
  getAuth,
  signInWithEmailAndPassword
} from 'firebase/auth';
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs
} from 'firebase/firestore';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const auth = getAuth();
  const db = getFirestore();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const q = query(
        collection(db, 'authorizedUsers'),
        where('email', '==', form.email.trim().toLowerCase())
      );
      const snapshot = await getDocs(q);

      if (snapshot.empty) {
        toast.error('❌ Access denied: Email not authorized');
        return;
      }

      const userDoc = snapshot.docs[0].data();
      const enteredPass = form.password.trim();

      if (userDoc.password !== enteredPass) {
        toast.error('⚠️ Incorrect password');
        return;
      }

      await signInWithEmailAndPassword(
        auth,
        form.email.trim().toLowerCase(),
        enteredPass
      );

      toast.success(`✅ Welcome ${userDoc.name || 'User'}!`);
      navigate('/');
    } catch (error) {
      console.error('Login error:', error);
      toast.error(`Login failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="bg-[#151515] w-[100vw] h-[100vh] flex justify-center items-center"
      style={{ fontFamily: 'Montserrat,sans-serif' }}
    >
      <div className="bg-[#222222] w-[90vw] md:w-[80vw] lg:w-[70vw] xl:w-[30vw] h-[75vh] shadow-2xl">
        <form onSubmit={handleLogin} className="h-full flex flex-col p-10 gap-10 items-center justify-center">
          <h2 className=" text-2xl xl:text-4xl xl:text-[35px] font-bold">
            Login to Database Handler🔥
          </h2>

          <div className="flex flex-col items-start">
            <label htmlFor="email" className="text-2xl font-bold my-2">Email</label>
            <input
              type="email"
              placeholder="Ex - tribalchief@gmail.com"
              className="bg-[#2b2b2b]  w-[100%] md:w-[50vw] lg:w-[50vw] xl:w-[25vw] h-16 text-xl font-medium text-white px-5 shadow-2xl placeholder:text-gray-400 focus:outline-none"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              name="email"
              id="email"
              required
            />
          </div>

          <div className="flex flex-col items-start">
            <label htmlFor="password" className="text-2xl font-bold my-2">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="bg-[#2b2b2b] w-[100%] md:w-[50vw] lg:w-[50vw] xl:w-[25vw] h-16 text-xl font-medium text-white px-5 shadow-2xl placeholder:text-gray-400 focus:outline-none"
              value={form.password}
              name="password"
              id="password"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 w-[60%] h-[10%] rounded-full text-2xl font-semibold shadow-2xl hover:scale-110 transition duration-100 ease-in-out"
            disabled={loading}
          >
            {loading ? 'Authenticating...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
