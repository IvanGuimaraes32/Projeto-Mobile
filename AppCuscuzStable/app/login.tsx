import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import React, { useState } from "react";
import {
    Alert,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  async function fazerLogin() {
    try {
      const response = await fetch("http://192.168.1.111:3333/usuarios/login", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          email,
          senha,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        await AsyncStorage.setItem(
          "usuarioLogado",
          JSON.stringify(data.usuario),
        );

        Alert.alert("Sucesso", `Bem-vindo ${data.usuario.nome}`);

        router.replace("/(tabs)");
      } else {
        Alert.alert("Erro", data.error || "Erro ao fazer login");
      }
    } catch (error) {
      console.log("ERRO REAL:", error);

      Alert.alert("Erro DEBUG", JSON.stringify(error));
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        placeholder="Email"
        placeholderTextColor="#666"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />

      <TextInput
        placeholder="Senha"
        placeholderTextColor="#666"
        secureTextEntry
        style={styles.input}
        value={senha}
        onChangeText={setSenha}
      />

      <TouchableOpacity style={styles.button} onPress={fazerLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/cadastro")}>
        <Text style={styles.linkText}>Não possui conta? Criar Conta</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#023f14",
    justifyContent: "center",
    padding: 20,
  },

  title: {
    color: "#fbffda",
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
  },

  input: {
    backgroundColor: "#f9ffa1",
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
  },

  button: {
    backgroundColor: "#86d18b",
    padding: 18,
    borderRadius: 12,
  },

  buttonText: {
    textAlign: "center",
    fontWeight: "bold",
    color: "#023f14",
  },

  linkText: {
    color: "#fbffda",
    marginTop: 20,
    textAlign: "center",
    fontWeight: "bold",
  },
});
