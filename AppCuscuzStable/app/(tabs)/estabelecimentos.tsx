import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Estabelecimentos() {
  const categorias = [
    {
      nome: "Mercado",
      icon: "cart",
      cor: "#2e8b57",
    },

    {
      nome: "Padaria",
      icon: "cafe",
      cor: "#d2691e",
    },

    {
      nome: "Restaurante",
      icon: "restaurant",
      cor: "#ff7a00",
    },

    {
      nome: "Lanchonete",
      icon: "fast-food",
      cor: "#ff6347",
    },

    {
      nome: "Farmácia",
      icon: "medical",
      cor: "#4169e1",
    },

    {
      nome: "Academia",
      icon: "barbell",
      cor: "#228b22",
    },

    {
      nome: "Salão",
      icon: "cut",
      cor: "#c71585",
    },

    {
      nome: "Salão de Beleza",
      icon: "sparkles",
      cor: "#da70d6",
    },

    {
      nome: "Pet Shop",
      icon: "paw",
      cor: "#8b4513",
    },

    {
      nome: "Loja",
      icon: "bag",
      cor: "#9370db",
    },

    {
      nome: "Serviços Gerais",
      icon: "construct",
      cor: "#708090",
    },
  ];

  function abrirCategoria(nome: string) {
    router.push({
      pathname: "/categoria",
      params: { categoria: nome },
    });
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Text style={styles.logo}>Explorar</Text>

        <Text style={styles.subtitle}>Escolha uma categoria</Text>
      </View>

      {categorias.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={[styles.card, { backgroundColor: item.cor }]}
          onPress={() => abrirCategoria(item.nome)}
        >
          <View style={styles.row}>
            <Ionicons name={item.icon as any} size={28} color="white" />

            <Text style={styles.cardText}>{item.nome}</Text>
          </View>
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

  card: {
    borderRadius: 15,
    padding: 20,
    marginBottom: 14,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
  },

  cardText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 15,
  },
});
