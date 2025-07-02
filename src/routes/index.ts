import { RouteProp } from '@react-navigation/native';
import {
    NativeStackNavigationProp,
    NativeStackScreenProps,
} from '@react-navigation/native-stack';

export type AppStackParamList = {
    Home: undefined;
    Detail: { productId: number };
    Cart: undefined;
}

export type AppStackNavigationProp =
    NativeStackNavigationProp<AppStackParamList>;
export type AppStackScreenProps<T extends keyof AppStackParamList> =
    NativeStackScreenProps<AppStackParamList, T>;
export type AppStackRouteProps<T extends keyof AppStackParamList> = RouteProp<AppStackParamList, T>