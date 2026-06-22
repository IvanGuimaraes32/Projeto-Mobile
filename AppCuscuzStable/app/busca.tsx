import { router } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function Busca() {
  const [termo, setTermo] = useState("");
  const [resultados, setResultados] = useState<any[]>([]);
  const [buscou, setBuscou] = useState(false);

  async function buscar() {
    if (!termo.trim()) {
      return;
    }

    try {
      setBuscou(true);

      const response = await fetch(
        `http://192.168.1.111:3333/busca/${termo}`
      );

      const data = await response.json();

      setResultados(data);
    } catch (error) {
      console.log(error);

      Alert.alert("Erro", "Não foi possível realizar busca");
    }
  }

  function abrirResultado(item: any) {
    if (item.tipo === "estabelecimento") {
      router.push({
        pathname: "/estabelecimento",
        params: { id: item.id },
      });
    }
  }

  function iconeTipo(tipo: string) {
    if (tipo === "estabelecimento") return "🏪";
    if (tipo === "evento") return "🎉";
    if (tipo === "promocao") return "🏷️";
    return "•";
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.title}>Buscar</Text>

      <View style={styles.searchRow}>
        <TextInput
          style={styles.input}
          placeholder="Buscar no Aero Busca..."
          placeholderTextColor="#666"
          value={termo}
          onChangeText={setTermo}
          onSubmitEditing={buscar}
        />

        <TouchableOpacity
          style={styles.searchButton}
          onPress={buscar}
        >
          <Text style={styles.searchButtonText}>
            Buscar
          </Text>
        </TouchableOpacity>
      </View>

      {/* SEM RESULTADOS */}
      {buscou && resultados.length === 0 && (
        <Text style={styles.empty}>
          Nenhum resultado encontrado
        </Text>
      )}

      {/* RESULTADOS */}
      {resultados.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={styles.card}
          onPress={() => abrirResultado(item)}
        >
          <Text style={styles.cardTitle}>
            {iconeTipo(item.tipo)} {item.titulo}
          </Text>

          <Text style={styles.cardSub}>
            {item.tipo.toUpperCase()}
          </Text>

          {item.categoria !== "" && (
            <Text style={styles.cardCategory}>
              {item.categoria}
            </Text>
          )}
        </TouchableOpacity>
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

  scrollContent: {
    paddingBottom: 120,
  },

  title: {
    color: "#fbffda",
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
  },

  searchRow: {
    marginBottom: 25,
  },

  input: {
    backgroundColor: "#f9ffa1",
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
    color: "#000",
  },

  searchButton: {
    backgroundColor: "#ff7a00",
    padding: 15,
    borderRadius: 12,
  },

  searchButtonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },

  empty: {
    color: "white",
    marginTop: 20,
    textAlign: "center",
    fontSize: 16,
  },

  card: {
    backgroundColor: "#86d18b",
    padding: 18,
    borderRadius: 14,
    marginBottom: 12,
  },

  cardTitle: {
    color: "#023f14",
    fontWeight: "bold",
    fontSize: 16,
  },

  cardSub: {
    color: "#023f14",
    marginTop: 5,
    fontWeight: "bold",
  },

  cardCategory: {
    color: "#023f14",
    marginTop: 5,
  },
});