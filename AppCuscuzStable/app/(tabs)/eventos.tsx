import React, { useEffect, useState } from "react";
import {
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Eventos() {
  const [eventos, setEventos] = useState<any[]>([]);

  useEffect(() => {
    carregarEventos();
  }, []);

  async function carregarEventos() {
    try {
      const response = await fetch("http://192.168.1.111:3333/eventos");

      const data = await response.json();

      setEventos(data);
    } catch (error) {
      console.log(error);
    }
  }

  function abrirMaps(endereco: string) {
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      endereco,
    )}`;

    Linking.openURL(url);
  }

  function abrirIngresso(link: string) {
    Linking.openURL(link);
  }

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
    >
      <Text style={styles.title}>Eventos da Região</Text>

      {eventos.length === 0 && (
        <Text style={styles.empty}>Nenhum evento disponível</Text>
      )}

      {eventos.map((item, index) => (
        <View key={index} style={styles.card}>
          <Text style={styles.eventTitle}>{item.titulo}</Text>

          <Text style={styles.category}>{item.categoria}</Text>

          <Text style={styles.date}>📅 {item.data_evento}</Text>

          <Text style={styles.eventText}>{item.descricao}</Text>

          <Text style={styles.price}>
            🎟 {item.valor_entrada || "Gratuito"}
          </Text>

          <TouchableOpacity
            style={styles.mapsButton}
            onPress={() => abrirMaps(item.endereco)}
          >
            <Text style={styles.buttonText}>Ver Local</Text>
          </TouchableOpacity>

          {item.link_ingresso && item.link_ingresso !== "" && (
            <TouchableOpacity
              style={styles.ticketButton}
              onPress={() => abrirIngresso(item.link_ingresso)}
            >
              <Text style={styles.buttonText}>Comprar Ingresso</Text>
            </TouchableOpacity>
          )}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#023f14",
    paddingHorizontal: 20,
    paddingTop: 60,
  },

  /*
     PADRÃO GLOBAL DO APP
     EVITA TAB BAR COBRIR O FINAL
  */
  scrollContent: {
    paddingBottom: 120,
  },

  title: {
    color: "#fbffda",
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 25,
  },

  empty: {
    color: "white",
    fontSize: 16,
  },

  card: {
    backgroundColor: "#f9ffa1",
    padding: 18,
    borderRadius: 16,
    marginBottom: 18,
  },

  eventTitle: {
    color: "#023f14",
    fontSize: 20,
    fontWeight: "bold",
  },

  category: {
    color: "#ff7a00",
    marginTop: 6,
    fontWeight: "bold",
  },

  date: {
    color: "#023f14",
    marginTop: 8,
  },

  eventText: {
    color: "#023f14",
    marginTop: 10,
    lineHeight: 20,
  },

  price: {
    color: "#023f14",
    marginTop: 12,
    fontWeight: "bold",
  },

  mapsButton: {
    backgroundColor: "#4285F4",
    marginTop: 15,
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
  },

  ticketButton: {
    backgroundColor: "#ff7a00",
    marginTop: 10,
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
  },

  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
