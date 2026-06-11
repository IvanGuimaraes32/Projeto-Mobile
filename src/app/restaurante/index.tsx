import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity
} from "react-native";

export default function Restaurante() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.banner}>
        <Text style={styles.bannerTitle}>
          Hamburgueria do Cuscuz
        </Text>

        <Text style={styles.bannerSub}>
          Hambúrguer • 1.2 km
        </Text>
      </View>

      <View style={styles.info}>
        <Text style={styles.title}>
          Sobre o restaurante
        </Text>

        <Text style={styles.description}>
          Os melhores hambúrgueres artesanais da cidade,
          preparados com ingredientes selecionados e
          muito sabor.
        </Text>
      </View>

      <View style={styles.eventBox}>
        <Text style={styles.eventTitle}>
          🎉 Evento da Semana
        </Text>

        <Text style={styles.eventText}>
          Combo especial com 20% de desconto até domingo.
        </Text>
      </View>

      <Text style={styles.section}>
        Cardápio
      </Text>

      <View style={styles.item}>
        <View>
          <Text style={styles.itemName}>
            X-Burguer Artesanal
          </Text>

          <Text style={styles.itemDescription}>
            Carne, queijo e molho especial
          </Text>
        </View>

        <Text style={styles.price}>
          R$ 29,90
        </Text>
      </View>

      <View style={styles.item}>
        <View>
          <Text style={styles.itemName}>
            X-Bacon
          </Text>

          <Text style={styles.itemDescription}>
            Carne, bacon e cheddar
          </Text>
        </View>

        <Text style={styles.price}>
          R$ 34,90
        </Text>
      </View>

      <View style={styles.item}>
        <View>
          <Text style={styles.itemName}>
            Batata Frita
          </Text>

          <Text style={styles.itemDescription}>
            Porção grande
          </Text>
        </View>

        <Text style={styles.price}>
          R$ 19,90
        </Text>
      </View>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>
          Fazer Pedido
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

  price: {
    color: "#ff7a00",
    fontWeight: "bold",
    fontSize: 16
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