import React from "react";
import { View, TextInput, Text, StyleSheet, TextInputProps } from "react-native";

interface Props extends TextInputProps {
    label: string;
    error?: string;
}

export default function FormTextInput({ label, error, ...props }: Props) {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <TextInput
                style={[styles.input, error ? styles.errorBorder : null]}
                placeholderTextColor="#9ca3af"
                {...props}
            />
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { marginBottom: 16 },
    label: { marginBottom: 4, fontWeight: "600" },
    input: {
        borderWidth: 1,
        borderColor: "#d1d5db",
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 10,
        fontSize: 16,
    },
    errorBorder: { borderColor: "red" },
    errorText: { color: "red", marginTop: 4, fontSize: 12 },
});
