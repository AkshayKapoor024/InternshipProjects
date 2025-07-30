import { useEffect } from 'react';
import {
  getAuth,
  EmailAuthProvider,
  GoogleAuthProvider
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  serverTimestamp
} from 'firebase/firestore';
import * as firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css';
import { toast } from 'react-toastify'; // ✅ Ensure toast is imported
import 'react-toastify/dist/ReactToastify.css'; // ✅ Toast styling

function Login() {
  const uiConfig = {
    signInOptions: [
      EmailAuthProvider.PROVIDER_ID,
      GoogleAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      signInSuccessWithAuthResult: async (authResult) => {
        try {
          const user = authResult.user;
          const db = getFirestore();
          const userRef = doc(db, 'users', user.uid);

          const docSnap = await getDoc(userRef);
          if (!docSnap.exists()) {
            await setDoc(userRef, {
              uid: user.uid,
              name: user.displayName || '',
              email: user.email,
              photoURL: user.photoURL || '',
              providerId: user.providerData[0]?.providerId || '',
              createdAt: serverTimestamp()
            });
            console.log('New user profile added from login');
          } else {
            console.log('Welcome back!');
          }

          toast.success('User login successful');
          window.location.href = '/';
        } catch (error) {
          console.error('Login error:', error);
          toast.error('Login failed. Please try again.');
        }

        return false;
      }
    },
    signInFlow: 'popup'
  };

  useEffect(() => {
    const auth = getAuth();
    const ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(auth);
    ui.start('#login-ui-container', uiConfig);
  }, []);

  return (
    <div
      className="bg-[#151515] w-[100vw] h-[100vh] flex justify-center items-center"
      style={{ fontFamily: 'Montserrat,sans-serif' }}
    >
      <div className="bg-[#222222] w-[30vw] h-[70vh] shadow-2xl">
        <div className="h-full flex flex-col p-10 gap-10 items-center">
          <h2 className="text-4xl xl:text-[35px] font-bold">
            Login to Database Handler
          </h2>

          <div
            id="login-ui-container"
            className="bg-[#2b2b2b] w-full h-96 flex justify-center items-center"
          />

          {/* 👉 Link to Signup page */}
          <div className="text-white text-sm">
            New here?{' '}
            <a
              href="/Signup"
              className="text-blue-400 underline hover:text-blue-500"
            >
              Create an account
            </a>
          </div>

          <button className="bg-blue-600 w-[60%] h-[20%] text-2xl font-semibold shadow-2xl hover:scale-110 transition duration-100 ease-in-out">
            Cancel Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;