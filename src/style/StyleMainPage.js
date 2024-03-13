import { StyleSheet } from "react-native";

const StyleMainPage = StyleSheet.create({
    //MAIN CONTAINER

    mainContainer: {
        paddingHorizontal: 10,
        gap: 20
    },

    inputContainer: {
        flexDirection: 'row',
        // width: '95%',
        paddingTop: 10,
        gap: 5
    },

    button: {
        margin: 0
    },

    insideCard: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    }
})

export default StyleMainPage