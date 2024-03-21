import { useEffect, useLayoutEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button, FAB, Modal, Text, TextInput } from "react-native-paper";
import { Formik } from "formik";
import { Alert, View } from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import Toast from "react-native-toast-message";
import { containerStyle } from "../src/style/StyleModal";
import InsideNotesValidator from "../src/validators/InsideNotesValidator";
import { FabActions } from "../src/components/InsideNotesAction";
import StyleInsideNotes from "../src/style/StyleInsideNotes";
import GenerateId from "../src/components/GenerateId";
import BallSelecting from "../src/components/BallSelecting";


export default function InsideNotes(props) {
    const id = props.route.params
    const { navigation } = props;

    const [data, setData] = useState([])
    const [newData, setNewData] = useState([])

    const [state, setState] = useState({ open: false }); //FAB
    const [visible, setVisible] = useState(false); //MODAL

    async function GetStorage() {
        const getData = await AsyncStorage.getItem('dataKey')
        const applyData = getData ? JSON.parse(getData) : []

        const filter = applyData.filter(item => id === item.id)
        const transformString = filter[0]
        setData(transformString)
    }

    useEffect(() => {
        GetStorage()
    }, [newData])

    useLayoutEffect(() => {
        navigation.setOptions({ headerTitle: data.value });
    }, [data])

    //CONTROLADOR FAB
    const onStateChange = ({ open }) => setState({ open });

    const { open } = state;

    //CONTROLADOR MODAL
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);

    async function UpdateStorage(newDataAsync) {
        const getData = await AsyncStorage.getItem('dataKey');
        const applyData = getData ? JSON.parse(getData) : [];

        const updatedData = applyData.map(item => {
            if (item.id === id) {
                return {
                    ...item,
                    dados: item.dados ? [...item.dados, newDataAsync] : [newDataAsync]
                }
            } else {
                return item;
            }
        });

        await AsyncStorage.setItem('dataKey', JSON.stringify(updatedData));
        setNewData(updatedData)
    }

    function AlertDelete(idItem) {
        Alert.alert('Deletar Nota??', 'Ação não poderá ser desfeita', [
            {
                text: 'Cancel',
                style: 'cancel',
            },
            {
                text: 'Deletar',
                onPress: () => removeItem(idItem)
            },
        ])
    }

    async function removeItem(itemIdToRemove) {
        const getData = await AsyncStorage.getItem('dataKey');
        const applyData = getData ? JSON.parse(getData) : [];

        const itemWithDados = applyData.find(item => item.id === id);

        if (itemWithDados) {
            const updatedDados = itemWithDados.dados.filter(item => item.id !== itemIdToRemove);

            itemWithDados.dados = updatedDados;

            const updatedData = applyData.map(item => item.id === itemWithDados.id ? itemWithDados : item);
            await AsyncStorage.setItem('dataKey', JSON.stringify(updatedData));

            Toast.show({ type: "success", text1: 'Nota removida com sucesso' })
            setNewData(updatedData)
        }
    }

    return (
        <>
            <FlatList
                style={StyleInsideNotes.flatList}
                contentContainerStyle={StyleInsideNotes.insideFlatList}
                data={data.dados}
                renderItem={({ item }) => (
                    <View style={StyleInsideNotes.card}>
                        <BallSelecting itemId={item.id} id={id} />
                        <View style={StyleInsideNotes.content}>
                            <Text>{item.nome}</Text>
                            <Text style={StyleInsideNotes.smallText}>00/00/0000</Text>
                        </View>
                        <TouchableOpacity style={StyleInsideNotes.buttonDelete} onPress={() => AlertDelete(item.id)}><Text>Delete</Text></TouchableOpacity>
                    </View>
                )}
            />

            <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                <Formik
                    enableReinitialize
                    initialValues={{
                        nome: '',
                        // sobreNome: '',
                        // cpf: '',
                        // celular: '',
                        // salario: '',
                        // id: '',
                    }}
                    validationSchema={InsideNotesValidator}
                    onSubmit={(values, { resetForm }) => {

                        const idArray = GenerateId()

                        const valuesWithId = {
                            ...values,
                            id: idArray
                        }
                        UpdateStorage(valuesWithId);
                        resetForm();
                    }}>{({ handleChange, handleBlur, handleSubmit, touched, errors, values }) => (
                        <>
                            <View style={{ gap: 10 }}>

                                <TextInput
                                    // style={FuncionarioStyle.input}
                                    // outlineColor={GlobalValues.mainColor}
                                    // activeOutlineColor={GlobalValues.thirdColor}
                                    // textColor={GlobalValues.thirdColor}
                                    mode='outlined'
                                    label='Nome'
                                    onChangeText={handleChange('nome')}
                                    onBlur={handleBlur('nome')}
                                    value={values.nome}
                                    error={errors.nome ? true : false}
                                />

                                {touched.nome && errors.nome && (
                                    <Text style={{ alignSelf: 'flex-start' }} variant="bodySmall">{errors.nome}</Text>
                                )}

                                <Button mode="outlined" onPress={handleSubmit} icon={'content-save'} style={{ alignSelf: 'flex-end' }}>Save</Button>
                            </View>

                        </>
                    )}
                </Formik>
            </Modal>

            <FAB.Group
                open={open}
                visible
                icon={open ? 'note' : 'plus'}
                actions={FabActions({ showModal })}
                onStateChange={onStateChange}
                onPress={() => {
                    if (open) {
                        // do something if the speed dial is open
                    }
                }}
            />

        </>
    )
}
