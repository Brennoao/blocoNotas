import { StyleSheet } from "react-native";
import { StyleGlobal } from "./Global";

const StyleInsideNotes = StyleSheet.create({
    flatList: {
        margin: 4
    },

    insideFlatList: {
        gap: 6
    },

    card: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 6,

        borderWidth: 1,
        borderColor: StyleGlobal.secondaryColor,
        borderRadius: 10,

        height: 50,
        paddingLeft: 10,
        overflow: 'hidden',
    },

    content: {
        flex: 1,
        marginVertical: 10
    },

    selector: {
        width: 30,
        height: 30,
        borderRadius: 20,
    },

    smallText: {
        color: StyleGlobal.thirdColor
    },

    buttonDelete: {
        alignItems: 'center',
        justifyContent: 'center',

        backgroundColor: StyleGlobal.thirdColor,
        color: 'white',
        height: '100%',
        padding: 10
    }
});

export default StyleInsideNotes