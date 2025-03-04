import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";

const CallAPI = () => {

    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<null | Error>(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);

            //api call with key from website, not implemented yet!!

            const url = 'https://numbersapi.p.rapidapi.com/6/21/date';

            const options = {

                method: 'GET',

                headers: {
                    'x-rapidapi-key': '99c85be0cbmshb0b3748f7be764ap1c3a4cjsn3f655d33ed04',
                    'x-rapidapi-host': 'numbersapi.p.rapidapi.com'
                }
            };

            try {

                const response = await fetch(url, options);
                const result = await response.text();

                console.log(result);

            } catch (error) {
                console.error(error);
            }

        }
    //if loading display loading, error, etc.
    return (
        <View>
            <Text>{data ? data : "Loading..."}</Text>
        </View>
    );

};


export default CallAPI;

const Assignment3 = () => {
  const API_HOST = "numbersapi.p.rapidapi.com";
  const API_KEY = "YOUR_RAPIDAPI_KEY"; // Replace with actual API key

  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [fact, setFact] = useState("Select a month and enter a day to see a fact!");

  useEffect(() => {
    if (month && day) {
      fetchFact(month, day);
    }
  }, [month, day]);

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  picker: {
    height: 50,
    width: 200,
    marginBottom: 20,
  },
  input: {
    width: 200,
    padding: 10,
    borderColor: "black",
    borderWidth: 1,
    marginVertical: 10,
    borderRadius: 5,
    textAlign: "center",
  },
  factContainer: {
    marginTop: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    backgroundColor: "#f9f9f9",
  },
  factText: {
    fontSize: 16,
    textAlign: "center",
  },
});

//export default Assignment3;