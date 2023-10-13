import React, { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { auth } from "../firebase/firebase";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import { useAuth } from "@/firebase/auth";
import { useRouter } from "next/router";
import Loader from "@/components/Loader";

const provider = new GoogleAuthProvider();

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const { authUser, isLoading } = useAuth();

  const router = useRouter();

  useEffect(() => {
    if (!isLoading && authUser) {
      router.push("/");
    }
  }, [authUser, isLoading]);

  const loginHandler = async () => {
    if (!email || !password) {
      setErrorMessage("Please enter both email and password.");
      return;
    }
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      console.log(user);
      notify("Login Success!");
    } catch (error) {
      setErrorMessage("Login failed. Please Signup first.");
      console.error("An error occurred", error);
    }
  };

  const signInWithGoogle = async () => {
    try {
      const user = await signInWithPopup(auth, provider);
      console.log(user);
      notify("Login Success!");
    } catch (error) {
      setErrorMessage("Login with Google failed. Please try again.");
      console.error("An error occurred", error);
    }
  };

  const notify = (message) => {
    toast.success(message, {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  return isLoading || (!isLoading && authUser) ? (
    <Loader />
  ) : (
    <main className="flex lg:h-screen bg-gray-100">
      <ToastContainer />
      <div className="w-full  p-8 md:p-14 flex items-center justify-center mb-20">
        <div className="p-8 max-w-screen-md mx-auto">
          <h1 className="text-4xl font-semibold mb-4">Login</h1>
          <p className="mb-6">
            Don't have an account?{" "}
            <Link
              href="/register"
              className="text-blue-500 cursor-pointer hover:underline"
            >
              Sign Up
            </Link>
          </p>

          {errorMessage && (
            <div className="bg-red-100 border border-red-400 text-red-700 py-2 px-4 rounded-md mb-4">
              {errorMessage}
            </div>
          )}

          <div
            className="bg-black/10 text-white w-full py-2 mt-6 rounded-full transition-transform hover:bg-black/80 active:scale-90 flex justify-center items-center gap-4 cursor-pointer group"
            onClick={signInWithGoogle}
          >
            <FcGoogle size={22} />
            <span className="font-medium text-black group-hover:text-white">
              Login with Google
            </span>
          </div>

          <form onSubmit={(e) => e.preventDefault()} className="mt-6">
            <div className="mt-4">
              <label className="text-gray-700">Email</label>
              <input
                type="email"
                className="border-b border-black p-2 outline-none focus:border-blue-500 w-full rounded-lg"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mt-4">
              <label className="text-gray-700">Password</label>
              <input
                type="password"
                className="border-b border-black p-2 outline-none focus:border-blue-500 w-full rounded-lg"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              className="bg-black text-white w-36 py-2 mt-6 ml-16 rounded-full transition-transform hover:bg-black/80 active:scale-90"
              onClick={loginHandler}
            >
              Sign in
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default LoginForm;
