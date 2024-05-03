import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  email: yup.string().required().email(),
  name: yup.string().required(),
phone: yup
    .string()
    .required("Mobile number is required")
    .matches(
      /^[0-9]{10}$/,
      "Mobile number must be 10 digits and contain only numbers"
    )
    .required(),
  password: yup.string().min(8).max(15).required(),
  confirm_password: yup
    .string()
    .label("confirm password")
    .required()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

const Form = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onsubmitHandle = (data) => {
    console.log({ data });
    reset();
  };

  return (
    <div className="container mt-5">
      <form onSubmit={handleSubmit(onsubmitHandle)}>
        <h2>Register Here</h2>
        <div className="mb-3">
          <label className="form-label">Name:</label>
          <input {...register("name")} className="form-control" placeholder="Enter Your Name" required />
          <p className="text-danger">{errors.name?.message}</p>
        </div>
        <div className="mb-3">
          <label className="form-label">Phone:</label>
          <input {...register("phone")} className="form-control" placeholder="Enter Your Phone" required />
          <p className="text-danger">{errors.phone?.message}</p>
        </div>
        <div className="mb-3">
          <label className="form-label">Email:</label>
          <input
            {...register("email")}
            className="form-control"
            placeholder="Enter Your Email"
            type="email"
            required
          />
          <p className="text-danger">{errors.email?.message}</p>
        </div>
        <div className="mb-3">
          <label className="form-label">Password:</label>
          <input
            {...register("password")}
            className="form-control"
            placeholder="Enter Your Password"
            type="password"
            required
          />
          <p className="text-danger">{errors.password?.message}</p>
        </div>
        <div className="mb-3">
          <label className="form-label">Confirm Password:</label>
          <input
            {...register("confirm_password")}
            className="form-control"
            placeholder="Confirm Your Password"
            type="password"
            required
          />
          <p className="text-danger">{errors.confirm_password?.message}</p>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default Form;
