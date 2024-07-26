import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import "./SignUpPage.css";
import "../Authentication/LoginPage.css";
import user from "../../assets/user.png";
import { getUser, signup } from "../../services/userServices";
import { Navigate } from "react-router-dom";

const schema = z
  .object({
    email: z.string().email({ message: "Enter a valid email" }),
    name: z.string().min(3, { message: "Name should be atleast 3 characters" }),
    password: z
      .string()
      .min(8, { message: "Password should be atleast 8 characters" }),
    confirmPassword: z.string(),
    deliveryAddress: z
      .string()
      .min(15, { message: "Address should be atleast 8 characters" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Confirm Password doesnot match Password,",
    path: ["confirmPassword"],
  });
const SignUpPage = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [formError, setFormError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });
  const onSubmit = async (formData) => {
    try {
      await signup(formData, profilePic);

      window.location = "/";
    } catch (e) {
      if (e.response && e.response.status === 400) {
        setFormError(e.response.data.message);
      }
    }
  };
  if (getUser()) {
    return <Navigate to="/" />;
  }
  return (
    <section className="align_center form_page">
      <form
        className="authentication_form align_center signup_form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2>SignUp Form</h2>
        <div className="image_input_section">
          <div className="image_preview">
            <img
              src={profilePic ? URL.createObjectURL(profilePic) : user}
              id="file-ip-1-preview"
            />
          </div>
          <label htmlFor="file-ip-1" className="image_label">
            Upload Image
          </label>
          <input
            type="file"
            id="file-ip-1"
            className="image_input"
            onChange={(e) => setProfilePic(e.target.files[0])}
          />
        </div>
        <div className="form_inputs signup_form_input">
          <div>
            <label htmlFor="name">Name</label>
            <input
              id="name"
              className="form_text_input"
              type="text"
              placeholder="Enter your name"
              {...register("name")}
            />
            {errors.name && (
              <em className="form_error">{errors.name.message}</em>
            )}
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              className="form_text_input"
              type="email"
              placeholder="Enter your email address"
              {...register("email")}
            />
            {errors.email && (
              <em className="form_error">{errors.email.message}</em>
            )}
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              className="form_text_input"
              type="password"
              placeholder="Enter your password"
              {...register("password")}
            />
            {errors.password && (
              <em className="form_error">{errors.password.message}</em>
            )}
          </div>
          <div>
            <label htmlFor="cpassword">Confirm Password</label>
            <input
              id="cpassword"
              className="form_text_input"
              type="password"
              placeholder="Enter confirm password"
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && (
              <em className="form_error">{errors.confirmPassword.message}</em>
            )}
          </div>
          <div className="signup_textares_section">
            <label htmlFor="deliveryAddress">Delivery Address</label>
            <textarea
              id="deliveryAddress"
              className="input_textarea"
              placeholder="Enter delivery address"
              {...register("deliveryAddress")}
            />
            {errors.address && (
              <em className="form_error">{errors.address.message}</em>
            )}
          </div>
        </div>

        {formError && <em className="form_error">{formError}</em>}
        <button className="search_button form_submit" type="submit">
          Submit
        </button>
      </form>
    </section>
  );
};
export default SignUpPage;
