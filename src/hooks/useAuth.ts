import { useState, useEffect } from "react";
import { supabase } from "../services/supabase";
import { Session } from "@supabase/supabase-js";

export function useAuth() {
  const [session, setSession] = useState<Session | null>(null);
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setSession(session);
      setEmail(session?.user?.email || null);
      console.log("Initial session:", session);
    };

    getSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setEmail(session?.user?.email || null);
        console.log("Auth state changed:", session);
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handleLoginSuccess = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    setSession(session);
    setEmail(session?.user?.email || null);
    console.log("Login success, session:", session);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setSession(null);
    setEmail(null);
    console.log("User logged out, session:", null);
  };

  return {
    session,
    email,
    handleLoginSuccess,
    handleLogout,
  };
}
