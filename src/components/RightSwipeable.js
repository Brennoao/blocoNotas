import { View } from "react-native";
import { Button } from "react-native-paper";
import StyleRightSwipeable from "../style/StyleRightSwipeable";

export default function RightSwipeable() {
    return (
        <View style={StyleRightSwipeable.mainContainer}>
            <Button style={StyleRightSwipeable.buttonMain}>
                Editar
            </Button>
            <Button style={StyleRightSwipeable.buttonMain}>
                Excluir
            </Button>
        </View>
    )
}