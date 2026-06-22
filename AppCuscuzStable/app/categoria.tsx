import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export default function Categoria() {
  const { categoria } = useLocalSearchParams();

  const [estabelecimentos, setEstabelecimentos] = useState<any[]>([]);

  useEffect(() => {
    carregarEstabelecimentos();
  }, []);

  async function carregarEstabelecimentos() {
    try {
      const response = await fetch(
        `http://192.168.1.111:3333/estabelecimentos/categoria/${categoria}`,
      );

      const data = await response.json();

      setEstabelecimentos(data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.title}>{categoria}</Text>

      {estabelecimentos.length === 0 && (
        <Text style={styles.empty}>Nenhum estabelecimento encontrado</Text>
      )}

      {estabelecimentos.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={styles.card}
          onPress={() =>
            router.push({
              pathname: "/estabelecimento",
              params: { id: item.id },
            })
          }
        >
          <View>
            <Text style={styles.cardTitle}>{item.nome}</Text>

            <Text style={styles.cardCategory}>{item.categoria}</Text>
          </View>

          <Text style={styles.detail}>Ver detalhes</Text>
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

  title: {
    color: "#fbffda",
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 25,
  },

  empty: {
    color: "white",
    marginTop: 20,
  },

  card: {
    backgroundColor: "#f9ffa1",
    borderRadius: 15,
    padding: 18,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#023f14",
  },

  cardCategory: {
    color: "#ff7a00",
    marginTop: 4,
    fontWeight: "bold",
  },

  detail: {
    color: "#023f14",
    fontWeight: "bold",
  },
});
