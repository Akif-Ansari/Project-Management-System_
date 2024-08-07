import React, { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { IoEyeOff, IoEye } from "react-icons/io5";
import ConfirmButton from "../common/ConfirmButton";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase/firebaseConfig";
import { toast } from "react-toastify";
import { useAuth } from "../../contexts/AuthContextProvider";
import { doc, getDoc } from "firebase/firestore";
import { Navigate } from "react-router-dom";

const Login = ({ handleChange }: { handleChange: (x: string) => void }) => {
  const [email, setEmail] = useState<string>("");
  const [pass, setPass] = useState<string>("");
  const [isPass, setIsPass] = useState<boolean>(true);
  const { isLogin, setIsLogin, setUser } = useAuth();
  const handleConfirm = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, pass);
      setIsLogin(true);
      auth.onAuthStateChanged(async (user) => {
        if (user?.uid) {
          const docRef = doc(db, "User", user?.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setUser(docSnap.data());
            console.log(docSnap.data());
          }
        }
      });
      setUser();
      console.log("User logged successfully!");
      toast.success("User logged successfully!!");
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <>
      {isLogin && <Navigate to={"/dashboard"} />}
      <section
        style={{ boxShadow: "0 -5px 30px rgba(0,0,0,0.1)" }}
        className="w-[400px] bg-white shadow-xl flex flex-col items-center px-8 py-12 rounded-2xl"
      >
        <h1 className="text-2xl font-bold text-black/60">Login</h1>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="w-full outline-none border border-gray/50 mt-8 px-6 py-2 rounded-md"
        />
        <div className="relative w-full mt-4">
          <input
            type={isPass ? "password" : "text"}
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            placeholder="Enter your password"
            className="w-full outline-none border border-gray/50 px-6 py-2 rounded-md"
          />
          <span
            onClick={() => setIsPass((prev) => !prev)}
            className="absolute top-1/2 -translate-y-1/2 right-5"
          >
            {isPass ? (
              <IoEyeOff className="text-xl cursor-pointer text-black/80" />
            ) : (
              <IoEye className="text-xl cursor-pointer text-black/80" />
            )}
          </span>
        </div>
        <ConfirmButton
          isLoading={false}
          value="Confirm"
          handleClick={handleConfirm}
          className="mt-4"
        />
        <span className="mt-4 text-black/50">
          Don't have an account?
          <span
            onClick={() => handleChange("signup")}
            className="text-blue-500 cursor-pointer"
          >
            &nbsp;Signup
          </span>
        </span>
        <div className="flex w-full gap-x-4 items-center justify-between mt-6">
          <span className="w-full border"></span>
          <span className="text-base">Or</span>
          <span className="w-full border"></span>
        </div>
        <button className="mt-8 flex items-center gap-x-2 text-base">
          <FaGoogle /> Continue with Google
        </button>
      </section>
    </>
  );
};

export default Login;
