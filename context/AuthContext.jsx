import { createContext, useState, useContext, useEffect } from "react";
import supabase from "../src/supabase-client";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  // Session state (user info, sign-in status)
  const [session, setSession] = useState(undefined);

  //1) check on 1st render for a session (getSession())

  //2) Listen for changes in auth state

  useEffect(() => {
    getInitialSession();
  }, []);

  async function getInitialSession() {
    try {
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        throw error;
      }

      console.log(data.session);
      setSession(data.session);
    } catch (error) {
      console.error("Error to get initial session", error.message);
    }
  }
  // Auth functions (signin, signup, logout)

  return (
    <AuthContext.Provider value={{ session }}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
