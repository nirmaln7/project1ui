import React, { useState } from "react";
import "./LoginPage.css";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { getUser, login } from "../../services/userServices";
import { Navigate, useLocation } from "react-router-dom";

const schema = z.object({
  email: z.string().email().min(3),
  password: z.string().min(8),
});

const LoginPage = () => {
  const location = useLocation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });
  const [formError, setFormError] = useState("");
  const onSubmit = async (formData) => {
    try {
      await login(formData);
      const { state } = location;

      window.location = state ? state.from : "/";
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
        action=""
        className="authentication_form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2>Login Form</h2>
        <div className="form_inputs">
          <div>
            <label htmlFor="email">Name</label>
            <input
              type="email"
              id="email"
              className="form_text_input"
              placeholder="Enter your name"
              {...register("email")}
            />
            {errors.email && (
              <em className="form_error">{errors.email.message}</em>
            )}
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form_text_input"
              placeholder="Enter your password"
              {...register("password")}
              id="password"
            />
            {errors.password && (
              <em className="form_error">{errors.password.message}</em>
            )}
          </div>
          {formError && <em className="form_error">{formError}</em>}
          <button type="submit" className="search_button form_submit">
            Submit
          </button>
        </div>
      </form>
    </section>
  );
};

export default LoginPage;
