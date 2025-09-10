import React from "react";
import { Pressable, Text, StyleSheet, ActivityIndicator } from "react-native";

interface Props {
    title: string;
    onPress: () => void;
    loading?: boolean;
}

export default function Button({ title, onPress, loading }: Props) {
    return (
        <Pressable
            style={({ pressed }) => [
                styles.button,
                pressed ? { opacity: 0.8 } : null,
            ]}
            onPress={onPress}
            disabled={loading}
        >
            {loading ? (
                <ActivityIndicator color="#fff" />
            ) : (
                <Text style={styles.text}>{title}</Text>
            )}
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: "#2563eb",
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: "center",
    },
    text: { color: "#fff", fontSize: 16, fontWeight: "600" },
});
