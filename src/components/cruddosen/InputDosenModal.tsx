import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Modal,
  Text,
  TextInput,
  Alert,
  TouchableOpacity,
} from "react-native";
import { Button, ActivityIndicator } from "react-native-paper";
import { supabase } from "../../services/supabase";
import { ScrollView } from "react-native";

interface InputDosenModalProps {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  refreshData: () => void;
}

const InputDosenModal: React.FC<InputDosenModalProps> = ({
  modalVisible,
  setModalVisible,
  refreshData,
}) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nidn: "",
    nama_dosen: "",
    tgl_lahir: "",
    jns_kelamin: "",
    alamat: "",
  });
  const [genderModalVisible, setGenderModalVisible] = useState(false);

  const handleInputChange = (name: string, value: string) => {
    if (name === "nidn" && value.length > 10) {
      return; // Batasi panjang NIDN hingga 10 karakter
    }
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const formatTanggalLahir = (value: string) => {
    const cleaned = value.replace(/[^0-9]/g, "");
    const match = cleaned.match(/^(\d{4})(\d{2})(\d{2})$/);
    if (match) {
      return `${match[1]}-${match[2]}-${match[3]}`;
    }
    return value;
  };

  const handleTanggalLahirChange = (value: string) => {
    const formattedValue = formatTanggalLahir(value);
    setFormData({
      ...formData,
      tgl_lahir: formattedValue,
    });
  };

  const handleSave = async () => {
    try {
      setLoading(true);

      const { data, error } = await supabase
        .from("data_dosen")
        .insert([formData]);

      if (error) {
        throw error;
      }

      Alert.alert("Success", "Data has been saved successfully!");
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

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Input Data Dosen</Text>
          <TextInput
            style={styles.input}
            placeholder="NIDN"
            value={formData.nidn}
            onChangeText={(text) => handleInputChange("nidn", text)}
            keyboardType="numeric"
            maxLength={10} // Batasi input hanya sampai 10 karakter
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
            onChangeText={(text) => handleTanggalLahirChange(text)}
            keyboardType="numeric"
          />
          <TouchableOpacity
            style={styles.input}
            onPress={() => setGenderModalVisible(true)}
          >
            <Text style={{ color: formData.jns_kelamin ? "black" : "gray" }}>
              {formData.jns_kelamin || "Jenis Kelamin"}
            </Text>
          </TouchableOpacity>
          <Modal
            animationType="slide"
            transparent={true}
            visible={genderModalVisible}
            onRequestClose={() => setGenderModalVisible(false)}
          >
            <View style={styles.genderModalContainer}>
              <View style={styles.genderModal}>
                <Button
                  onPress={() => {
                    setFormData({ ...formData, jns_kelamin: "Laki-laki" });
                    setGenderModalVisible(false);
                  }}
                >
                  Laki-laki
                </Button>
                <Button
                  onPress={() => {
                    setFormData({ ...formData, jns_kelamin: "Perempuan" });
                    setGenderModalVisible(false);
                  }}
                >
                  Perempuan
                </Button>
              </View>
            </View>
          </Modal>
          <TextInput
            style={styles.input}
            placeholder="Alamat"
            value={formData.alamat}
            onChangeText={(text) => handleInputChange("alamat", text)}
          />
          <View style={styles.buttonContainer}>
            <Button
              mode="contained"
              onPress={handleSave}
              loading={loading}
              style={styles.button}
            >
              Save
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
    justifyContent: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: "gray",
  },
  genderModalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  genderModal: {
    width: 200,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
});

export default InputDosenModal;
