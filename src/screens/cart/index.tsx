import React, { useCallback, useEffect, useRef } from 'react';
import { FlatList, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../stores';
import { removeFromCart, updateQuantity, toggleCheck, resetAllChecked } from '../../stores/slice/cart';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icons from '@react-native-vector-icons/material-design-icons';
import { currencyFormat } from '../../utils/currencyFormat';
import { CustomButton, Header } from '../../components';
import { themeColor } from '../../utils/theme';
import styles from './styles';
import { AppStackScreenProps } from '../../routes';
import Checkbox from '@react-native-community/checkbox';
import { useFocusEffect } from '@react-navigation/native';
import BottomSheet, { BottomSheetMethods } from '@devvie/bottom-sheet';

type CartProps = AppStackScreenProps<'Cart'>;

const Cart: React.FC<CartProps> = ({ navigation, route }) => {
    const sheetRef = useRef<BottomSheetMethods>(null);

    const dispatch = useDispatch();
    const cartItems = useSelector((state: RootState) => state.cart.items);

    useFocusEffect(
        useCallback(
            () => {

                return () => {
                    dispatch(resetAllChecked());
                }
            },
            [dispatch],
        )
    )

    const handleIncrement = (id: number, quantity: number) => {
        dispatch(updateQuantity({ id, quantity: quantity + 1 }));
    };

    const handleDecrement = (id: number, quantity: number) => {
        if (quantity > 1) {
            dispatch(updateQuantity({ id, quantity: quantity - 1 }));
        } else {
            dispatch(removeFromCart(id));
        }
    };

    const checkedItems = cartItems.filter(item => item.isChecked);
    const totalPrice = checkedItems.reduce((sum, item) => sum + (item.price ?? 0) * item.quantity, 0);



    return (
        <React.Fragment>
            <SafeAreaView style={styles.container}>
                <Header title="Cart" onPress={() => navigation.goBack()} />

                <FlatList
                    data={cartItems}
                    keyExtractor={(item) => item.id?.toString() ?? Math.random().toString()}
                    contentContainerStyle={styles.list}
                    renderItem={({ item }) => (
                        <View style={styles.card}>
                            <Checkbox
                                value={item.isChecked}
                                onValueChange={() => dispatch(toggleCheck(item.id!))}
                                onCheckColor={themeColor.primary}
                                onFillColor={themeColor.primary}
                            />
                            <View style={styles.cardContainer}>
                                <Image source={{ uri: item.thumbnail }} style={styles.image} />
                                <View style={styles.cardContent}>
                                    <View style={styles.cardHeader}>
                                        <Text style={styles.textTitle}>{item.title}</Text>
                                        <TouchableOpacity onPress={() => dispatch(removeFromCart(item.id ?? 0))}>
                                            <Icons name="trash-can" size={25} color={themeColor.danger} />
                                        </TouchableOpacity>
                                    </View>

                                    <View style={styles.cardFooter}>
                                        <Text style={styles.textPrice}>{currencyFormat((item.price ?? 0) * item.quantity)}</Text>
                                        <View style={styles.counter}>
                                            <TouchableOpacity onPress={() => handleDecrement(item.id!, item.quantity)}>
                                                <Icons name="minus-circle" size={25} color={themeColor.grey} />
                                            </TouchableOpacity>

                                            <Text style={styles.qty}>{item.quantity}</Text>

                                            <TouchableOpacity onPress={() => handleIncrement(item.id!, item.quantity)}>
                                                <Icons name="plus-circle" size={25} color={themeColor.grey} />
                                            </TouchableOpacity>
                                        </View>
                                    </View>

                                </View>
                            </View>
                        </View>
                    )}
                    ListEmptyComponent={() => {
                        return (
                            <View style={styles.empty}>
                                <Icons name='shopping' size={100} color={themeColor.typography} />
                                <Text style={styles.textEmpty}>Data is Empty!</Text>
                            </View>
                        )
                    }}
                />

                <View style={styles.footer}>
                    <Text style={styles.textTotal}>Total: {currencyFormat(totalPrice)}</Text>
                    <CustomButton title="Checkout" onPress={() => sheetRef.current?.open()} />
                </View>
            </SafeAreaView>
            <BottomSheet ref={sheetRef} style={styles.modalContainer} closeOnDragDown={false}>
                <View style={styles.modalHeader}>
                    <Text style={styles.textTitleModal}>Checkout</Text>
                    <TouchableOpacity onPress={() => sheetRef.current?.close()}>
                        <Icons name="close" size={25} color={themeColor.black_1} />
                    </TouchableOpacity>
                </View>
                <FlatList
                    data={checkedItems}
                    keyExtractor={(item) => item.id?.toString() ?? Math.random().toString()}
                    contentContainerStyle={styles.list}
                    renderItem={({ item }) => (
                        <View style={styles.modal}>
                            <Image source={{ uri: item.thumbnail }} style={styles.imageModal} />
                            <View style={styles.modalWrapper}>
                                <Text style={[styles.textTitle, {marginBottom: 10}]}>{item.title}</Text>
                                <Text style={styles.textPrice}>{currencyFormat((item.price ?? 0) * item.quantity)}</Text>
                            </View>
                        </View>
                    )}
                />
            </BottomSheet>
        </React.Fragment>
    );
};

export default Cart;
