import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function PainelRestaurante() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Painel do Restaurante</Text>

      <View style={styles.card}>
        <Text style={styles.number}>124</Text>
        <Text style={styles.label}>Pedidos</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.number}>8</Text>
        <Text style={styles.label}>Eventos Ativos</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.number}>4.8 ⭐</Text>
        <Text style={styles.label}>Avaliação Média</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#023f14",
    padding: 20,
    paddingTop: 60
  },

  title: {
    color: "#fbffda",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20
  },

  card: {
    backgroundColor: "#86d18b",
    padding: 20,
    borderRadius: 15,
    marginBottom: 15
  },

  number: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#023f14"
  },

  label: {
    color: "#023f14",
    marginTop: 5
  }
});