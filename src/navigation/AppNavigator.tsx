import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '../context/AuthContext';
import LoginScreen from '../presentation/screens/LoginScreen';
import SignupScreen from '../presentation/screens/SignupScreen';
import HomeScreen from '../presentation/screens/HomeScreen';
import { ActivityIndicator, View } from 'react-native';
const Stack = createNativeStackNavigator();
export default function RootNavigator() {
    const { user, initializing } = useAuth();
    if (initializing) return (<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }
    }> <ActivityIndicator /></View >);
    return (
        <NavigationContainer>
            {
                user ? (
                    <Stack.Navigator >
                        <Stack.Screen name="Home" component={HomeScreen} />
                    </Stack.Navigator>
                ) : (
                    <Stack.Navigator>
                        <Stack.Screen name="Login" component={LoginScreen} />
                        <Stack.Screen name="Signup" component={SignupScreen} />
                    </Stack.Navigator>
                )}
        </NavigationContainer>
    );
}