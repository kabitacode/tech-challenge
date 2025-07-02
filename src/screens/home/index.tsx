import React, { useEffect, useMemo, useState } from "react";
import { AppStackScreenProps } from "../../routes";
import { ActivityIndicator, FlatList, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useGetCategoriesQuery, useGetListProductsByCategoryQuery, useGetListProductsBySearchQuery } from "../../stores/api/product";
import { SafeAreaView } from 'react-native-safe-area-context';
import { themeColor } from "../../utils/theme";
import { Product } from "../../types/products";
import Icons from '@react-native-vector-icons/material-design-icons';
import { currencyFormat } from "../../utils/currencyFormat";
import styles from './styles';

type HomeProps = AppStackScreenProps<'Home'>;

const Home: React.FC<HomeProps> = ({ navigation }) => {
    const [selectedCategory, setSelectedCategory] = useState<string>('beauty');
    const [page, setPage] = useState<number>(0);
    const [isMore, setIsMore] = useState<boolean>(false);
    const [products, setProducts] = useState<Product[]>([]);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [debouncedKeyword, setDebouncedKeyword] = useState('');
    const [searchTriggered, setSearchTriggered] = useState(false);
    const [isRefresh, setIsRefresh] = useState(false);

    const { data: categories, isLoading: loadingCategories } = useGetCategoriesQuery();

    const limit = 5;
    const queryParams = useMemo(() => ({
        name: selectedCategory,
        limit,
        skip: (page - 1) * limit
    }), [selectedCategory, page]);

    const {
        data: dataProducts,
        isLoading: loadingProducts,
        isFetching,
        isError,
        refetch
    } = useGetListProductsByCategoryQuery(queryParams, {
        skip: searchTriggered
    });

    const {
        data: searchResults,
        isLoading: loadingSearch,
        isFetching: fetchingSearch,
    } = useGetListProductsBySearchQuery({
        search: debouncedKeyword,
        limit,
        skip: (page - 1) * limit
    }, {
        skip: !searchTriggered || debouncedKeyword.length < 3
    });


    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedKeyword(searchKeyword.trim());

            const isSearch = searchKeyword.trim().length > 0;
            setSearchTriggered(isSearch);

            if (isSearch) {
                resetList();
            }
        }, 500);


        return () => clearTimeout(handler);
    }, [searchKeyword]);

    useEffect(() => {
        if (!searchTriggered) {
            resetList();
        }
    }, [searchTriggered]);


    const resetList = () => {
        setPage(1);
        setProducts([]);
        setIsMore(false);
    };

    useEffect(() => {
        if (!searchTriggered) {
            setPage(1);
            setProducts([]);
            setIsMore(false);
        }
    }, [selectedCategory]);

    useEffect(() => {
        if (searchTriggered) return;

        const prods = dataProducts?.products ?? [];

        if (prods.length === 0) {
            setIsMore(true);
            return;
        }

        setProducts((prev) =>
            page === 1 ? [...prods] : [...prev, ...prods]
        );
    }, [dataProducts, searchTriggered]);

    useEffect(() => {
        if (!searchTriggered) return;

        const prods = searchResults?.products ?? [];

        if (prods.length === 0) {
            setIsMore(true);
            return;
        }

        setProducts((prev) =>
            page === 1 ? [...prods] : [...prev, ...prods]
        );
    }, [searchResults, searchTriggered]);


    const loadMore = () => {
        const total = searchTriggered ? searchResults?.total ?? 0 : dataProducts?.total ?? 0;
        const loading = searchTriggered ? fetchingSearch : isFetching;

        const hasMore = products.length < total;

        if (hasMore && !loading && !isMore) {
            setPage((prev) => prev + 1);
        }
    };

    const onSelectedTab = (name: string) => {
        if (name !== selectedCategory) {
            setSelectedCategory(name);
            setSearchKeyword('');
            setDebouncedKeyword('');
            setSearchTriggered(false);
            resetList();
        }
    };

    const handleRefresh = async () => {
        try {
            setIsRefresh(true);
            setPage(1);
            await refetch();
        } catch (error) {
            console.log(error);
        } finally {
            setIsRefresh(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.textHeader}>Home</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
                    <Icons name='cart' size={20} color={themeColor.default} />
                </TouchableOpacity>
            </View>
            <View style={styles.containerTab}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {
                        categories?.map((item, index) => {
                            return (
                                <TouchableOpacity
                                    key={index}
                                    style={[styles.btnTab, selectedCategory === item.slug && styles.btnTabActive]}
                                    onPress={() => onSelectedTab(item?.slug ?? '')} >
                                    <Text>{item.name}</Text>
                                </TouchableOpacity>
                            )
                        })
                    }
                </ScrollView>
            </View>

            <View style={styles.inputContainer}>
                <Icons name='text-search-variant' size={20} color={themeColor.typography} />
                <TextInput
                    placeholder="Search ..."
                    style={styles.input}
                    value={searchKeyword}
                    onChangeText={setSearchKeyword}
                />
            </View>


            <FlatList
                data={products}
                keyExtractor={(item, index) => item.id !== undefined ? item.id.toString() : `${index}`}
                numColumns={2}
                contentContainerStyle={styles.wrapperList}
                renderItem={({ item, index }) => {
                    return (
                        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Detail', { productId: item.id ?? 0 })}>
                            <Image source={{ uri: item.thumbnail }} style={styles.image} />
                            <View style={styles.cardBody}>
                                <Text style={styles.textTitle}>{item?.title}</Text>
                                <Text style={styles.textDesc}>{item?.description}</Text>
                                <Text style={styles.textPrice}>{currencyFormat(item?.price ?? 0)}</Text>
                            </View>
                        </TouchableOpacity>
                    )
                }}
                onEndReached={loadMore}
                onEndReachedThreshold={0.1}
                removeClippedSubviews={false}
                refreshing={isRefresh}
                onRefresh={handleRefresh}
                ListEmptyComponent={() => {
                    if (!loadingProducts && searchTriggered) {
                        return (
                            <View style={styles.empty}>
                                <Icons name='close-box-outline' size={100} color={themeColor.typography} />
                                <Text style={styles.textEmpty}>Data is Empty!</Text>
                            </View>
                        )
                    } else return null
                }}
                ListFooterComponentStyle={{ paddingVertical: 50 }}
                ListFooterComponent={!isMore && isFetching && !isError ? (
                    <ActivityIndicator size={'large'} color={themeColor.primary} />
                ) : null}
            />
        </SafeAreaView>
    )
}

export default Home