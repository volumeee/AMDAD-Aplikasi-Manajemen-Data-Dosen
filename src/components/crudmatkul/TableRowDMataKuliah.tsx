import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import UpdateDeleteMataKuliahModal from "./UpdateDeleteMataKuliahModal";

interface TableRowProps {
  item: any;
  nidn_dosen: string;
  refreshData: () => void;
}

const TableRowDMataKuliah: React.FC<TableRowProps> = ({
  item,
  nidn_dosen,
  refreshData,
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <>
      <TouchableOpacity onPress={toggleModal} style={styles.touchable}>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>{item.nama_matkul}</Text>
          <Text style={styles.tableCell}>{item.jml_sks}</Text>
          <Text style={styles.tableCell}>{item.semester}</Text>
        </View>
      </TouchableOpacity>
      <UpdateDeleteMataKuliahModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        mataKuliah={item}
        nidn_dosen={nidn_dosen}
        refreshData={refreshData}
      />
    </>
  );
};

const styles = StyleSheet.create({
  touchable: {
    zIndex: 1,
  },
  tableRow: {
    flexDirection: "row",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  tableCell: {
    width: "33%",
    textAlign: "center",
  },
});

export default TableRowDMataKuliah;
