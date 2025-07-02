import { Dimensions, StyleSheet } from "react-native";
import { themeColor } from "../../utils/theme";

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: themeColor.default
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 16,
        textAlign: 'center',
    },
    list: {
        padding: 16,
    },
    card: {
        marginBottom: width * 0.05,
        paddingHorizontal: width * 0.01,
        paddingTop: width * 0.04,
        paddingBottom: width * 0.02,
        backgroundColor: '#f4fafb',
        borderRadius: 8,
        overflow: 'hidden',
        elevation: 2
    },
    cardContainer: {
        flexDirection: 'row',
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: width * 0.1,
    },
    image: {
        width: 100,
        height: 120,
        resizeMode: 'cover'
    },
    imageModal: {
        width: 60,
        height: 70,
        resizeMode: 'cover'
    },
    cardContent: {
        flex: 1,
        paddingHorizontal: 12,
        paddingBottom: 12,
        justifyContent: 'space-between',
    },
    textTitle: {
        fontSize: 16,
        fontWeight: '600',
        width: width * 0.4,
        color: themeColor.black_1,
    },
    textPrice: {
        fontSize: 14,
        color: themeColor.primary,
        fontWeight: '800'
    },
    counter: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    qty: {
        fontSize: 16,
        fontWeight: 'bold',
        marginHorizontal: 12,
    },
    cardFooter: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    footer: {
        paddingHorizontal: width * 0.1,
        paddingVertical: width * 0.07,
        borderTopWidth: 1,
        elevation: 1,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        borderColor: themeColor.border,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    textTotal: {
        fontSize: 18,
        fontWeight: '800',
        color: themeColor.black_1,
    },
    empty: {
        marginTop: Dimensions.get('screen').width * 0.4,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textEmpty: {
        fontSize: 16,
        color: themeColor.typography,
        textAlign: 'center',
        fontWeight: '700',
        marginTop: 10
    },
    modal: {
        flexDirection: 'row',
        marginBottom: width * 0.04,
        paddingHorizontal: width * 0.01,
        paddingTop: width * 0.04,
        paddingBottom: width * 0.02,
        backgroundColor: '#f4fafb',
        borderRadius: 8,
        overflow: 'hidden',
        elevation: 2
    },
    modalWrapper: {
        marginLeft: width * 0.04,
    },
    modalContainer: {
        paddingTop: width * 0.02,
        paddingBottom: width * 0.2,
    },
    modalHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: width * 0.04,
        paddingHorizontal: width * 0.05
    },
    textTitleModal: {
        fontSize: 18,
        fontWeight: '800',
        color: themeColor.black_1,
    },
    modalFooter: {
        flex: 1,
        paddingHorizontal: width * 0.1,
    }
})

export default styles;