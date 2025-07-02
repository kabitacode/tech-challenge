import { Dimensions, StyleSheet } from "react-native";
import { themeColor } from "../../utils/theme";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: themeColor.default
    },
    header: {
        flexDirection: 'row',
        backgroundColor: themeColor.primary,
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        marginBottom: 10
    },
    textHeader: {
        fontSize: 18,
        fontWeight: '800',
        color: themeColor.default,
    },
    containerTab: {
        marginVertical: 15,
        marginHorizontal: 10
    },
    btnTab: {
        marginHorizontal: 10,
        paddingBottom: 5,
        backgroundColor: themeColor.default,
    },
    btnTabActive: {
        marginHorizontal: 10,
        paddingBottom: 5,
        backgroundColor: themeColor.default,
        borderBottomColor: themeColor.primary,
        borderBottomWidth: 2,
    },
    wrapperList: {
        padding: 10
    },
    image: {
        width: '100%',
        height: 150,
        resizeMode: 'cover',
        marginBottom: 10
    },
    card: {
        flex: 1,
        marginBottom: 20,
        marginHorizontal: 10,
        backgroundColor: themeColor.default,
        elevation: 3,
        paddingBottom: 20,
        borderRadius: 10
    },
    cardBody: {
        paddingHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textTitle: {
        fontSize: 14,
        color: themeColor.typography,
        lineHeight: 20,
        textAlign: 'center',
        marginBottom: 5
    },
    textEmpty: {
        fontSize: 16,
        color: themeColor.typography,
        textAlign: 'center',
        fontWeight: '700',
        marginTop: 10
    },
    textDesc: {
        fontSize: 12,
        color: themeColor.typography,
        lineHeight: 15,
        height: 30,
        textAlign: 'center',
        marginBottom: 10
    },
    textPrice: {
        fontSize: 15,
        color: themeColor.primary,
        fontWeight: '600'
    },
    inputContainer: {
        backgroundColor: themeColor.default,
        borderWidth: 1,
        elevation: 3,
        alignItems: 'center',
        flexDirection: 'row',
        borderColor: themeColor.border,
        marginHorizontal: 20,
        paddingVertical: 2,
        marginBottom: 10,
        paddingLeft: 10,
        paddingRight: 5,
        borderRadius: 10
    },
    input: {
        flex: 1,
        marginLeft: 10
    },
    empty: {
        marginTop: Dimensions.get('screen').width * 0.4,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
})

export default styles;