import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Home() {
  const [estabelecimentos, setEstabelecimentos] = useState<any[]>([]);
  const [usuario, setUsuario] = useState<any>(null);

  useEffect(() => {
    carregarEstabelecimentos();
    carregarUsuario();
  }, []);

  async function carregarEstabelecimentos() {
    try {
      const response = await fetch(
        "http://192.168.1.111:3333/estabelecimentos",
      );

      const data = await response.json();

      setEstabelecimentos(data);
    } catch (error) {
      console.log("ERRO API:", error);
    }
  }

  async function sair() {
    await AsyncStorage.removeItem("usuarioLogado");

    router.replace("/login");
  }

  async function carregarUsuario() {
    const dados = await AsyncStorage.getItem("usuarioLogado");

    if (dados) {
      setUsuario(JSON.parse(dados));
    }
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.topRow}>
          <Text style={styles.logo}>App Aero Busca</Text>

          <TouchableOpacity style={styles.logoutButton} onPress={sair}>
            <Text style={styles.logoutText}>Sair</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.subtitle}>
          Encontre estabelecimentos perto de você
        </Text>

        <Text style={{ color: "#fbffda", marginTop: 5 }}>
          Usuário: {usuario?.nome}
        </Text>

        <Text style={{ color: "#fbffda" }}>Perfil: {usuario?.tipo}</Text>
      </View>

      <View style={styles.banner}>
        <Text style={styles.bannerTitle}>Promoções da Semana</Text>

        <Text style={styles.bannerText}>
          Descontos exclusivos nos estabelecimentos parceiros.
        </Text>
      </View>

      <Text style={styles.sectionTitle}>Estabelecimentos Próximos</Text>

      {/* PERFIL COMUM */}
      {usuario?.tipo === "comum" && (
        <TouchableOpacity style={styles.specialButton}>
          <Text style={styles.specialButtonText}>
            Solicitar Conta Empreendedor
          </Text>
        </TouchableOpacity>
      )}

      {/* PERFIL EMPREENDEDOR */}
      {usuario?.tipo === "empreendedor" && (
        <TouchableOpacity style={styles.specialButton}>
          <Text style={styles.specialButtonText}>Meu Negócio</Text>
        </TouchableOpacity>
      )}

      {/* PERFIL ADMIN */}
      {usuario?.tipo === "admin" && (
        <TouchableOpacity style={styles.specialButton}>
          <Text style={styles.specialButtonText}>Painel Administrador</Text>
        </TouchableOpacity>
      )}

      <Text style={{ color: "white", marginBottom: 10 }}>
        Total carregado: {estabelecimentos.length}
      </Text>

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
            <Text style={styles.cardTitle}>
              {item.nome} - ID: {item.id}
            </Text>

            <Text style={styles.cardCategory}>{item.categoria}</Text>
          </View>

          <Text style={styles.distance}>Ver detalhes</Text>
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

  header: {
    marginBottom: 25,
  },

  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  logo: {
    color: "#fbffda",
    fontSize: 30,
    fontWeight: "bold",
  },

  subtitle: {
    color: "#f9ffdf",
    marginTop: 5,
  },

  logoutButton: {
    backgroundColor: "#ff7a00",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 10,
  },

  logoutText: {
    color: "white",
    fontWeight: "bold",
  },

  banner: {
    backgroundColor: "#f9ffa1",
    borderRadius: 18,
    padding: 20,
    marginBottom: 25,
  },

  bannerTitle: {
    color: "#023f14",
    fontSize: 22,
    fontWeight: "bold",
  },

  bannerText: {
    color: "#023f14",
    marginTop: 8,
  },

  sectionTitle: {
    color: "#fbffda",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
  },

  specialButton: {
    backgroundColor: "#ff7a00",
    padding: 15,
    borderRadius: 12,
    marginBottom: 20,
  },

  specialButtonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },

  card: {
    backgroundColor: "#86d18b",
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
    color: "#023f14",
    marginTop: 4,
  },

  distance: {
    color: "#023f14",
    fontWeight: "bold",
  },
});
