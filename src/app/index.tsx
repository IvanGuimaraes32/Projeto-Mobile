import React from "react";
import { router } from "expo-router";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity
} from "react-native";

const restaurantes = [
  {
    nome: "Hamburgueria do Cuscuz",
    categoria: "Hambúrguer",
    distancia: "1.2 km"
  },
  {
    nome: "Pizza do Pedrinho",
    categoria: "Pizza",
    distancia: "2.8 km"
  },
  {
    nome: "Sushi Loko",
    categoria: "Japonesa",
    distancia: "3.5 km"
  },
  {
    nome: "Açaí",
    categoria: "Açaí",
    distancia: "800 m"
  }
];

export default function Home() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>🍽️ App Cuscuz</Text>

        <Text style={styles.subtitle}>
          Encontre restaurantes perto de você
        </Text>
      </View>

      <View style={styles.banner}>
        <Text style={styles.bannerTitle}>
          Promoções da Semana
        </Text>

        <Text style={styles.bannerText}>
          Descontos exclusivos nos restaurantes parceiros.
        </Text>
      </View>

      <Text style={styles.sectionTitle}>
        Restaurantes Próximos
      </Text>

      {restaurantes.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={styles.card}
          onPress={() => router.push("/restaurante")}
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
            {item.distancia}
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
    paddingTop: 60
  },

  header: {
    marginBottom: 25
  },

  logo: {
    color: "#fbffda",
    fontSize: 30,
    fontWeight: "bold"
  },

  subtitle: {
    color: "#f9ffdf",
    marginTop: 5
  },

  banner: {
    backgroundColor: "#f9ffa1",
    borderRadius: 18,
    padding: 20,
    marginBottom: 25
  },

  bannerTitle: {
    color: "#023f14",
    fontSize: 22,
    fontWeight: "bold"
  },

  bannerText: {
    color: "#023f14",
    marginTop: 8
  },

  sectionTitle: {
    color: "#fbffda",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15
  },

  card: {
    backgroundColor: "#86d18b",
    borderRadius: 15,
    padding: 18,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#023f14"
  },

  cardCategory: {
    color: "#023f14",
    marginTop: 4
  },

  distance: {
    color: "#023f14",
    fontWeight: "bold"
  }
});