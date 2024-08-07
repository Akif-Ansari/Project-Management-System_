import React, {
  ReactNode,
  useEffect,
  createContext,
  useContext,
  useState,
} from "react";
import { User, getAuth, onAuthStateChanged } from "firebase/auth";
import { app, auth } from "../components/firebase/firebaseConfig";
const AuthContext = createContext<User | any>(null);

interface AuthContextProviderProps {
  children: ReactNode;
}

const AuthContextProvider: React.FC<AuthContextProviderProps> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [settings, setSettings] = useState<any>(null);
  const [isLoading, setIsloading] = useState<boolean>(true);
  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setIsloading(false);
    });

    return () => unsubscribe();
  }, [auth]);
  return (
    <AuthContext.Provider
      value={{
        user,
        isLogin,
        settings,
        isLoading,
        setUser,
        setIsLogin,
        setSettings,
        setIsloading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  return useContext(AuthContext);
}

export default AuthContextProvider;
