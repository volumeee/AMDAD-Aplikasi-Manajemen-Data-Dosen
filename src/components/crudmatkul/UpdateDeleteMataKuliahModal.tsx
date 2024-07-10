import React, { useEffect, useState } from "react";
import { View, StyleSheet, Modal, Alert, ScrollView } from "react-native";
import { TextInput, Button, Text, useTheme } from "react-native-paper";
import { supabase } from "../../services/supabase";

interface UpdateDeleteMataKuliahModalProps {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  mataKuliah: any;
  nidn_dosen: string;
  refreshData: () => void;
}

const UpdateDeleteMataKuliahModal: React.FC<
  UpdateDeleteMataKuliahModalProps
> = ({
  modalVisible,
  setModalVisible,
  mataKuliah,
  nidn_dosen,
  refreshData,
}) => {
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nama_matkul: mataKuliah.nama_matkul,
    jml_sks: mataKuliah.jml_sks,
    semester: mataKuliah.semester,
  });

  useEffect(() => {
    console.log("Mata Kuliah:", mataKuliah);
  }, [mataKuliah]);

  const handleInputChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleUpdate = async () => {
    try {
      setLoading(true);
      console.log("Updating mata kuliah with nidn_dosen:", nidn_dosen);
      const { data, error } = await supabase
        .from("mata_kuliah")
        .update(formData)
        .eq("id", mataKuliah.id);

      if (error) {
        console.error("Update error:", error);
        throw error;
      }

      console.log("Update successful:", data);
      Alert.alert("Success", "Mata kuliah has been updated successfully!");
      setModalVisible(false);
      refreshData();
    } catch (error) {
      if (error instanceof Error) {
        console.error("Update exception:", error.message);
        Alert.alert("Error", error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      setLoading(true);
      console.log("Deleting mata kuliah with nidn_dosen:", nidn_dosen);
      const { error } = await supabase
        .from("mata_kuliah")
        .delete()
        .eq("id", mataKuliah.id);

      if (error) {
        console.error("Delete error:", error);
        throw error;
      }

      console.log("Delete successful");
      Alert.alert("Success", "Mata kuliah has been deleted successfully!");
      setModalVisible(false);
      refreshData();
    } catch (error) {
      if (error instanceof Error) {
        console.error("Delete exception:", error.message);
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
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Update/Delete Mata Kuliah</Text>
          <TextInput
            label="Nama Mata Kuliah"
            value={formData.nama_matkul}
            onChangeText={(text) => handleInputChange("nama_matkul", text)}
            style={styles.input}
          />
          <TextInput
            label="Jumlah SKS"
            value={formData.jml_sks.toString()}
            onChangeText={(text) => handleInputChange("jml_sks", text)}
            style={styles.input}
            keyboardType="numeric"
          />
          <TextInput
            label="Semester"
            value={formData.semester.toString()}
            onChangeText={(text) => handleInputChange("semester", text)}
            style={styles.input}
            keyboardType="numeric"
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
              onPress={() => setModalVisible(false)}
              style={[styles.button, styles.cancelButton]}
            >
              Cancel
            </Button>
          </View>
        </View>
      </ScrollView>
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
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
  },
  deleteButton: {
    backgroundColor: "red",
  },
  cancelButton: {
    backgroundColor: "gray",
  },
});

export default UpdateDeleteMataKuliahModal;
