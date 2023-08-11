"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { signIn } from "next-auth/react";
import { toast } from "react-hot-toast";
import loading from "../loading";

export const metadata = {
  title: "Credentials | BlogBreeeeze",
};

const RegisterForm = () => {
  const router = useRouter();
  const [variant, setVariant] = useState("LOGIN");
  const [loader, setLoading] = useState(false);

  const toggleVariant = () => {
    setVariant((prevVariant) =>
      prevVariant === "REGISTER" ? "LOGIN" : "REGISTER"
    );
  };

  const initialState = {
    name: "",
    email: "",
    password: "",
  };
  const [state, setState] = useState(initialState);

  function handleChange(event) {
    setState({ ...state, [event.target.name]: event.target.value });
  }

  const onSubmit = (event) => {
    if (variant === "REGISTER") {
      event.preventDefault();
      setLoading(true);
      axios
        .post("/api/register", state)
        .then(() => {
          router.refresh();
        })
        .then(() => {
          setLoading(false);
          router.push("/sign");
        })
        .catch((err) => {})
        .finally(() => {
          toast.success("Registration Success!");
          router.push("/sign");
          setLoading(false);
        });
    } else {
      setLoading(true);
      event.preventDefault();
      signIn("credentials", {
        ...state,
        redirect: false,
      }).then((callback) => {
        if (callback?.ok) {
          router.refresh();
          setLoading(false)
          toast.success("Login Success!");
          router.push("/");
        }

        if (callback?.error) {
          throw new Error("Wrong Credentials");
          setLoading(false)
        }
      });
    }
  };

  return (
    <div>
      {loader ? (
        <div className="loader-container">
          <div className="spinner"></div>
        </div>
      ) : (
        <div className="flex justify-center mt-4">
          <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10 w-full sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/3 m-2">
            <h2 className="text-3xl font-bold mb-4 orange_gradient">
              {variant === "REGISTER" ? "Register" : "Login"}
            </h2>
            <form onSubmit={onSubmit}>
              {variant === "REGISTER" && (
                <div className="mb-4">
                  <label htmlFor="name" className="block text-sm font-medium">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="mt-1 p-2 w-full border rounded-md"
                    placeholder="Name"
                    value={state.name}
                    onChange={handleChange}
                    name="name"
                  />
                </div>
              )}
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="mt-1 p-2 w-full border rounded-md"
                  placeholder="Email"
                  value={state.email}
                  onChange={handleChange}
                  name="email"
                />
              </div>
              <div className="mb-6">
                <label htmlFor="password" className="block text-sm font-medium">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="mt-1 p-2 w-full border rounded-md"
                  placeholder="Password"
                  value={state.password}
                  onChange={handleChange}
                  name="password"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 blue_gradient border-4 hover:backdrop-brightness-50"
              >
                {variant === "REGISTER" ? "Register" : "Login"}
              </button>
            </form>
            <div className="flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500">
              <div>
                {variant === "LOGIN"
                  ? "New to BlogBreeeeze?"
                  : "Already have an account?"}
              </div>
              <div onClick={toggleVariant} className="underline cursor-pointer">
                {variant === "LOGIN" ? "Create an account" : "Login"}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegisterForm;
