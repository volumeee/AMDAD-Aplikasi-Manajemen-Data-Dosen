import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import UpdateDosenModal from "./UpdateDeleteDosenModal";

interface TableRowProps {
  item: any;
  refreshData: () => void;
}

const TableRow: React.FC<TableRowProps> = ({ item, refreshData }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <>
      <TouchableOpacity onPress={toggleModal} style={styles.touchable}>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>{item.nidn}</Text>
          <Text style={styles.tableCellNama}>{item.nama_dosen}</Text>
          <Text style={styles.tableCell}>{item.alamat}</Text>
          <Text style={styles.tableCell}>{item.tgl_lahir}</Text>
          <Text style={styles.tableCell}>{item.jns_kelamin}</Text>
        </View>
      </TouchableOpacity>
      <UpdateDosenModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        dosen={item}
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
    width: "20%",
    textAlign: "center",
  },
  tableCellNama: {
    width: "20%",
    textAlign: "left",
  },
});

export default TableRow;
