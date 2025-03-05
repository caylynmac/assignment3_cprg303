import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, FlatList, Modal, TouchableOpacity, Keyboard, TouchableWithoutFeedback } from "react-native";

const CallAPI = () => {

  const API_HOST = "numbersapi.p.rapidapi.com";
  const API_KEY = '99c85be0cbmshb0b3748f7be764ap1c3a4cjsn3f655d33ed04';

  const [month, setMonth] = useState<null | String>("");
  const [day, setDay] = useState<null | String>("");
  const [error, setError] = useState<null | Error>(null);
  const [data, setData] = useState<any>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMonthLabel, setSelectedMonthLabel] = useState("Select a month");

  useEffect(() => {
    if (month && day) {
      fetchFact();
    }
  }, [month, day]);

  const fetchFact = async () => {
    const url = `https://numbersapi.p.rapidapi.com/${month}/${day}/date`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': API_KEY,
            'x-rapidapi-host': API_HOST,
        },
    };

    try {
        const response = await fetch(url, options);
        const result = await response.text();
        setData(result);
        console.log(result);
    } catch (error) {
        setError(error as Error);
        console.error(error);
    }
  };

  const months = [
    { label: "January", value: "1" },
    { label: "February", value: "2" },
    { label: "March", value: "3" },
    { label: "April", value: "4" },
    { label: "May", value: "5" },
    { label: "June", value: "6" },
    { label: "July", value: "7" },
    { label: "August", value: "8" },
    { label: "September", value: "9" },
    { label: "October", value: "10" },
    { label: "November", value: "11" },
    { label: "December", value: "12" },
  ];

  // if loading display loading, error, etc.
  // used <Modal> + <FlatList> to display months as menu
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Date Fun Facts</Text>
      
      <Text style={styles.factText}>
        {data ? data : "Enter a date to get a fact!"}
      </Text>

      <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
        <Text style={styles.buttonText}>{selectedMonthLabel}</Text>
      </TouchableOpacity>

      <Modal transparent={true} visible={modalVisible} animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select a Month</Text>
            <FlatList
              data={months}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.listItem}
                  onPress={() => {
                    setMonth(item.value);
                    setSelectedMonthLabel(item.label);
                    setModalVisible(false);
                  }}
                >
                  <Text style={styles.listText}>{item.label}</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={{flex: 1}}>
          <TextInput
            style={styles.input}
            placeholder="Enter Day"
            keyboardType="numeric"
            maxLength={2}
            onChangeText={(text) => setDay(text)}
          />
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    paddingTop: 20,  
  },
  factText: {
    fontSize: 16,
    justifyContent: "center",
    textAlign: "center",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    margin: 20,
  },
  button: {
    padding: 12,
    backgroundColor: "#007bff",
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 10,
    width: 200,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  input: {
    width: 200,
    padding: 12,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    textAlign: "center",
    backgroundColor: "#fff",
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: 320,
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  listItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    width: "100%",
    alignItems: "center",
  },
  listText: {
    fontSize: 16,
    color: "#333",
  },
  closeButton: {
    marginTop: 10,
    padding: 12,
    backgroundColor: "#ff4d4d",
    borderRadius: 8,
    alignItems: "center",
    width: 100,
  },
  closeButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default CallAPI;