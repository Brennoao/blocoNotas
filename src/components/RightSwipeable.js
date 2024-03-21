import { View } from "react-native";
import { Text } from "react-native-paper";
import StyleRightSwipeable from "../style/StyleRightSwipeable";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function RightSwipeable(props) {
    const { editarItem, deleteStorage } = props;
    return (
        <View style={StyleRightSwipeable.mainContainer}>
            <TouchableOpacity onPress={editarItem} style={[StyleRightSwipeable.buttonMain, StyleRightSwipeable.buttonEdit]}>
                <Text>Editar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={deleteStorage} style={[StyleRightSwipeable.buttonMain, StyleRightSwipeable.buttonRemove]}>
                <Text style={StyleRightSwipeable.TextRemove}>Excluir</Text>
            </TouchableOpacity>
        </View>
    )
}