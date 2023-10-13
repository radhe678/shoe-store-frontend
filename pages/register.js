import React, { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { auth } from "../firebase/firebase";
import {
  createUserWithEmailAndPassword,
  updateProfile,
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

const RegisterForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { authUser, isLoading, setAuthUser } = useAuth();

  const router = useRouter();

  useEffect(() => {
    if (!isLoading && authUser) {
      router.push("/login");
    }
  }, [authUser, isLoading]);

  const signupHandler = async () => {
    if (!email || !username || !password) return;
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(auth.currentUser, {
        displayName: username,
      });
      setAuthUser({
        uid: user.uid,
        email: user.email,
        username,
      })
      console.log(user);
      notify();
    } catch (error) {
      console.error("An error occurred", error);
    }
  };

  const signInWithGoogle = async () => {
    try {
      const user = await signInWithPopup(auth, provider);
      console.log(user);
    } catch (error) {
      console.error("An error occurred", error);
    }
  };

  const notify = () => {
    toast.success("Sign Up Success!", {
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
    <main className="flex bg-gray-100 h-screen">
      <ToastContainer />
      <div className="w-full p-8 md:p-14 flex items-center justify-center mb-20">
        <div className="p-8 max-w-screen-md mx-auto">
          <h1 className="text-4xl font-semibold mb-3">Sign Up</h1>
          <p className="mb-6">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-blue-500 cursor-pointer hover:underline"
            >
              Login
            </Link>
          </p>

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
              <label className="text-gray-700">Name</label>
              <input
                type="text"
                className="border-b border-black p-2 outline-none focus:border-blue-400 w-full rounded-lg"
                required
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mt-4">
              <label className="text-gray-700">Email</label>
              <input
                type="email"
                className="border-b border-black p-2 outline-none focus:border-blue-400 w-full rounded-lg"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mt-4">
              <label className="text-gray-700">Password</label>
              <input
                type="password"
                className="border-b border-black p-2 outline-none focus:border-blue-400 w-full rounded-lg"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              className="bg-black text-white w-36 py-2 mt-6 ml-16 rounded-full transition-transform hover:bg-black/80 active:scale-90"
              onClick={signupHandler}
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default RegisterForm;
