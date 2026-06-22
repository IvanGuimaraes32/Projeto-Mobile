import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Favoritos() {
  const [usuario, setUsuario] = useState<any>(null);
  const [favoritos, setFavoritos] = useState<any[]>([]);

  useEffect(() => {
    carregarUsuario();
  }, []);

  async function carregarUsuario() {
    const dados = await AsyncStorage.getItem("usuarioLogado");

    if (dados) {
      const usuarioLogado = JSON.parse(dados);

      setUsuario(usuarioLogado);

      carregarFavoritos(usuarioLogado.id);
    }
  }

  async function carregarFavoritos(usuarioId: number) {
    try {
      const response = await fetch(
        `http://192.168.1.111:3333/favoritos/${usuarioId}`,
      );

      const data = await response.json();

      setFavoritos(data);
    } catch (error) {
      console.log(error);
    }
  }

  async function pararDeSeguir(estabelecimentoId: number) {
    try {
      const response = await fetch("http://192.168.1.111:3333/favoritos", {
        method: "DELETE",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          usuario_id: usuario.id,
          estabelecimento_id: estabelecimentoId,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert("Sucesso", "Você deixou de seguir este comércio");

        carregarFavoritos(usuario.id);
      } else {
        Alert.alert("Erro", data.error);
      }
    } catch (error) {
      console.log(error);

      Alert.alert("Erro", "Não foi possível atualizar");
    }
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.title}>Comércios que eu sigo</Text>

      {favoritos.length === 0 && (
        <Text style={styles.empty}>Você ainda não segue nenhum comércio</Text>
      )}

      {favoritos.map((item, index) => (
        <View key={index} style={styles.card}>
          <Text style={styles.nome}>{item.nome}</Text>

          <Text style={styles.categoria}>{item.categoria}</Text>

          <Text style={styles.endereco}>{item.endereco}</Text>

          <TouchableOpacity
            style={styles.button}
            onPress={() => pararDeSeguir(item.estabelecimento_id)}
          >
            <Text style={styles.buttonText}>Parar de seguir</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#023f14",
    padding: 20,
    paddingTop: 60,
  },

  /*
     ESPAÇO PARA NÃO FICAR ATRÁS DA TAB BAR
  */
  scrollContent: {
    paddingBottom: 120,
  },

  title: {
    color: "#fbffda",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },

  empty: {
    color: "white",
    marginTop: 20,
  },

  card: {
    backgroundColor: "#f9ffa1",
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
  },

  nome: {
    color: "#023f14",
    fontSize: 18,
    fontWeight: "bold",
  },

  categoria: {
    color: "#ff7a00",
    marginTop: 5,
    fontWeight: "bold",
  },

  endereco: {
    color: "#023f14",
    marginTop: 8,
  },

  button: {
    backgroundColor: "#b22222",
    padding: 14,
    borderRadius: 10,
    marginTop: 15,
  },

  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
});
