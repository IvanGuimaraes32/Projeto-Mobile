import { FontAwesome } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Estabelecimento() {
  const { id } = useLocalSearchParams();

  const [estabelecimento, setEstabelecimento] = useState<any>(null);

  useEffect(() => {
    carregarEstabelecimento();
  }, []);

  async function carregarEstabelecimento() {
    try {
      const response = await fetch(
        `http://192.168.1.111:3333/estabelecimentos/${id}`,
      );

      const data = await response.json();

      console.log(data);

      setEstabelecimento(data);
    } catch (error) {
      console.log("ERRO API:", error);
    }
  }

  function abrirWhatsApp() {
    const telefone = estabelecimento.telefone_whatsapp;
    const url = `https://wa.me/${telefone}`;
    Linking.openURL(url);
  }

  function abrirMaps() {
    const endereco = estabelecimento.endereco;

    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(endereco)}`;

    Linking.openURL(url);
  }

  if (!estabelecimento) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Carregando...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.banner}>
        <Text style={styles.bannerTitle}>{estabelecimento.nome}</Text>

        <Text style={styles.bannerSub}>{estabelecimento.categoria}</Text>
      </View>

      <View style={styles.info}>
        <Text style={styles.title}>Sobre o estabelecimento</Text>

        <Text style={styles.description}>
          {estabelecimento.descricao || "Sem descrição cadastrada"}
        </Text>
      </View>

      <View style={styles.info}>
        <Text style={styles.title}>Endereço</Text>

        <Text style={styles.description}>
          {estabelecimento.endereco || "Endereço não informado"}
        </Text>
      </View>

      <TouchableOpacity style={styles.mapsButton} onPress={abrirMaps}>
        <View style={styles.mapsContent}>
          <FontAwesome name="map-marker" size={22} color="white" />

          <Text style={styles.mapsText}>Abrir no Google Maps</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.whatsappButton} onPress={abrirWhatsApp}>
        <View style={styles.whatsappContent}>
          <FontAwesome name="whatsapp" size={24} color="white" />

          <Text style={styles.whatsappText}>Falar no WhatsApp</Text>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#004d1a",
  },

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#004d1a",
  },

  loadingText: {
    color: "white",
    fontSize: 20,
  },

  banner: {
    backgroundColor: "#ff7a00",
    padding: 30,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },

  bannerTitle: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
  },

  bannerSub: {
    color: "#fff",
    marginTop: 5,
  },

  info: {
    padding: 20,
  },

  title: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
  },

  description: {
    color: "#ddd",
    marginTop: 10,
    lineHeight: 22,
  },

  button: {
    backgroundColor: "#ff7a00",
    margin: 20,
    padding: 18,
    borderRadius: 15,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },

  whatsappButton: {
    backgroundColor: "#25D366",
    margin: 20,
    padding: 18,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },

  whatsappContent: {
    flexDirection: "row",
    alignItems: "center",
  },

  whatsappText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },
  mapsButton: {
    backgroundColor: "#4285F4",
    margin: 20,
    padding: 18,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },

  mapsContent: {
    flexDirection: "row",
    alignItems: "center",
  },

  mapsText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },
});
