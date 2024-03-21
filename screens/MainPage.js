import React, { useEffect, useState } from "react";
import { Alert, Pressable, View } from "react-native";
import { FlatList, Swipeable, TouchableOpacity } from "react-native-gesture-handler";
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Button, Card, Text, TextInput } from "react-native-paper";
import Toast from 'react-native-toast-message';
import StyleMainPage from "../src/style/StyleMainPage";
import Icon from 'react-native-vector-icons/MaterialIcons';
import RightSwipeable from "../src/components/RightSwipeable";
import GenerateId from "../src/components/GenerateId";
import useMonitorDataKeyRemoval from "../src/components/useMonitorDataKeyRemoval";
import { StyleGlobal } from "../src/style/Global";

export default function MainPage({ navigation }) {
    useMonitorDataKeyRemoval()

    const [data, setData] = useState()
    const [inputValue, setInputValue] = useState()
    const [edit, setEdit] = useState(false)
    const [currentItem, setCurrentItem] = useState(null);

    async function GetStorage() {
        const getData = await AsyncStorage.getItem('dataKey')
        const applyData = getData ? JSON.parse(getData) : []
        setData(applyData)
    }

    useEffect(() => {
        GetStorage()
    }, [])

    async function SaveStorage(dataForm) {
        try {
            if (inputValue) {
                const getData = await AsyncStorage.getItem('dataKey');
                let existingData = getData ? JSON.parse(getData) : [];

                // Verifica se estamos editando um item existente
                if (edit) {
                    // Encontra o índice do item que estamos editando
                    const index = existingData.findIndex(item => item.id === dataForm.id);

                    // Se o item foi encontrado, atualize seu valor
                    if (index !== -1) {
                        existingData[index].value = inputValue; // Atualize o valor com o novo texto
                    }
                } else {
                    // Adiciona um novo item
                    const dataWithId = { value: inputValue, id: GenerateId() };
                    existingData.push(dataWithId);
                }

                // Salve o array atualizado de volta no AsyncStorage
                await AsyncStorage.setItem('dataKey', JSON.stringify(existingData));
                setData(existingData);
                setInputValue(''); // Limpe o valor de entrada
                setEdit(false); // Desative o modo de edição

                Toast.show({ type: 'success', text1: edit ? 'Bloco de Notas editado com sucesso' : 'Bloco de Notas salvo com sucesso' });
                GetStorage();
            } else {
                Toast.show({ type: 'error', text1: 'impossível adicionar nada' });
            }
        } catch (error) {
            console.error('Save Storage', error);
        }
    }

    function editButton(id) {
        const item = data.find(item => id === item.id);
        if (item) {
            setInputValue(item.value);
            setEdit(true);
            setCurrentItem(item)
        }
    }

    function AlertDelete(idItem) {
        Alert.alert('Deletar', 'Bloco de Notas', [
            {
                text: 'Cancel',
                style: 'cancel',
            },
            {
                text: 'Deletar',
                onPress: () => RemoveItemStorage(idItem)
            },
        ])
    }

    async function RemoveItemStorage(id) {
        try {
            // Recupere todos os dados do AsyncStorage
            const getData = await AsyncStorage.getItem('dataKey');
            let existingData = getData ? JSON.parse(getData) : [];

            // Encontre o índice do item que você deseja remover
            const index = existingData.findIndex(item => item.id === id);

            // Se o item foi encontrado, remova-o do array
            if (index !== -1) {
                existingData.splice(index, 1);
            }

            // Salve o array atualizado de volta no AsyncStorage
            await AsyncStorage.setItem('dataKey', JSON.stringify(existingData));
            setData(existingData)

            Toast.show({ type: "success", text1: 'Bloco de Notas removido' })
        } catch (error) {
            console.error('RemoveItemStorage', error);
        }
    }

    async function limparAsyncStorage() {
        try {
            await AsyncStorage.clear();
            console.log('AsyncStorage limpo com sucesso!');
            GetStorage()
        } catch (error) {
            console.error('Erro ao limpar o AsyncStorage: ', error);
        }
    }

    return (
        <View style={StyleMainPage.mainContainer}>
            <View style={StyleMainPage.inputContainer}>
                <TextInput
                    style={{ flex: 1 }}
                    mode='outlined'
                    label='Text'
                    value={inputValue}
                    onChangeText={(text) => setInputValue(text)}
                />
                <TouchableOpacity
                    style={StyleMainPage.button}
                    mode='outlined'
                    onPress={() => { if (edit) { SaveStorage(currentItem); } else { SaveStorage(inputValue); } }}>
                    <Text>{edit ? 'Editar' : 'Salvar'}</Text>
                </TouchableOpacity>

            </View>

            <FlatList
                style={{ height: '80%' }}
                contentContainerStyle={{ gap: 4 }}
                data={data}
                renderItem={({ item }) => (
                    <Swipeable renderRightActions={() => <RightSwipeable editarItem={() => editButton(item.id)} deleteStorage={() => AlertDelete(item.id)} />} containerStyle={{ width: '100%' }}>
                        <Pressable onPress={() => navigation.navigate('InsideNotes', item.id)}>
                            <Card mode="outlined" key={item.id} style={{ borderRadius: 0, borderColor: StyleGlobal.primaryColor }}>
                                <Card.Content style={StyleMainPage.insideCard}>
                                    <Text>{item.value}</Text>
                                    <Button>
                                        <Icon name="people" size={25} color={StyleGlobal.secondaryColor} />
                                    </Button>
                                </Card.Content>
                            </Card>
                        </Pressable>
                    </Swipeable>
                )}
            />
            {/* <Button onPress={limparAsyncStorage}>test</Button> */}
        </View >

    )
}
