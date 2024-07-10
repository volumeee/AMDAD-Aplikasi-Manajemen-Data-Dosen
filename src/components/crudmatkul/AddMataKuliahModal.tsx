import React, { useState } from "react";
import { View, StyleSheet, Modal, Text, TextInput, Alert } from "react-native";
import { Button } from "react-native-paper";
import { supabase } from "../../services/supabase";

interface AddMataKuliahModalProps {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  nidn: string;
  refreshData: () => void;
}

const AddMataKuliahModal: React.FC<AddMataKuliahModalProps> = ({
  modalVisible,
  setModalVisible,
  nidn,
  refreshData,
}) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nama_matkul: "",
    jml_sks: "",
    semester: "",
  });

  const handleInputChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAddMataKuliah = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.from("mata_kuliah").insert([
        {
          nama_matkul: formData.nama_matkul,
          jml_sks: parseInt(formData.jml_sks),
          semester: parseInt(formData.semester),
          nidn_dosen: nidn,
        },
      ]);

      if (error) {
        throw error;
      }

      Alert.alert("Success", "Mata kuliah added successfully!");
      setModalVisible(false);
      refreshData();
      setFormData({
        nama_matkul: "",
        jml_sks: "",
        semester: "",
      });
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert("Error", error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.modalContainer}>
        <Text style={styles.modalTitle}>Tambah Mata Kuliah</Text>
        <TextInput
          style={styles.input}
          placeholder="Nama Mata Kuliah"
          value={formData.nama_matkul}
          onChangeText={(text) => handleInputChange("nama_matkul", text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Jumlah SKS"
          keyboardType="numeric"
          value={formData.jml_sks}
          onChangeText={(text) => handleInputChange("jml_sks", text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Semester"
          keyboardType="numeric"
          value={formData.semester}
          onChangeText={(text) => handleInputChange("semester", text)}
        />
        <View style={styles.buttonContainer}>
          <Button
            mode="contained"
            onPress={handleAddMataKuliah}
            loading={loading}
            style={styles.button}
          >
            Tambah
          </Button>
          <Button
            mode="contained"
            onPress={() => setModalVisible(false)}
            style={[styles.button, styles.cancelButton]}
          >
            Batal
          </Button>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
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
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: "gray",
  },
});

export default AddMataKuliahModal;
