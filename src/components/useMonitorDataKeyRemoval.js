import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useMonitorDataKeyRemoval = () => {
    const [dataKeyItems, setDataKeyItems] = useState([]);

    useEffect(() => {
        // Carrega os itens atuais do 'dataKey'
        const loadDataKeyItems = async () => {
            const dataKeyJson = await AsyncStorage.getItem('dataKey');
            const dataKey = dataKeyJson ? JSON.parse(dataKeyJson) : [];
            setDataKeyItems(dataKey);
        };

        // Chama a função ao montar e define um intervalo para verificar periodicamente
        loadDataKeyItems();
        const interval = setInterval(loadDataKeyItems, 3000); // Verifica a cada 1 segundo

        return () => clearInterval(interval); // Limpa o intervalo quando o hook é desmontado
    }, []);

    useEffect(() => {
        // Função para remover itens do 'marked' que não estão mais no 'dataKey'
        const removeMissingItemsFromMarked = async () => {
            const markedJson = await AsyncStorage.getItem('marked');
            const marked = markedJson ? JSON.parse(markedJson) : [];
            const dataKeyIds = dataKeyItems.map(item => item.id);

            // Novo: Verifica se os IDs dentro da chave 'dados' foram removidos
            const dataKeyDadosIds = dataKeyItems.flatMap(item => item.dados?.map(dado => dado.id) || []);
            
            const updatedMarked = marked.filter(item => 
                dataKeyIds.includes(item.itemId) || dataKeyDadosIds.includes(item.itemId)
            );

            await AsyncStorage.setItem('marked', JSON.stringify(updatedMarked));
        };

        // Chama a função sempre que 'dataKeyItems' é atualizado
        removeMissingItemsFromMarked();
    }, [dataKeyItems]);
};

export default useMonitorDataKeyRemoval;
