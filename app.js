import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button } from 'react-native';
import axios from 'axios';

const App = () => {
    const [laborers, setLaborers] = useState([]);

    useEffect(() => {
        const fetchLaborers = async () => {
            const response = await axios.get('http://your_backend_url/laborers');
            setLaborers(response.data);
        };
        fetchLaborers();
    }, []);

    return (
        <View>
            <Text>Available Laborers:</Text>
            <FlatList
                data={laborers}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <View>
                        <Text>{item.name}</Text>
                        <Text>{item.workType}</Text>
                        <Text>{item.dailyWage}</Text>
                    </View>
                )}
            />
        </View>
    );
};

export default App;
