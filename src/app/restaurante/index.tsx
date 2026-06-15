import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity
} from "react-native";

export default function Estabelecimento() {
  return (
    <ScrollView style={styles.container}>

      <View style={styles.banner}>
        <Text style={styles.bannerTitle}>
          Hamburgueria do Cuscuz
        </Text>

        <Text style={styles.bannerSub}>
          Hambúrguer
        </Text>
      </View>

      <View style={styles.info}>
        <Text style={styles.title}>
          Sobre o estabelecimento
        </Text>

        <Text style={styles.description}>
          Os melhores produtos e serviços da região,
          conectando moradores do Aero Rancho aos
          estabelecimentos locais.
        </Text>
      </View>

      <View style={styles.eventBox}>
        <Text style={styles.eventTitle}>
          📍 Endereço
        </Text>

        <Text style={styles.eventText}>
          Rua Exemplo, 250 - Aero Rancho
        </Text>
      </View>

      <Text style={styles.section}>
        Informações
      </Text>

      <View style={styles.item}>
        <View>
          <Text style={styles.itemName}>
            Categoria
          </Text>

          <Text style={styles.itemDescription}>
            Hamburgueria
          </Text>
        </View>
      </View>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>
          Abrir no Google Maps
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>
          Falar no WhatsApp
        </Text>
      </TouchableOpacity>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#004d1a"
  },

  banner: {
    backgroundColor: "#ff7a00",
    padding: 30,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25
  },

  bannerTitle: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold"
  },

  bannerSub: {
    color: "#fff",
    marginTop: 5
  },

  info: {
    padding: 20
  },

  title: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold"
  },

  description: {
    color: "#ddd",
    marginTop: 10,
    lineHeight: 22
  },

  eventBox: {
    backgroundColor: "#ff7a00",
    margin: 20,
    borderRadius: 15,
    padding: 15
  },

  eventTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold"
  },

  eventText: {
    color: "#fff",
    marginTop: 5
  },

  section: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    marginHorizontal: 20,
    marginBottom: 15
  },

  item: {
    backgroundColor: "#0b6e2d",
    marginHorizontal: 20,
    marginBottom: 12,
    padding: 15,
    borderRadius: 15,
    flexDirection: "row",
    justifyContent: "space-between"
  },

  itemName: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "bold"
  },

  itemDescription: {
    color: "#ccc",
    marginTop: 5
  },

  button: {
    backgroundColor: "#ff7a00",
    margin: 20,
    padding: 18,
    borderRadius: 15,
    alignItems: "center"
  },

  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold"
  }
});