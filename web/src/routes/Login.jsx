import Navbar from "../components/Navbar.jsx";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import "./Login.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const schema = yup.object().shape({
    Name: yup.string().required("Name is required"),
    password: yup
      .string()
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{4,}$/,
        "Password must contain at least 4 characters, uppercase, lowercase, number, and one special case character"
      ),
  });

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="login">
      <Navbar />

      <form onSubmit={handleSubmit(onSubmit)} className="form-container2">
        <div className="form-group2">
          <input type="text" placeholder="Name" {...register("Name")} />
          <p className="error-message">{errors.Name?.message}</p>
        </div>

        <div className="form-group2">
          <input
            type={showPassword ? "text" : "password"} // Updated type attribute
            placeholder="Password"
            {...register("password")}
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
