import React, { useState } from "react";
import "./LoginNeo.css";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { getUser, login } from "../../services/userServices";
import { Navigate, useLocation } from "react-router-dom";

const schema = z.object({
  email: z.string().email().min(3),
  password: z.string().min(8),
});

const LoginNeo = () => {
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
    <section className="neo_login">
      <form onSubmit={handleSubmit(onSubmit)} action="">
        <div className="segment">
          <h1>Sign up</h1>
        </div>
        <label>
          <input
            type="email"
            id="email"
            className="form_text_input"
            placeholder="Enter your mail"
            {...register("email")}
          />
          {errors.email && (
            <em className="form_error">{errors.email.message}</em>
          )}
        </label>
        <label>
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
        </label>
        {formError && <em className="form_error">{formError}</em>}
        <button className="red" type="submit">
          <i className="icon ion-md-lock"></i> Log in
        </button>
        <div className="segment">
          <button className="unit" type="button">
            <i className="icon ion-md-arrow-back"></i>
          </button>
          <button className="unit" type="button">
            <i className="icon ion-md-bookmark"></i>
          </button>
          <button className="unit" type="button">
            <i className="icon ion-md-settings"></i>
          </button>
        </div>
        <div className="input-group">
          <label>
            <input type="text" placeholder="Email Address" />
          </label>
          <button className="unit" type="button">
            <i className="icon ion-md-search"></i>
          </button>
        </div>
      </form>
    </section>
  );
};

export default LoginNeo;
