import { useState } from "react";
import { supabase } from "../services/supabase";
import { Alert } from "react-native";

export const useProfile = () => {
  const [profile, setProfile] = useState<any>(null);

  const fetchProfile = async (
    setLoading: (loading: boolean) => void,
    Alert: any
  ) => {
    try {
      setLoading(true);
      const session = await supabase.auth.getSession();
      if (!session?.data?.session?.user)
        throw new Error("No user on the session!");

      const { data, error } = await supabase
        .from("profiles")
        .select(`username, website, avatar_url, full_name`)
        .eq("id", session.data.session.user.id)
        .single();

      if (error) {
        throw error;
      }

      setProfile(data);
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return { profile, fetchProfile };
};

export const useDataDosen = (setLoading: (loading: boolean) => void) => {
  const [dosenData, setDosenData] = useState<any[]>([]);

  const fetchDataDosen = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("data_dosen")
        .select(`nidn, nama_dosen, alamat, tgl_lahir, jns_kelamin`)
        .order("created_at", { ascending: false });

      if (error) {
        throw error;
      }

      setDosenData(data);
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return { dosenData, fetchDataDosen };
};
