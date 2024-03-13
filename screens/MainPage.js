import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { FlatList, Swipeable, TouchableOpacity } from "react-native-gesture-handler";
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Button, Card, Menu, Text, TextInput } from "react-native-paper";
import Toast from 'react-native-toast-message';
import StyleMainPage from "../src/style/StyleMainPage";
import Icon from 'react-native-vector-icons/MaterialIcons';
import RightSwipeable from "../src/components/RightSwipeable";

export default function MainPage() {

    const [data, setData] = useState([])
    const [inputValue, setInputValue] = useState()

    //    async function Save(dataForm) {
    //        await axios.post('./API', dataForm).then(response => {
    //         console.log('deu certo', response.data);
    //        }).catch(response => {
    //         console.error('save', response);
    //        })
    //     }

    async function GetStorage() {
        const getData = await AsyncStorage.getItem('dataKey')
        const applyData = getData ? JSON.parse(getData) : []
        setData(applyData)
    }

    useEffect(() => {
        GetStorage()
    }, [])

    function generateId() {
        return Math.random().toString(36).substring(2) + Date.now().toString(36);
    }

    async function SaveStorage(dataForm) {
        try {
            if (inputValue) {
                const getData = await AsyncStorage.getItem('dataKey');
                let existingData = getData ? JSON.parse(getData) : [];
                if (!Array.isArray(existingData)) {
                    existingData = [];
                }
                // Adicione um ID único ao dataForm antes de adicioná-lo à matriz
                const dataWithId = { value: dataForm, id: generateId() };
                existingData.push(dataWithId);
                await AsyncStorage.setItem('dataKey', JSON.stringify(existingData));
                setInputValue('');
                GetStorage();
            } else {
                Toast.show({ type: 'error', text1: 'Impossível adicionar nada' })
            }

        } catch (error) {
            console.error('Save Storage', error);
        }
    }


    async function limparAsyncStorage() {
        try {
            await AsyncStorage.clear();
            console.log('AsyncStorage limpo com sucesso!');
        } catch (error) {
            console.log('Erro ao limpar o AsyncStorage: ', error);
        }
    }

    return (
        <View style={StyleMainPage.mainContainer}>
            <View style={StyleMainPage.inputContainer}>
                <TextInput
                    style={{ flex: 4 }}
                    mode='outlined'
                    label='Text'
                    value={inputValue}
                    onChangeText={(text) => setInputValue(text)}
                />
                <Button
                    style={StyleMainPage.button}
                    mode='outlined'
                    onPress={() => SaveStorage(inputValue)}
                >
                    <Text>add</Text>
                </Button>
            </View>

            <FlatList
                contentContainerStyle={{ gap: 4 }}
                data={data}
                renderItem={({ item }) => (
                    <Swipeable renderRightActions={RightSwipeable}>
                        <Card mode="outlined" key={item.id} style={{borderRadius: 0, borderRightWidth: 0}}>
                            <Card.Content style={StyleMainPage.insideCard}>
                                <Text>{item.value}</Text>
                                <Button>
                                    <Icon name="people" size={24} color="black" />
                                </Button>
                            </Card.Content>
                        </Card>
                    </Swipeable>
                )}
            />
        </View >

    )
}
