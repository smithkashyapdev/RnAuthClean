import React, { useState } from "react";
import { View, TextInput, Text, StyleSheet, Pressable } from "react-native";
import { Eye, EyeOff } from "lucide-react-native";

interface Props {
    label: string;
    value: string;
    onChangeText: (text: string) => void;
    placeholder?: string;
    error?: string;
}

export default function PasswordInput({
    label,
    value,
    onChangeText,
    placeholder,
    error,
}: Props) {
    const [secure, setSecure] = useState(true);

    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <View style={[styles.inputContainer, error ? styles.errorBorder : null]}>
                <TextInput
                    style={styles.input}
                    value={value}
                    onChangeText={onChangeText}
                    secureTextEntry={secure}
                    placeholder={placeholder}
                    placeholderTextColor="#9ca3af"
                />
                <Pressable onPress={() => setSecure(!secure)}>
                    {secure ? <EyeOff size={20} /> : <Eye size={20} />}
                </Pressable>
            </View>
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { marginBottom: 16 },
    label: { marginBottom: 4, fontWeight: "600" },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#d1d5db",
        borderRadius: 8,
        paddingHorizontal: 12,
    },
    input: { flex: 1, paddingVertical: 10, fontSize: 16 },
    errorBorder: { borderColor: "red" },
    errorText: { color: "red", marginTop: 4, fontSize: 12 },
});
