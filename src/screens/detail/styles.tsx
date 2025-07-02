import { Dimensions, StyleSheet } from "react-native";
import { themeColor } from "../../utils/theme";

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: themeColor.default
    },
    wrapperHero: {
        marginTop: width * 0.05,
        marginBottom: width * 0.02,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    wrapper: {
        paddingHorizontal: 20
    },
    wrapperHeader: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    rating: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    image: {
        width: width,
        height: width * 0.8,
        resizeMode: 'cover'
    },
    textPrice: {
        fontSize: 18,
        color: themeColor.orange,
        fontWeight: '600',
        marginRight: 10
    },
    textTitle: {
        fontSize: 18,
        color: themeColor.typography,
        fontWeight: '600',
        marginBottom: width * 0.02
    },
    textRating: {
        fontSize: 14,
        color: themeColor.typography,
        marginLeft: 5,
        fontWeight: '500'
    },
    textDesc: {
        fontSize: 14,
        color: themeColor.typography,
        lineHeight: 20,
        width: width * 0.8
    },
    textDiscount: {
        fontSize: 14,
        fontWeight: '500',
        color: themeColor.typography,
        textDecorationLine: 'line-through'
    },
    footer: {
        elevation: 10,
        paddingHorizontal: width * 0.1,
        paddingVertical: width * 0.05,
        backgroundColor: themeColor.default,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        borderTopWidth: 1,
        borderTopColor: themeColor.border,
    },
})

export default styles;