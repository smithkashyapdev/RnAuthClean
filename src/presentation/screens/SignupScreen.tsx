import React, { useState } from "react";
import { View, Text, Alert, StyleSheet } from "react-native";
import { useAuth } from "../../context/AuthContext";
import FormTextInput from "../components/FormTextInput";
import PasswordInput from "../components/PasswordInput";
import Button from "../components/Button";
import { isEmail, minLen } from "../../utils/validators";

export default function SignupScreen({ navigation }: any) {
    const { signup } = useAuth();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<{
        name?: string;
        email?: string;
        password?: string;
    }>({});

    const submit = async () => {
        const e: any = {};
        if (!name) e.name = "Name required";
        if (!isEmail(email)) e.email = "Invalid email";
        if (!minLen(password, 6)) e.password = "Password must be ≥ 6 chars";
        setErrors(e);
        if (Object.keys(e).length) return;

        try {
            setLoading(true);
            await signup(name, email, password);
        } catch (err: any) {
            Alert.alert("Signup failed", err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Create account</Text>

            <FormTextInput
                label="Name"
                value={name}
                onChangeText={setName}
                placeholder="Jane Doe"
                error={errors.name}
            />

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
                placeholder="Min 6 characters"
                error={errors.password}
            />

            <Button
                title={loading ? "Signing up..." : "Signup"}
                onPress={submit}
                loading={loading}
            />

            <Text style={styles.link}>
                Already have an account?{" "}
                <Text
                    style={styles.linkText}
                    onPress={() => navigation.navigate("Login")}
                >
                    Go to Login
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
