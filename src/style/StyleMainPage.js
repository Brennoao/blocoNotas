import { StyleSheet } from "react-native";
import { StyleGlobal } from "./Global";

const StyleMainPage = StyleSheet.create({
    
    //MAIN CONTAINER
    mainContainer: {
        gap: 15
    },

    inputContainer: {
        height: '7%',
        flexDirection: 'row',
        paddingHorizontal: StyleGlobal.primarySpacing,
        marginTop: StyleGlobal.secondarySpacing,
        gap: StyleGlobal.secondarySpacing,
    },

    button: {
        alignItems: "center",
        justifyContent: "center",

        marginTop: 6,
        paddingHorizontal: StyleGlobal.primarySpacing,
        height: '88%',

        borderWidth: 1,
        borderColor: StyleGlobal.secondaryColor,
        borderRadius: StyleGlobal.secondarySpacing
    },

    insideCard: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    }
})

export default StyleMainPage