import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Estabelecimentos() {
  const [estabelecimentos, setEstabelecimentos] = useState<any[]>([]);

  useEffect(() => {
    carregarEstabelecimentos();
  }, []);

  async function carregarEstabelecimentos() {
    try {
      const response = await fetch(
        "http://192.168.1.111:3333/estabelecimentos"
      );

      const data = await response.json();

      setEstabelecimentos(data);
    } catch (error) {
      console.log("ERRO API:", error);
    }
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>Estabelecimentos</Text>

        <Text style={styles.subtitle}>
          Comércios locais do Aero Rancho
        </Text>
      </View>

      <Text style={styles.sectionTitle}>
        Locais Cadastrados
      </Text>

      {estabelecimentos.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={styles.card}
          onPress={() =>
            router.push({
              pathname: "/estabelecimento",
              params: { id: item.id },
            })
          }
        >
          <View>
            <Text style={styles.cardTitle}>
              {item.nome}
            </Text>

            <Text style={styles.cardCategory}>
              {item.categoria}
            </Text>
          </View>

          <Text style={styles.distance}>
            Ver detalhes
          </Text>
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

  header: {
    marginBottom: 25,
  },

  logo: {
    color: "#fbffda",
    fontSize: 30,
    fontWeight: "bold",
  },

  subtitle: {
    color: "#f9ffdf",
    marginTop: 5,
  },

  sectionTitle: {
    color: "#fbffda",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
  },

  card: {
    backgroundColor: "#86d18b",
    borderRadius: 15,
    padding: 18,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#023f14",
  },

  cardCategory: {
    color: "#023f14",
    marginTop: 4,
  },

  distance: {
    color: "#023f14",
    fontWeight: "bold",
  },
});