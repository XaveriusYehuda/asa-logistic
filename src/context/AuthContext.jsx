import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  login as apiLogin,
  logout as apiLogout,
  getProfile,
  signup as apiRegister,
} from "../api/authApi";

import { Navigate } from "react-router-dom";
import Popup from "../component/popup";

const AuthContext = createContext();

export function AuthProvider({
  children,
}) {
  const [user, setUser] = useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    async function checkAuth() {
      try {
        const data =
          await getProfile();

        setUser(data.user);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    checkAuth();
  }, []);

  const login = async (
    email,
    password
  ) => {
    await apiLogin(email, password);

    const profile = await getProfile();
    console.log("Data dari backend:", profile.user);

    setUser(profile.user);
    return profile.user;
  };

  const register = async (username, email, password) => {
    try {
      await apiRegister(username, email, password);
      return {
        message: apiRegister.message || "Pendaftaran akun berhasil! Silahkan login dulu"
      };
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || "Terjadi kesalahan saat mendaftar";
      throw new Error(errorMessage);  
    }
  };

  const logout = async () => {
    try {
      await apiLogout();
      setUser(null);
      return {
        message: apiLogout.message || "Logout berhasil"
      };
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || "Gagal logout";
      throw new Error(errorMessage);
    }
    
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);