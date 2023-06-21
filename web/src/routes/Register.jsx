import Navbar from "../components/Navbar.jsx";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import "./Register.css"
import {FaEye, FaEyeSlash} from "react-icons/fa"

function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  };
  const schema = yup.object().shape({
    fullName: yup.string().required("Name is required"),
    email: yup.string().email().required("Email is required"),
    age: yup
      .number("ContactNumber must be a number")
      .positive("ContactNumber must be a positive number")
      .required("ContactNumber is required"),
      password: yup.string().min(4, "Password must be at least 4 characters long").required("Password is required"),
  });

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="register">
      <Navbar />

      <form onSubmit={handleSubmit(onSubmit)} className="form-container1">
        <div className="form-group1">
          <input
            type="text"
            placeholder="Name"
            {...register("Name")}
          />
          <p className="error-message">{errors.Name?.message}</p>
        </div>

        <div className="form-group1">
          <input
            type="text"
            placeholder="Email"
            {...register("email")}
          />
          <p className="error-message">{errors.email?.message}</p>
        </div>

        <div className="form-group1">
          <input type="text" placeholder="ContactNumber" {...register("contactNumber")} />
          <p className="error-message">{errors.contactNumber?.message}</p>
        </div>

        <div className="form-group1">
                  <input
                      type={showPassword ? "text" : "password"} // Updated type attribute
                      placeholder="Password"
                      {...register("password")}
                  />
                  {showPassword ? (
                      <FaEyeSlash className="password-toggle" onClick={togglePasswordVisibility} />
                  ) : (
                      <FaEye className="password-toggle" onClick={togglePasswordVisibility} /> // Updated icon for show password
                  )}
                  <p className="error-message">{errors.password?.message}</p>
              </div>


        <input type="submit" value="Submit" className="submit-btn" />
        <div className="login-button-container">
        <p>Already have an account?</p>
        <Link to="/login" className="login-button">Login</Link>
      </div>
      </form>
    </div>
  );
}

export default Register;
