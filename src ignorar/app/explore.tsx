import React from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet
} from "react-native";

export default function Explore() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Eventos e Promoções</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>
          Festival do Hambúrguer
        </Text>

        <Text style={styles.cardText}>
          Descontos especiais durante toda a semana.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>
          Noite da Pizza
        </Text>

        <Text style={styles.cardText}>
          Rodízio promocional para clientes cadastrados.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>
          Festival do Açaí
        </Text>

        <Text style={styles.cardText}>
          Combos e brindes exclusivos.
        </Text>
      </View>
    </ScrollView>
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

  cardTitle: {
    color: "#023f14",
    fontSize: 18,
    fontWeight: "bold"
  },

  cardText: {
    color: "#023f14",
    marginTop: 8
  }
});