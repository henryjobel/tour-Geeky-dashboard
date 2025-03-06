"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import Cookies from "js-cookie";
import {
  login,
  continueWithGoogle,
  handleGoogleCallback,
} from "@/services/authService";

interface FormData {
  email: string;
  password: string;
}

interface GoogleError {
  message: string;
  error: any;
}

// const redirectUri = "http://localhost:3000/login/";

const SignIn = () => {
  const [loading, setLoading] = useState<boolean>(false);
  // const [googleLoading, setGoogleLoading] = useState<boolean>(false);
  // const [googleError, setGoogleError] = useState<GoogleError | null>(null);
  const [error, setError] = useState<string | null>(null);
  // const searchParams = useSearchParams();
  const router = useRouter();

  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await login(formData.email, formData.password);
      const referrer = document.referrer || "/";
      router.push(referrer);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // const continueWithGoogleAuth = async () => {
  //   try {
  //     setGoogleError(null);
  //     setGoogleLoading(true);
  //     const authUrl = await continueWithGoogle(redirectUri);
  //     window.location.replace(authUrl);
  //   } catch (err: any) {
  //     setGoogleError({ message: err.message, error: err });
  //     setGoogleLoading(false);
  //   }
  // };

  useEffect(() => {
    const token = Cookies.get("access_token");
    if (token) {
      router.push("/");
    }
  }, []);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const state = searchParams.get("state");
  //     const code = searchParams.get("code");

  //     if (state && code) {
  //       try {
  //         await handleGoogleCallback(state, code);
  //         const referrer = document.referrer || "/";
  //         router.replace(referrer);
  //       } catch (error) {
  //         setGoogleLoading(false);
  //       }
  //     }
  //   };

  //   fetchData();
  // }, [router]);

  return (
    <div className="relative min-h-screen bg-[#080710] flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="relative w-[400px] h-[520px] bg-white/10 backdrop-blur-md border border-white/10 shadow-lg rounded-lg p-8 flex flex-col items-center"
      >
        <h3 className="text-2xl font-medium text-white text-center">
          Log In Here
        </h3>
        <label
          htmlFor="username"
          className="w-full mt-6 text-sm text-white font-medium"
        >
          Enter Email
        </label>
        <input
          type="email"
          placeholder="Email"
          id="username"
          name="email"
          onChange={handleInputChange}
          className="w-full h-12 mt-2 bg-white/10 text-white rounded px-3 text-sm placeholder-gray-300 outline-none"
        />

        <label
          htmlFor="password"
          className="w-full mt-6 text-sm text-white font-medium"
        >
          Password
        </label>
        <input
          type="password"
          placeholder="Password"
          id="password"
          name="password"
          onChange={handleInputChange}
          className="w-full h-12 mt-2 bg-white/10 text-white rounded px-3 text-sm placeholder-gray-300 outline-none"
        />

        {/* {error && <p className="text-red-500 mt-2 text-sm">{error}</p>} */}
        {/* {googleError && (
          <div className="text-center text-red-500 mt-2">
            {googleError.message}
          </div>
        )} */}
        {/* <button
          type="submit"
          className="w-full mt-6 py-3 bg-white text-[#080710] rounded text-lg font-semibold hover:bg-gray-200 transition"
        >
          {loading || googleLoading ? "Loading..." : "Log In"}
        </button> */}

        {/* Google/Facebook login buttons */}
        {/* <div className="flex space-x-4 mt-8">
          <div
            onClick={continueWithGoogleAuth}
            className="flex items-center justify-center px-4 py-3 bg-white/25 text-white rounded hover:bg-white/40 transition cursor-pointer"
          >
            Google
          </div>
        </div> */}

        {/* <p className="mt-4 text-white">
          Don’t have an account?{" "}
          <Link href="/signup">
            <span className="text-red-500 underline font-bold">
              Create account
            </span>
          </Link>
        </p> */}
      </form>
    </div>
  );
};

export default SignIn;
