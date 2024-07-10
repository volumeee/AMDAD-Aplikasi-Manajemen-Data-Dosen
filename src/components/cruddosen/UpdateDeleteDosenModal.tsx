import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  StyleSheet,
  Modal,
  Text,
  TextInput,
  Alert,
  ScrollView,
} from "react-native";
import { Button } from "react-native-paper";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { supabase } from "../../services/supabase";
import { RootStackParamList } from "../../types/types"; // Import the defined types
import AddMataKuliahModal from "../crudmatkul/AddMataKuliahModal";
import TableHeaderDMataKuliah from "../crudmatkul/TableHeaderDMataKuliah";
import TableRowDMataKuliah from "../crudmatkul/TableRowDMataKuliah";

interface UpdateDosenModalProps {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  dosen: any;
  refreshData: () => void;
}

interface MataKuliah {
  nama_matkul: string;
  jml_sks: number;
  semester: number;
}

const UpdateDosenModal: React.FC<UpdateDosenModalProps> = ({
  modalVisible,
  setModalVisible,
  dosen,
  refreshData,
}) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nidn: dosen.nidn,
    nama_dosen: dosen.nama_dosen,
    tgl_lahir: dosen.tgl_lahir,
    jns_kelamin: dosen.jns_kelamin,
    alamat: dosen.alamat,
  });
  const [mataKuliah, setMataKuliah] = useState<MataKuliah[]>([]);
  const [addMataKuliahModalVisible, setAddMataKuliahModalVisible] =
    useState(false);

  const fetchMataKuliah = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from("mata_kuliah")
        .select("id, nama_matkul, jml_sks, semester")
        .eq("nidn_dosen", dosen.nidn);

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
  }, [dosen.nidn]);

  useEffect(() => {
    if (modalVisible) {
      fetchMataKuliah();
    }
  }, [modalVisible, fetchMataKuliah]);

  const handleInputChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleUpdate = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("data_dosen")
        .update(formData)
        .eq("nidn", dosen.nidn);

      if (error) {
        throw error;
      }

      Alert.alert("Success", "Data dosen has been updated successfully!");
      setModalVisible(false);
      refreshData();
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert("Error", error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      setLoading(true);
      const { error } = await supabase
        .from("data_dosen")
        .delete()
        .eq("nidn", dosen.nidn);

      if (error) {
        throw error;
      }

      Alert.alert("Success", "Data dosen has been deleted successfully!");
      setModalVisible(false);
      refreshData();
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert("Error", error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleNavigate = () => {
    navigation.navigate("DMataKuliahScreen", { nidn: dosen.nidn });
  };

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Update Data Dosen</Text>
          <TextInput
            style={styles.input}
            placeholder="NIDN"
            value={[formData.nidn].toString()}
            onChangeText={(text) => handleInputChange("nidn", text)}
            editable={false} // NIDN should not be editable
          />
          <TextInput
            style={styles.input}
            placeholder="Nama Dosen"
            value={formData.nama_dosen}
            onChangeText={(text) => handleInputChange("nama_dosen", text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Tanggal Lahir"
            value={formData.tgl_lahir}
            onChangeText={(text) => handleInputChange("tgl_lahir", text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Jenis Kelamin"
            value={formData.jns_kelamin}
            onChangeText={(text) => handleInputChange("jns_kelamin", text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Alamat"
            value={formData.alamat}
            onChangeText={(text) => handleInputChange("alamat", text)}
          />
          <View style={styles.buttonContainer}>
            <Button
              mode="contained"
              onPress={handleUpdate}
              loading={loading}
              style={styles.button}
            >
              Update
            </Button>
            <Button
              mode="contained"
              onPress={handleDelete}
              loading={loading}
              style={[styles.button, styles.deleteButton]}
            >
              Delete
            </Button>
            <Button
              mode="contained"
              onPress={handleNavigate}
              style={[styles.button, styles.navigateButton]}
            >
              Lihat Mata Kuliah
            </Button>
            <Button
              mode="contained"
              onPress={() => setModalVisible(false)}
              style={[styles.button, styles.cancelButton]}
            >
              Cancel
            </Button>
          </View>
          <View style={styles.mataKuliahContainer}>
            <Text style={styles.mataKuliahTitle}>Mata Kuliah yang Diajar</Text>

            {mataKuliah.length > 0 ? (
              <View>
                <TableHeaderDMataKuliah />
                {mataKuliah.map((mk, index) => (
                  <TableRowDMataKuliah
                    key={index}
                    item={mk}
                    nidn_dosen={dosen.nidn} // Menggunakan optional chaining
                    refreshData={fetchMataKuliah}
                  />
                ))}
              </View>
            ) : (
              <Text style={{ textAlign: "center", padding: 10 }}>
                Tidak ada mata kuliah yang ditemukan.
              </Text>
            )}
            <Button
              mode="contained"
              onPress={() => setAddMataKuliahModalVisible(true)}
              style={[styles.button, styles.addButton]}
            >
              Tambah Mata Kuliah
            </Button>
          </View>
        </View>
      </ScrollView>
      <AddMataKuliahModal
        modalVisible={addMataKuliahModalVisible}
        setModalVisible={setAddMataKuliahModalVisible}
        nidn={dosen.nidn}
        refreshData={() => {
          fetchMataKuliah();
          setAddMataKuliahModalVisible(false);
        }}
      />
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    height: 50,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
    flexWrap: "wrap",
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
    marginVertical: 5,
  },
  deleteButton: {
    backgroundColor: "red",
  },
  navigateButton: {
    backgroundColor: "blue",
  },
  cancelButton: {
    backgroundColor: "gray",
  },
  mataKuliahContainer: {
    marginTop: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 10,
  },
  mataKuliahTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  addButton: {
    backgroundColor: "green",
    marginTop: 10,
  },
});

export default UpdateDosenModal;
