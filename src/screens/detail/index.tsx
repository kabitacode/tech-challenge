import React, { useEffect, useMemo, useState } from "react";
import { AppStackScreenProps } from "../../routes";
import { ActivityIndicator, FlatList, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useGetProductDetailQuery } from "../../stores/api/product";
import { SafeAreaView } from 'react-native-safe-area-context';
import { themeColor } from "../../utils/theme";
import { Product } from "../../types/products";
import Icons from '@react-native-vector-icons/material-design-icons';
import { currencyFormat } from "../../utils/currencyFormat";
import styles from './styles';
import { CustomButton, Header } from "../../components";
import { useDispatch } from "react-redux";
import { addToCart } from "../../stores/slice/cart";

type DetailProps = AppStackScreenProps<'Detail'>;

const Detail: React.FC<DetailProps> = ({ navigation, route }) => {
    const dispatch = useDispatch();
    const productId = route.params.productId;
    const [loading, setLoading] = useState<boolean>(false);

    const {
        data: detailProduct,
        isLoading,
        isError
    } = useGetProductDetailQuery({
        productId: productId
    });

    const handleAddToCart = () => {
        if (detailProduct) {
            setLoading(true);
            setTimeout(() => {
                dispatch(addToCart(detailProduct));
                setLoading(false);
            }, 200);
        }
    }

    if (isLoading || loading) {
        return (
            <SafeAreaView style={[styles.container, { justifyContent: 'center', alignItems: 'center', }]}>
                <View style={styles.loading}>
                    <ActivityIndicator color={themeColor.primary} size={'large'} />
                    <Text style={[styles.textTitle, { marginLeft: 10 }]}>Loading...</Text>
                </View>
            </SafeAreaView>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <Header title="Detail" onPress={() => navigation.goBack()} isIconRight onPressIconRight={() => navigation.navigate('Cart')} />
            <ScrollView>
                <Image source={{ uri: detailProduct?.thumbnail }} style={styles.image} />
                <View style={styles.wrapper}>
                    <View style={styles.wrapperHero}>
                        <View style={styles.wrapperHeader}>
                            <Text style={styles.textPrice}>{currencyFormat(detailProduct?.price ?? 0)}</Text>
                            <Text style={styles.textDiscount}>{`${currencyFormat(detailProduct?.discountPercentage ?? 0)}%`}</Text>
                        </View>
                        <View style={styles.rating}>
                            <Icons color={themeColor.rating} size={18} name="star" />
                            <Text style={styles.textRating}>{`(${detailProduct?.rating})`}</Text>
                        </View>
                    </View>
                    <Text style={styles.textTitle}>{detailProduct?.title}</Text>
                    <Text style={styles.textDesc}>{detailProduct?.description}</Text>
                </View>
            </ScrollView>

            <View style={styles.footer}>
                <CustomButton title="Add To Cart" onPress={handleAddToCart} />
            </View>
        </SafeAreaView>
    )
}

export default Detail