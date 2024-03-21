import { StyleSheet } from "react-native";

const StyleMainPage = StyleSheet.create({
    
    //MAIN CONTAINER
    mainContainer: {
        gap: 20
    },

    inputContainer: {
        flexDirection: 'row',
        paddingHorizontal: 10,
        marginTop: 10,
        gap: 5,
    },

    button: {
        flex: 1.4,
        margin: 0,
    },

    insideCard: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    }
})

export default StyleMainPage