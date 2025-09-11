import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useAuth } from "../../context/AuthContext";
import Button from "../components/Button";

export default function HomeScreen() {
    const { user, logout } = useAuth();

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Home</Text>

            <Text style={styles.info}>Name: {user?.name}</Text>
            <Text style={styles.info}>Email: {user?.email}</Text>

            <Button title="Logout" onPress={logout} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, paddingTop: 24 },
    heading: { fontSize: 24, fontWeight: "700" },
    info: { marginTop: 12 },
});
