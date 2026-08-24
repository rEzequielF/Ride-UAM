import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MainTabParamList } from '@/types/navigation';

const Tab = createBottomTabNavigator<MainTabParamList>();

export const MainTabsNavigator = () => (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen name="Home" component={() => <></>} />
        <Tab.Screen name="Buscar" component={() => <></>} />
        <Tab.Screen name="MisRides" component={() => <></>} />
        <Tab.Screen name="Perfil" component={() => <></>} />
    </Tab.Navigator>
);