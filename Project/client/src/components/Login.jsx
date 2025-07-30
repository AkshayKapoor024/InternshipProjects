import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Login() {
  const navigate = useNavigate();
  const [login, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" })); // Clear error as user types
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!/\S+@\S+\.\S+/.test(login.email)) newErrors.email = "Enter a valid email address";
    if (!login.password || login.password.length < 6) newErrors.password = "Please enter a valid password";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      await axios.post("http://192.168.1.31:3000/login", login, {
  withCredentials: true
});
      toast.success("User Login successful!!");
      navigate("/WinnersList");
    } catch (err) {
      const message = err.response?.data || "Something went wrong. Please try again.";
      toast.error(`Error: ${'Error while logging in please try again'}`);
    }
  };

  useEffect(() => {
    axios.get("http://192.168.1.31:3000/session-check",{withCredentials: true
  })
      .then(() => console.log("Session set"))
      .catch((err) => console.log("Error: while logging in please try again"));
  }, []);

  return (
    <div
      className="flex-1 flex flex-col justify-center items-center bg-gradient-to-br from-[#0088FF] via-[#00AEEF] via-[#4DC5FF] via-[#8BE2FF] to-[#C9F1FF]"
      style={{ fontFamily: "Montserrat,sans-serif" }}
    >
      <div className="2xl:w-[900px] 2xl:h-24 flex justify-center items-center m-2">
        <a href="http://192.168.1.31:3000/auth/google">
          <button className="text-xl md:w-[650px] rounded-xl text-gray-100 bg-black flex items-center justify-center gap-4 h-16 2xl:w-[700px] px-6 2xl:text-3xl font-bold hover:text-gray-100 hover:cursor-pointer">
            <span className="inline-block w-16 h-[50px]">
            <img width="48" height="48" src="https://img.icons8.com/fluency/48/google-logo.png" alt="google-logo"/>
            </span>
            Continue with Google
          </button>
        </a>
      </div>

      <form
        className=" items-center m-5 xl:m-5 lg:m-2 bg-white min-w-[325px] h-[400px] md:w-[700px] lg:w-[900px] lg:h-[600px] text-gray-900 2xl:w-[900px] 2xl:h-[500px] shadow-2xl flex flex-col"
        onSubmit={handleSubmit}
      >
        <h1 className="text-center min-h-20 text-3xl shadow-md lg:h-28 lg:text-[50px] 2xl:h-24 flex justify-center items-center 2xl:text-[50px] font-bold bg-[#0088FF] text-gray-100">
          Welcome To RockFord🎉
        </h1>
        <div className="flex flex-col">
          {/* Email Field */}
          <div className="w-full 2xl:h-32 flex flex-col justify-center items-center">
            <label htmlFor="email" className="h-10 w-full text-xl lg:h-20 lg:text-3xl 2xl:w-[700px] 2xl:text-left flex p-4 2xl:text-2xl font-semibold items-center">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={login.email}
              placeholder="Please provide your email"
              required
              onChange={handleChange}
              className="min-w-[350px] md:w-[650px] lg:h-16 lg:w-[850px] lg:text-2xl 2xl:w-[700px] 2xl:h-16 ring-1 ring-gray-500 rounded-md p-2"
            />
            {errors.email && <div className="text-sm text-red-500 mt-1 lg:text-xl">{errors.email}</div>}
          </div>

          {/* Password Field */}
          <div className="w-full 2xl:h-32 flex flex-col justify-center items-center">
            <label htmlFor="password" className="h-10 w-full text-xl lg:h-20 lg:text-3xl 2xl:w-[700px] flex p-2 2xl:text-2xl font-semibold justify-start items-center">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={login.password}
              placeholder="Enter your password here"
              required
              onChange={handleChange}
              className="min-w-[350px] md:w-[650px] lg:w-[850px] lg:h-16 lg:text-2xl 2xl:w-[700px] 2xl:h-16 ring-1 ring-gray-500 rounded-md p-2"
            />
            {errors.password && <div className="text-sm text-red-500 mt-1 lg:text-xl">{errors.password}</div>}
          </div>

          {/* Submit Button */}
          <div className="h-24 w-full 2xl:h-32 flex flex-col justify-center items-center">
            <button
              type="submit"
              className="min-h-[5vh] mt-4 w-[300px] md:w-96 md:text-lg lg:text-2xl lg:w-[500px] lg:h-20 rounded-2xl 2xl:text-[30px] font-bold text-white bg-[#8BE2FF] 2xl:w-[300px] cursor-pointer"
            >
              Submit
            </button>
            <h6 className="2xl:text-sm m-2">
              Don't have an account? <a href="/signup" className="text-blue-500 underline">Sign-Up</a>
            </h6>
          </div>
        </div>
      </form>
    </div>
  );
}