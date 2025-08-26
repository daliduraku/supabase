import { createContext, useState, useContext, useEffect } from "react";
import supabase from "../src/supabase-client";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  // Session state (user info, sign-in status)
  const [session, setSession] = useState(undefined);

  useEffect(() => {
    //1) check on 1st render for a session (getSession())
    getInitialSession();
    //2) Listen for changes in auth state(.onauthstatechange())
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      console.log("Session changed:", session);
    });
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
  const signInUser = async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.toLowerCase(),
        password: password,
      });
      if (error) {
        console.error("Supabase sign-in error:", error.message);
        return { success: false, error: error.message };
      }
      console.log("Supabase sign-in success:", data);
      return { success: true, data };
    } catch (error) {
      //Unexpected error
      console.error("Unexpected error during sign-in:", error.message);
      return {
        success: false,
        error: "An unexpected error occurred. Please try again.",
      };
    }
  };

  // signout
  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        console.error("Supabase sign-out error:", error.message);
        return { success: false, error: error.message };
      }
      return { success: true, error: null };
    } catch (error) {
      console.error("Unexpected error during sign-out:", error.message);
      return {
        success: false,
        error: "An unexpected error occured. Please try again.",
      };
    }
  };

  return (
    <AuthContext.Provider value={{ session, signInUser, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
