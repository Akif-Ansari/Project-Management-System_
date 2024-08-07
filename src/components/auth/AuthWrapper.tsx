import { useState } from "react";
import Login from "./Login";
import SignUp from "./Signup";

const AuthWrapper = () => {
  const [auth, setAuth] = useState<string>("signup");
  const handleAuth = () => {
    if (auth === "login") setAuth("signup");
    else setAuth("login");
  };
  return (
    <section className="container px-12 pt-12 min-h-screen mx-auto">
      <div className="flex  w-full items-center justify-end">
        {/* Login signup buttons */}
        <button
          onClick={handleAuth}
          className="px-12 py-2 text-base font-bold text-white bg-blue-500 rounded-md"
        >
          {auth}
        </button>
      </div>
      {/* Auth form */}
      <div className="w-full h-full mt-20 flex items-center justify-center">
        {auth === "signup" ? (
          <Login handleChange={handleAuth} />
        ) : (
          <SignUp handleChange={handleAuth} />
        )}
      </div>
    </section>
  );
};

export default AuthWrapper;
