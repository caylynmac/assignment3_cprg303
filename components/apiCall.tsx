import React, { useEffect, useState } from "react";
import { View, Text} from "react-native";



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