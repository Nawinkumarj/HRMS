import { assets } from "../assets/assets";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

const Login = () => {

  const { handleLogin } = useAuth();
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  const LoginSubmit = (e) => {
    e.preventDefault();
    const isSuccess = handleLogin(userId, password);

    if (isSuccess) {
      toast.success("Login successful!");
    } else {
      toast.error("Invalid credentials");
    }
  };


  return (
    <div className="loginContainer">
        <div className="loginContent" >
          <div className="LogoContainer flex-center">
            <img src={assets.Logo} className="loginLogo" />
            <p>Streamline Your Workforce with Our HRMS Portal</p>
          </div>
          <div className="loginFromContainer">
            <h1>Welcome Back...</h1>
            <p>Please enter your email and password</p>
            <form>
              <div className="loginInputContainer flex-center">
                <input type="text" placeholder="UserId" value={userId} onChange={(e)=> setUserId(e.target.value)} />
                <input type="password" placeholder="Password" value={password} onChange={(e)=> setPassword(e.target.value)} />
              </div>
              <p>By login, you agree to our <a href="#">Terms & Conditions</a></p>
              <hr />
                <button value="submit" className="LoginBtn flex-center" onClick={LoginSubmit}>
                  <p>LOGIN</p>
                  <img src={assets.dotArrowIcon} alt="" />
                </button>
            </form>
          </div>
        </div>
    </div>
  )
}

export default Login