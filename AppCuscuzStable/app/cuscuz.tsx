import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Linking,
} from "react-native";

export default function Cuscuz() {

  function abrirMaps() {

    const url =
      "https://www.google.com/maps/search/?api=1&query=Cuscuz+Pe+de+Serra+Campo+Grande";

    Linking.openURL(url);
  }

  return (
    <ScrollView style={styles.container}>

      <Text style={styles.title}>
        Cuscuz Pé de Serra
      </Text>

      <Text style={styles.description}>

        O Cuscuz Pé de Serra foi fundado em 2021 e, mesmo estando localizado em uma região que ainda não era tão conhecida, conquistou aos poucos o coração do povo campo-grandense. Hoje, temos orgulho de ser um restaurante nordestino de referência em Campo Grande, MS.

        A casa foi fundada por Dona Ana e seu filho, Gustavo. Aqui, todos da equipe são tratados como família, e aqueles que não são parentes acabam se tornando grandes amigos. Dona Ana, a cozinheira e carinhosamente conhecida como a "vózinha" do restaurante, está sempre pronta para acolher mais um netinho, à medida que mais pessoas se apaixonam pelo nosso cantinho nordestino.

        Mais do que servir refeições, buscamos proporcionar uma experiência acolhedora, com o sabor, a tradição e o carinho que fazem parte da cultura nordestina.

      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={abrirMaps}
      >
        <Text style={styles.buttonText}>
          Ver localização no Google Maps
        </Text>
      </TouchableOpacity>

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

  title: {
    color: "#fbffda",
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 30,
  },

  description: {
    color: "white",
    lineHeight: 25,
    marginBottom: 40,
    fontSize: 16,
  },

  button: {
    backgroundColor: "#ff7a00",
    padding: 18,
    borderRadius: 12,
  },

  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
});