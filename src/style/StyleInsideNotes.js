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
        borderRadius: StyleGlobal.primarySpacing,

        height: 50,
        paddingLeft: StyleGlobal.primarySpacing,
        overflow: 'hidden',
    },

    content: {
        flex: 1,
        marginVertical: StyleGlobal.primarySpacing
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
        padding: StyleGlobal.primarySpacing
    }
});

export default StyleInsideNotes