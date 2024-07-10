import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Alert,
  StatusBar,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { supabase } from "../services/supabase";
import TableHeaderDMataKuliah from "../components/crudmatkul/TableHeaderDMataKuliah";
import TableRowDMataKuliah from "../components/crudmatkul/TableRowDMataKuliah";

interface MataKuliah {
  nama_matkul: string;
  jml_sks: number;
  semester: number;
}

interface Dosen {
  nama_dosen: string;
  nidn: string;
  tgl_lahir: string;
  jns_kelamin: string;
  alamat: string;
}

const DMataKuliahScreen: React.FC = () => {
  const route = useRoute();
  const { nidn } = route.params as { nidn: string };
  const [mataKuliah, setMataKuliah] = useState<MataKuliah[]>([]);
  const [dosen, setDosen] = useState<Dosen | null>(null);

  const fetchMataKuliah = async () => {
    try {
      const { data, error } = await supabase
        .from("mata_kuliah")
        .select("id, nama_matkul, jml_sks, semester")
        .eq("nidn_dosen", nidn);

      if (error) {
        console.error("Error fetching mata kuliah:", error);
        throw error;
      }

      setMataKuliah(data || []);
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert("Error", error.message);
      }
    }
  };

  const fetchDosen = async () => {
    try {
      const { data, error } = await supabase
        .from("data_dosen")
        .select("nama_dosen, nidn, tgl_lahir, jns_kelamin, alamat")
        .eq("nidn", nidn)
        .single();

      if (error) {
        console.error("Error fetching dosen data:", error);
        throw error;
      }

      setDosen(data);
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert("Error", error.message);
      }
    }
  };

  const refreshData = () => {
    fetchMataKuliah();
    fetchDosen();
  };

  useEffect(() => {
    refreshData();
  }, [nidn]);

  return (
    <>
      <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          {dosen && (
            <View style={styles.dosenContainer}>
              <Text style={styles.dosenTitle}>Data Dosen</Text>
              <View style={styles.dosenDetail}>
                <Text style={styles.dosenLabel}>Nama</Text>
                <Text style={styles.dosenValue}>: {dosen.nama_dosen}</Text>
              </View>
              <View style={styles.dosenDetail}>
                <Text style={styles.dosenLabel}>NIDN</Text>
                <Text style={styles.dosenValue}>: {dosen.nidn}</Text>
              </View>
              <View style={styles.dosenDetail}>
                <Text style={styles.dosenLabel}>Tanggal Lahir</Text>
                <Text style={styles.dosenValue}>: {dosen.tgl_lahir}</Text>
              </View>
              <View style={styles.dosenDetail}>
                <Text style={styles.dosenLabel}>Jenis Kelamin</Text>
                <Text style={styles.dosenValue}>: {dosen.jns_kelamin}</Text>
              </View>
              <View style={styles.dosenDetail}>
                <Text style={styles.dosenLabel}>Alamat</Text>
                <Text style={styles.dosenValue}>: {dosen.alamat}</Text>
              </View>
            </View>
          )}
          <Text style={styles.title}>Mata Kuliah</Text>
          {mataKuliah.length > 0 ? (
            <View>
              <TableHeaderDMataKuliah />
              {mataKuliah.map((mk, index) => (
                <TableRowDMataKuliah
                  key={index}
                  item={mk}
                  nidn_dosen={nidn} // Menggunakan optional chaining
                  refreshData={refreshData}
                />
              ))}
            </View>
          ) : (
            <Text style={{ textAlign: "center", padding: 10 }}>
              Tidak ada mata kuliah yang ditemukan.
            </Text>
          )}
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
    paddingBottom: 20,
  },
  dosenContainer: {
    marginBottom: 20,
  },
  dosenTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  dosenDetail: {
    flexDirection: "row",
    marginBottom: 5,
  },
  dosenLabel: {
    fontSize: 16,
    width: 120, // Lebar tetap untuk label
    fontWeight: "bold",
  },
  dosenValue: {
    fontSize: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
});

export default DMataKuliahScreen;
