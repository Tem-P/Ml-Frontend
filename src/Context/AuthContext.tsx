import React, { useEffect } from "react";
// AuthContext.tsx

import { createContext, useContext, useState } from "react";
import { useNavigation } from "react-router-dom";
import { login, register } from "../helpers/apiHelpers/userApi";

interface AuthContextProps {
  isLoggedIn: boolean;
  loading: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  signup: (
    username: string,
    password: string,
    email: string,
    confirmPassword: string
  ) => Promise<void>;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext<AuthContextProps>({
  isLoggedIn: false,
  loading: false,
  setIsLoggedIn: () => {},
  login: () => Promise.resolve(),
  logout: () => {},
  signup: () => Promise.resolve(),
});

export const useAuth = (): Readonly<AuthContextProps> =>
  useContext(AuthContext);

export const AuthProvider = (props: AuthProviderProps) => {
  const { children } = props;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  // const navigate = useNavigation();
  const signin = async (username: string, password: string) => {
    setLoading(true);
    const { response, error } = await login({ username, password });
    if (error) {
      console.log(error);
      setLoading(false);
    }
    if (!response.data.error) {
      console.log(response.data);
      setLoading(false);
      localStorage.setItem("token", response.data.jwt);
      console.log("token set", response.data.jwt);
      setIsLoggedIn(true);
    } else {
      console.log("error", response.data.error);
      alert(response.data.error);
      setLoading(false);
    }
    setLoading(false);
  };

  const signup = async (
    username: string,
    password: string,
    email: string,
    confirmPassword: string
  ) => {
    setLoading(true);
    const { response, error } = await register({
      username,
      password,
      email,
      confirmPassword,
    });
    if (error) {
      console.log(error);
      setLoading(false);
    }
    if (!response.data.error) {
      console.log(response.data);
      setLoading(false);
      localStorage.setItem("token", response.data.jwt);
      console.log("token set", response.data.jwt);
      setIsLoggedIn(true);
    } else {
      console.log("error", response.data.error);
      alert(response.data.error);
      setLoading(false);
    }
    setLoading(false);
  };

  const userRef = React.useRef(false);

  // fetch token from local storage if it exists and set isLoggedIn to true if it does exist
  useEffect(() => {
    if (userRef.current) return;
    userRef.current = true;
    const token = localStorage.getItem("token");
    console.log(token);
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        login: signin,
        loading,
        logout,
        signup,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
