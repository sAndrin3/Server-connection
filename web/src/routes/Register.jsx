import Navbar from "../components/Navbar.jsx";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import "./Register.css"

function Register() {
  const schema = yup.object().shape({
    fullName: yup.string().required("Full name is required"),
    email: yup.string().email().required("Email is required"),
    age: yup
      .number("Age must be a number")
      .positive("Age must be a positive number")
      .required("Age is required"),
    password: yup
      .string()
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{4,}$/,
        'password must contain at least 4 characters, uppercase, lowercase, number, and one special case character'
      )
      .required("Password is required"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match"),
  });

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <>
      <Navbar />

      <form onSubmit={handleSubmit(onSubmit)} className="form-container1">
        <div className="form-group">
          <input
            type="text"
            placeholder="Full name"
            {...register("fullName")}
          />
          <p className="error-message">{errors.fullName?.message}</p>
        </div>

        <div className="form-group1">
          <input
            type="text"
            placeholder="Email..."
            {...register("email")}
          />
          <p className="error-message">{errors.email?.message}</p>
        </div>

        <div className="form-group1">
          <input type="number" placeholder="Age..." {...register("age")} />
          <p className="error-message">{errors.age?.message}</p>
        </div>

        <div className="form-group1">
          <input
            type="password"
            placeholder="Password..."
            {...register("password")}
          />
          <p className="error-message">{errors.password?.message}</p>
        </div>

        <div className="form-group1">
          <input
            type="password"
            placeholder="Confirm Password..."
            {...register("confirmPassword")}
          />
          <p className="error-message">{errors.confirmPassword?.message}</p>
        </div>

        <input type="submit" value="Submit" className="submit-btn" />
      </form>
    </>
  );
}

export default Register;
