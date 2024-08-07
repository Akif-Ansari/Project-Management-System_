import React, { ReactNode, createContext, useContext, useState } from "react";

const AuthContext = createContext<any>(null);

interface AuthContextProviderProps {
  children: ReactNode;
}

const AuthContextProvider: React.FC<AuthContextProviderProps> = ({
  children,
}) => {
  const [user, setUser] = useState<any>(null);
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [settings, setSettings] = useState<any>(null);
  return (
    <AuthContext.Provider
      value={{ user, isLogin, settings, setUser, setIsLogin, setSettings }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  return useContext(AuthContext);
}

export default AuthContextProvider;
