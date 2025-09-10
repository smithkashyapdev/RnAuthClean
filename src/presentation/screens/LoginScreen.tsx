import React, { useState } from "react";
import { View, Text, Alert, StyleSheet } from "react-native";
import { useAuth } from "../../context/AuthContext";
import FormTextInput from "@/presentation/components/FormTextInput";
import PasswordInput from "@/presentation/components/PasswordInput";
import Button from "@/presentation/components/Button";
import { isEmail } from "@/utils/validators";

export default function LoginScreen({ navigation }: any) {
    const { login } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<{ email?: string; password?: string }>(
        {}
    );

    const submit = async () => {
        const e: any = {};
        if (!isEmail(email)) e.email = "Invalid email format";
        if (!password) e.password = "Password required";
        setErrors(e);
        if (Object.keys(e).length) return;

        try {
            setLoading(true);
            await login(email, password);
        } catch (err: any) {
            Alert.alert("Login failed", err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Welcome back</Text>

            <FormTextInput
                label="Email"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
                placeholder="you@example.com"
                error={errors.email}
            />

            <PasswordInput
                label="Password"
                value={password}
                onChangeText={setPassword}
                placeholder="••••••"
                error={errors.password}
            />

            <Button
                title={loading ? "Logging in..." : "Login"}
                onPress={submit}
                loading={loading}
            />

            <Text style={styles.link}>
                No account?{" "}
                <Text
                    style={styles.linkText}
                    onPress={() => navigation.navigate("Signup")}
                >
                    Go to Signup
                </Text>
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, paddingTop: 24 },
    heading: { fontSize: 28, fontWeight: "700", marginBottom: 16 },
    link: { marginTop: 16 },
    linkText: { color: "#2563eb" },
});
