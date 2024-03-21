import React, { useState, useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import StyleInsideNotes from '../style/StyleInsideNotes';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function BallSelecting(props) {

    const { itemId, id } = props;
    const [isSelected, setIsSelected] = useState(false);

    useEffect(() => {
        async function loadMarked() {
            try {
                const getData = await AsyncStorage.getItem('marked');
                let applyData = getData ? JSON.parse(getData) : [];
                if (!Array.isArray(applyData)) {
                    applyData = [];
                }
                setIsSelected(applyData.some(item => item.id === id && item.itemId === itemId));
            } catch (error) {
                console.error('Erro ao carregar dados marcados:', error);
            }
        }

        loadMarked();
    }, [id, itemId]);

    async function toggleSelection(itemIdSecondary, idPrimary) {
        try {
            const getData = await AsyncStorage.getItem('marked');
            let applyData = getData ? JSON.parse(getData) : [];
            console.log(applyData);
            if (!Array.isArray(applyData)) {
                applyData = [];
            }

            let newMarked;
            if (applyData.some(item => item.id === idPrimary && item.itemId === itemIdSecondary)) {

                newMarked = applyData.filter(item => !(item.id === idPrimary && item.itemId === itemIdSecondary));
            } else {

                newMarked = [...applyData, { id: idPrimary, itemId: itemIdSecondary }];
            }

            await AsyncStorage.setItem('marked', JSON.stringify(newMarked));
            setIsSelected(!isSelected);
        } catch (error) {
            console.error('Erro ao atualizar o AsyncStorage:', error);
        }
    }

    return (
        <TouchableOpacity
            style={[StyleInsideNotes.selector, { backgroundColor: isSelected ? 'green' : 'lightgray' }]}
            onPress={() => toggleSelection(itemId, id)}
        />
    );
}
