import React, { useState } from "react";
import NavBar from "../../components/NavBar";
import { Link, useNavigate } from "react-router-dom";
import Password from "../../components/Password";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!password) {
        setError("Please enter a valid password.");
        return;
      }
    setError("")

    //Login Api Call
    try{
      const response = await axiosInstance.post("/login",{
        email:email,
        password:password
      })

      if(response.data && response.data.accessToken){
        localStorage.setItem("token",response.data.accessToken)
        navigate("/dashboard")
      }

    }catch(error){
      if(error.response && error.response.data && error.response.data.message){
        setError("An unexpected error occured, Please try again.")
      }
    }
  };

  return (
    <>
      <NavBar />

      <div className="flex items-center justify-center mt-20">
        <div className="w-96 border bg-white px-7 py-10">
          <form onSubmit={handleLogin}>
            <h4 className="text-2xl mb-7">Login</h4>
            <input
              type="text"
              placeholder="Email"
              className="input-box"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Password
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {error && <p className="text-red-500 text-xs pb-1">{error} </p>}

            <button type="submit" className="btn-primary">
              Login
            </button>

            <p className="text-sm text-center mt-4">
              Not registered yet?{""}
              <Link to="/signup" className="font-medium text-primary underline">
                Create an Account
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;