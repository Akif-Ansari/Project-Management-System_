import React, { useState } from "react";
import ConfirmButton from "../common/ConfirmButton";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase/firebaseConfig";
import { setDoc, doc } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";

const SignUp = ({ handleChange }: { handleChange: (x: string) => void }) => {
  const [name, setName] = useState<string>("");
  const [pass, setPass] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [confirmPass, setConfirmPass] = useState<string>("");

  const handleRegister = async (e: any) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, pass);
      const user = auth.currentUser;
      console.log(user);
      if (user) {
        await setDoc(doc(db, "User", user.uid), {
          id: user.uid,
          email: user.email,
          userName: name,
          password: pass,
        });
      }
      console.log("userRegistered successfully");
      toast.success("User registered successfully!", {
        position: "top-center",
      });
    } catch (error: any) {
      console.log(error);
      toast.error(error.message, {
        position: "bottom-center",
      });
    }
  };
  return (
    <>
      <section
        style={{ boxShadow: "0 -5px 30px rgba(0,0,0,0.1)" }}
        className="w-[400px] bg-white shadow-xl flex flex-col items-center gap-y-4 px-8 py-12 rounded-2xl"
      >
        <h1 className="text-2xl font-bold text-black/60">signup</h1>
        <input
          type="text"
          value={name}
          onChange={(e: any) => setName(e.target.value)}
          placeholder="username"
          className="w-full outline-none border border-gray/50 px-6 py-2 mt-4 rounded-md"
        />
        <input
          type="Enter your email"
          value={email}
          onChange={(e: any) => setEmail(e.target.value)}
          placeholder="email"
          className="w-full outline-none border border-gray/50 px-6 py-2 rounded-md"
        />
        <input
          type="password"
          value={pass}
          onChange={(e: any) => setPass(e.target.value)}
          placeholder="password"
          className="w-full outline-none border border-gray/50 px-6 py-2 rounded-md"
        />
        <input
          type="password"
          value={confirmPass}
          onChange={(e: any) => setConfirmPass(e.target.value)}
          placeholder="confirm password"
          className="w-full outline-none border border-gray/50 px-6 py-2 rounded-md"
        />
        <ConfirmButton
          isLoading={false}
          value="Confirm"
          handleClick={handleRegister}
        />
        <span className="mt-6 text-black/50">
          Already have an Account ?
          <span
            className="text-blue-500 cursor-pointer"
            onClick={() => handleChange("signup")}
          >
            &nbsp;Login
          </span>
        </span>
      </section>
    </>
  );
};

export default SignUp;
