import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { loginSchema } from "../schema/loginSchema";

import { useMutation } from "@tanstack/react-query";

import { loginUser } from "../api/authApi";

import { useDispatch } from "react-redux";

import { setCredentials } from "../store/authSlice";

import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,

    handleSubmit,

    setError,

    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const loginMutation = useMutation({
    mutationFn: loginUser,

    onSuccess: (data) => {
      localStorage.setItem("token", data.token);

      dispatch(setCredentials(data));

      navigate("/users");
      toast.success("Login successful");
    },

    onError: (error: unknown) => {
      console.error("Login error:", error);

      /*
       Axios error check
    */

      if (axios.isAxiosError(error)) {
        /*
           Laravel validation errors
        */

        const responseErrors = error.response?.data?.errors;

        if (responseErrors) {
          Object.keys(responseErrors).forEach((field) => {
            setError(field as "email" | "password", {
              type: "server",
              message: responseErrors[field][0],
            });
          });

          return;
        }

        /*
           Wrong credentials
        */

        const message = error.response?.data?.message;

        if (message) {
          setError("password", {
            type: "server",
            message,
          });

          toast.error(message);

          return;
        }
      }

      /*
       Fallback error
    */

      toast.error("Something went wrong");
    },
  });

  const onSubmit = (data) => {
    loginMutation.mutate(data);
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="card shadow mt-5">
            <div className="card-body">
              <h2 className="text-center mb-4">Login</h2>

              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                  <label className="form-label">Email</label>

                  <input
                    type="email"
                    className={`form-control ${
                      errors.email ? "is-invalid" : ""
                    }`}
                    {...register("email")}
                  />

                  {errors.email && (
                    <div className="invalid-feedback">
                      {errors.email.message}
                    </div>
                  )}
                </div>

                <div className="mb-3">
                  <label className="form-label">Password</label>

                  <input
                    type="password"
                    className={`form-control ${
                      errors.password ? "is-invalid" : ""
                    }`}
                    {...register("password")}
                  />

                  {errors.password && (
                    <div className="invalid-feedback">
                      {errors.password.message}
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  disabled={loginMutation.isPending}
                >
                  {loginMutation.isPending ? "Loading..." : "Login"}
                </button>
              </form>

              <div className="text-center mt-3">
                <Link to="/register">Create account</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
