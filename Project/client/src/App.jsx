import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import LandingPage from './pages/LandingPage'
import InitialInfo from './pages/initialInfo';
import RedeemMethod from './pages/RedeemMethod';
import GiftDetails from './pages/giftDetails';
import FinalPage from './pages/FinalPage';
import BackendAnalytics from './pages/BackendAnalytics'
import LoginForm from './pages/LoginPage';
import SignupForm from './pages/SignupForm';
import ShowCard from './pages/showCard';
function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter >
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover={false}
        draggable
      />
      <Routes>
        <Route path='/' element={<InitialInfo/>} />
        <Route path='/otpValidation/:id' element={<LandingPage/>}></Route>
        <Route path='/chooseRedeemMethod' element={<RedeemMethod/>}></Route>
        <Route path='/provideGiftDetails' element={<GiftDetails/>}></Route>
        <Route path='/submittedDetails' element={<FinalPage/>}></Route>
        <Route path='/WinnersList' element={<BackendAnalytics/>}></Route>
        <Route path='/login' element={<LoginForm/>}></Route>
        <Route path='/signup' element={<SignupForm/>}></Route>
        <Route path='/showCard' element={<ShowCard/>}></Route>
      </Routes>

    </BrowserRouter>
  )
}

export default App
