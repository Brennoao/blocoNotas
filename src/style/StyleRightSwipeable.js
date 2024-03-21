import { StyleSheet } from "react-native";

const StyleRightSwipeable = StyleSheet.create({
    mainContainer: {
        // backgroundColor: 'gray',

        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },

    buttonMain: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',

        width: '100%',
        paddingHorizontal: 20
    },

    buttonEdit: {
        backgroundColor: 'lightgray'
    },  

    buttonRemove: {
        backgroundColor: 'red',
    },

    TextRemove: {
        color: 'white'
    }
})

export default StyleRightSwipeable