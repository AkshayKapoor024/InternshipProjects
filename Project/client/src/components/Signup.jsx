import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Signup() {
  const navigate = useNavigate();
  const [signup, setForm] = useState({ username: "", email: "", password: "" });
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

    if (!signup.username.trim()) newErrors.username = "Enter a valid username";
    if (!/\S+@\S+\.\S+/.test(signup.email)) newErrors.email = "Enter a valid email address";
    if (signup.password.length < 6) newErrors.password = "Password must be at least 6 characters";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      await axios.post("http://192.168.1.31:3000/signup", signup, {withCredentials: true});
      toast.success("User Signup successful!!");
      navigate("/WinnersList");
    } catch (err) {
      const message = err.response?.data || "Something went wrong. Please try again.";
      toast.error(`Error: ${'Signing up'}`);
    }
  };

  return (
    <div
      className="flex-1 flex flex-col justify-center items-center bg-gradient-to-br from-[#0088FF] via-[#00AEEF] via-[#4DC5FF] via-[#8BE2FF] to-[#C9F1FF]"
      style={{ fontFamily: "Montserrat,sans-serif" }}
    >
      <div className="m-4 2xl:w-[900px] 2xl:h-24 flex justify-center items-center">
        <a href="http://192.168.1.31:3000/auth/google">
          <button className="text-md md:w-[650px] rounded-xl text-gray-100 bg-black hover:cursor-pointer md:text-2xl flex items-center justify-center gap-4 h-16 2xl:w-[700px] px-6 2xl:text-3xl font-bold hover:text-gray-100">
            <span className="inline-block w-16 h-[50px]">
              <img width="48" height="48" src="https://img.icons8.com/fluency/48/google-logo.png" alt="google-logo"/>
            </span>
            Continue with Google
          </button>
        </a>
      </div>

      <form
        className="m-2 xl:m-5 lg:m-2 bg-[#ffffff] min-w-[325px] h-[500px] md:w-[700px] lg:w-[900px] lg:h-[800px] text-gray-900 2xl:w-[900px] 2xl:h-[600px] shadow-2xl flex flex-col items-center"
        onSubmit={handleSubmit}
      >
        <h1 className="min-h-20 shadow-md lg:h-28 lg:text-[50px] 2xl:h-24 flex justify-center items-center 2xl:text-[50px] font-bold bg-[#0088FF] text-gray-100 text-center">
          Sign-in to RockFord
        </h1>

        {/* Username Field */}
        <div className="w-full 2xl:h-32 flex flex-col justify-center items-center">
          <label htmlFor="username" className=" px-5 h-10 w-full text-xl lg:h-20 lg:text-3xl 2xl:w-[700px] flex p-4 2xl:text-2xl font-semibold 2xl:justify-center items-center">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={signup.username}
            placeholder="Ex- Roman Reigns"
            required
            onChange={handleChange}
            className="min-w-[350px] md:w-[650px] lg:h-16 lg:w-[850px] lg:text-2xl 2xl:w-[700px] 2xl:h-16 ring-1 ring-gray-500 rounded-md p-2"
          />
          {errors.username && <div className="text-sm text-red-500 mt-1 lg:text-xl">{errors.username}</div>}
        </div>

        {/* Email Field */}
        <div className="px-2 w-full 2xl:h-32 flex flex-col justify-center items-center">
          <label htmlFor="email" className="h-10 w-full text-xl lg:h-20 lg:text-3xl 2xl:w-[700px] flex p-4 2xl:text-2xl font-semibold 2xl:justify-center items-center">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={signup.email}
            placeholder="Please provide your email"
            required
            onChange={handleChange}
            className="min-w-[350px] md:w-[650px] lg:h-16 lg:w-[850px] lg:text-2xl 2xl:w-[700px] 2xl:h-16 ring-1 ring-gray-500 rounded-md p-2"
          />
          {errors.email && <div className="text-sm text-red-500 mt-1 lg:text-xl">{errors.email}</div>}
        </div>

        {/* Password Field */}
        <div className="w-full 2xl:h-32 flex flex-col justify-center items-center">
          <label htmlFor="password" className=" px-5 h-10 w-full text-xl lg:h-20 lg:text-3xl 2xl:w-[700px] flex p-2 2xl:text-2xl font-semibold justify-start items-center">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={signup.password}
            placeholder="Enter your password here"
            required
            onChange={handleChange}
            className="min-w-[350px] md:w-[650px] lg:w-[850px] lg:h-16 lg:text-2xl 2xl:w-[700px] 2xl:h-16 ring-1 ring-gray-500 rounded-md p-2"
          />
          {errors.password && <div className="text-sm text-red-500 mt-1 lg:text-xl">{errors.password}</div>}
        </div>

        {/* Submit Button */}
        <div className="w-[330px] md:w-[700px] md:text-lg lg:text-2xl lg:w-[900px] lg:h-20 2xl:w-[900px] flex flex-col justify-center items-center mt-5">
          <button type="submit" className="mt-4 min-h-[5vh] w-[300px] md:w-96 md:text-lg lg:text-2xl lg:w-[500px] lg:h-20 rounded-2xl 2xl:text-[30px] font-bold text-white bg-[#8BE2FF] 2xl:w-[400px] cursor-pointer">
            Submit
          </button>
          <h6 className="text-base 2xl:text-base m-2">
            Already have an account? <a href="/login" className="text-blue-500 underline">Login</a>
          </h6>
        </div>
      </form>
    </div>
  );
}