import React from "react";
import { View, Text, StyleSheet } from "react-native";

const TableHeaderDDosen: React.FC = () => {
  return (
    <View style={styles.tableContainer}>
      <View style={styles.headItemContainer}>
        <View style={styles.headItemRow}>
          <Text>NIDN</Text>
        </View>
        <View style={styles.headItemRow}>
          <Text>Nama Dosen</Text>
        </View>
        <View style={styles.headItemRow}>
          <Text>Alamat</Text>
        </View>
        <View style={styles.headItemRow}>
          <Text>Tgl Lahir</Text>
        </View>
        <View style={styles.headItemRow}>
          <Text>Jenis Kelamin</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tableContainer: {
    width: "90%",
    marginTop: 15,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 10,
  },
  headItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    borderWidth: 1,
    borderColor: "#cfcfcf",
    backgroundColor: "#e8e8e8",
    borderRadius: 20,
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 2,
  },
  headItemRow: {
    width: "20%",
    alignItems: "center",
  },
});

export default TableHeaderDDosen;
