import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Perfil() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meu Perfil</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Nome</Text>
        <Text style={styles.value}>Pedro</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Email</Text>
        <Text style={styles.value}>pedro@email.com</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Pedidos realizados</Text>
        <Text style={styles.value}>12</Text>
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

  label: {
    color: "#023f14",
    fontWeight: "bold",
    marginBottom: 5
  },

  value: {
    color: "#023f14",
    fontSize: 16
  }
});