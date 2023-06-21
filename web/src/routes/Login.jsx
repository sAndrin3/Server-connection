import Navbar from "../components/Navbar.jsx";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import "./Login.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const schema = yup.object().shape({
    Name: yup.string().required("Name is required"),
    Password: yup.string().min(4, "Password must be at least 4 characters long").required("Password is required"),
  });
  

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    axios.post("http://localhost:8081/auth/login", data)
    .then(({data}) => {
      if(data.token){
        navigate("/")
      }
    })
    .catch(({response}) => {
      alert(response.data.error)
    });
  }

  return (
    <div className="login">
      <Navbar />

      <form onSubmit={handleSubmit(onSubmit)} className="form-container2">
        <h4 className="banner">Login Page</h4>
        <div className="form-group2">
          <input type="text" placeholder="Name" {...register("Name")} />
          <p className="error-message">{errors.Name?.message}</p>
        </div>

        <div className="form-group2">
          <input
            type={showPassword ? "text" : "password"} // Updated type attribute
            placeholder="Password"
            {...register("Password")}
          />
          {showPassword ? (
            <FaEyeSlash
              className="password-toggle1"
              onClick={togglePasswordVisibility}
            />
          ) : (
            <FaEye
              className="password-toggle1"
              onClick={togglePasswordVisibility}
            /> // Updated icon for show password
          )}
          <p className="error-message">{errors.password?.message}</p>
        </div>

        <input type="submit" value="Login" className="login-btn" />
      </form>
    </div>
  );
}

export default Login;
