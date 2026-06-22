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

export default function Cadastro() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  async function criarConta() {
    try {
      const response = await fetch(
        "http://192.168.1.111:3333/usuarios/register",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            nome,
            email,
            senha,
          }),
        },
      );

      const data = await response.json();

      if (response.ok) {
        Alert.alert("Sucesso", "Conta criada com sucesso", [
          {
            text: "OK",
            onPress: () => router.replace("/login"),
          },
        ]);

        setNome("");
        setEmail("");
        setSenha("");
      } else {
        Alert.alert("Erro", data.error || "Erro ao cadastrar");
      }
    } catch (error) {
      console.log(error);

      Alert.alert("Erro", "Não foi possível conectar ao servidor");
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro</Text>

      <TextInput
        placeholder="Nome"
        placeholderTextColor="#666"
        style={styles.input}
        value={nome}
        onChangeText={setNome}
      />

      <TextInput
        placeholder="Email"
        placeholderTextColor="#666"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        placeholder="Senha"
        placeholderTextColor="#666"
        secureTextEntry
        style={styles.input}
        value={senha}
        onChangeText={setSenha}
      />

      <TouchableOpacity style={styles.button} onPress={criarConta}>
        <Text style={styles.buttonText}>Criar Conta</Text>
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
});
