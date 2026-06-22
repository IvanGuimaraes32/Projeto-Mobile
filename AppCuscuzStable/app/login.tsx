import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Linking,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  async function registrarPush(usuarioId: number) {
    try {
      if (!Device.isDevice) {
        return;
      }

      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();

      let finalStatus = existingStatus;

      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== "granted") {
        return;
      }

      const token = (
        await Notifications.getExpoPushTokenAsync({
          projectId: "f5b2578d-29ab-4eed-9c53-0a8630fe6986",
        })
      ).data;

      await fetch("http://192.168.1.111:3333/usuarios/push-token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          usuario_id: usuarioId,
          expo_push_token: token,
        }),
      });
    } catch (error) {
      console.log("Erro push:", error);
    }
  }

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

        await registrarPush(data.usuario.id);

        Alert.alert("Sucesso", `Bem-vindo ${data.usuario.nome}`);

        router.replace("/(tabs)");
      } else {
        Alert.alert("Erro", data.error || "Erro ao fazer login");
      }
    } catch (error) {
      console.log(error);

      Alert.alert("Erro", "Não foi possível conectar ao servidor");
    }
  }

  function recuperarSenha() {
    const url = "mailto:suporte@aerobusca.com?subject=Recuperacao de senha";
    Linking.openURL(url);
  }

  return (
    <KeyboardAvoidingView
      style={styles.keyboardContainer}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          {/* LOGO */}
          <Image
            source={require("../assets/images/logo.png")}
            style={styles.logo}
            resizeMode="contain"
          />

          {/* SUBTÍTULO */}
          <Text style={styles.subtitle}>
            Conectando moradores e comércio local
          </Text>

          {/* CARD */}
          <View style={styles.card}>
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
          </View>

          <TouchableOpacity onPress={recuperarSenha}>
            <Text style={styles.linkText}>Esqueci minha senha</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push("/cadastro")}>
            <Text style={styles.linkText}>Não possui conta? Criar Conta</Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboardContainer: {
    flex: 1,
  },

  container: {
    flex: 1,
    backgroundColor: "#023f14",
    justifyContent: "center",
    padding: 25,
  },

  logo: {
    width: 320,
    height: 240,
    alignSelf: "center",
    marginBottom: 15,
  },

  subtitle: {
    color: "#fbffda",
    textAlign: "center",
    marginBottom: 35,
    fontSize: 15,
    paddingHorizontal: 15,
  },

  card: {
    backgroundColor: "#f9ffa1",
    padding: 25,
    borderRadius: 22,
    marginBottom: 25,
  },

  input: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 12,
    marginBottom: 15,
    fontSize: 15,
  },

  button: {
    backgroundColor: "#ff7a00",
    padding: 18,
    borderRadius: 12,
    marginTop: 5,
  },

  buttonText: {
    textAlign: "center",
    fontWeight: "bold",
    color: "white",
    fontSize: 16,
  },

  linkText: {
    color: "#fbffda",
    marginTop: 15,
    textAlign: "center",
    fontWeight: "bold",
  },
});
