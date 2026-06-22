import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import Animated, {
  FadeInUp,
} from "react-native-reanimated";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Home() {
  const [usuario, setUsuario] = useState<any>(null);
  const [meusEstabelecimentos, setMeusEstabelecimentos] = useState<any[]>([]);
  const [promocoes, setPromocoes] = useState<any[]>([]);

  useEffect(() => {
    carregarUsuario();
  }, []);

  async function carregarUsuario() {
    const dados = await AsyncStorage.getItem("usuarioLogado");

    if (dados) {
      const usuarioLogado = JSON.parse(dados);
      setUsuario(usuarioLogado);

      if (usuarioLogado.tipo === "empreendedor") {
        carregarMeusEstabelecimentos(usuarioLogado.id);
      }

      if (usuarioLogado.tipo === "comum") {
        carregarPromocoes(usuarioLogado.id);
      }
    }
  }

  async function carregarMeusEstabelecimentos(usuarioId: number) {
    const response = await fetch(
      `http://192.168.1.111:3333/estabelecimentos/meus/${usuarioId}`,
    );

    const data = await response.json();
    setMeusEstabelecimentos(data);
  }

  async function carregarPromocoes(usuarioId: number) {
    const response = await fetch(
      `http://192.168.1.111:3333/promocoes/seguindo/${usuarioId}`,
    );

    const data = await response.json();
    setPromocoes(data);
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.logo}>Aero Busca</Text>
        <Text style={styles.userInfo}>Olá, {usuario?.nome} 👋</Text>
      </View>

      <TouchableOpacity
        style={styles.searchHome}
        onPress={() => router.push("/busca")}
      >
        <Text style={styles.searchHomeText}>
          🔎 Buscar estabelecimentos, eventos...
        </Text>
      </TouchableOpacity>

      {/* USUARIO COMUM */}
      {usuario?.tipo === "comum" && (
        <>
          <TouchableOpacity
            style={styles.favoriteCard}
            onPress={() => router.push("/favoritos")}
          >
            <Text style={styles.favoriteTitle}>⭐ Meus Favoritos</Text>
            <Text style={styles.favoriteText}>
              acompanhe os comércios que você segue
            </Text>
          </TouchableOpacity>

          <Text style={styles.sectionTitle}>Promoções para você</Text>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {promocoes.length === 0 && (
              <Text style={styles.emptyText}>Nenhuma promoção disponível</Text>
            )}

            {promocoes.map((item, index) => (
              <View key={index} style={styles.promoCard}>
                <Text style={styles.cardTitle}>
                  {item.estabelecimento_nome}
                </Text>

                <Text style={styles.cardCategory}>{item.titulo}</Text>

                <Text style={styles.cardDescription}>{item.descricao}</Text>

                <TouchableOpacity
                  style={styles.smallButton}
                  onPress={() =>
                    router.push({
                      pathname: "/estabelecimento",
                      params: { id: item.estabelecimento_id },
                    })
                  }
                >
                  <Text style={styles.smallButtonText}>Ver comércio</Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        </>
      )}

      {/* EMPREENDEDOR */}
      {usuario?.tipo === "empreendedor" && (
        <>
          <Text style={styles.sectionTitle}>Meu Negócio</Text>

          <View style={styles.actionGrid}>
            <TouchableOpacity
              style={styles.gridButtonGreen}
              onPress={() => router.push("/novaPromocao")}
            >
              <Text style={styles.gridButtonText}>🎁 Promoção</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.gridButtonOrange}
              onPress={() => router.push("/novoEvento")}
            >
              <Text style={styles.gridButtonText}>📅 Evento</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.gridButtonBlue}
            onPress={() => router.push("/novoEstabelecimento")}
          >
            <Text style={styles.gridButtonText}>🏪 Novo Comércio</Text>
          </TouchableOpacity>
          <Text style={styles.sectionTitle}>Seus Estabelecimentos</Text>

          {meusEstabelecimentos.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.businessRow}
              onPress={() =>
                router.push({
                  pathname: "/editarEstabelecimento",
                  params: { id: item.id },
                })
              }
            >
              <View>
                <Text style={styles.businessTitle}>{item.nome}</Text>
                <Text style={styles.businessCategory}>{item.categoria}</Text>
              </View>

              <Text style={styles.editText}>Editar</Text>
            </TouchableOpacity>
          ))}
        </>
      )}

      {/* ADMIN */}
      {usuario?.tipo === "admin" && (
        <>
          <Text style={styles.sectionTitle}>Painel Administrativo</Text>

          <TouchableOpacity
            style={styles.blueButton}
            onPress={() => router.push("/admin")}
          >
            <Text style={styles.actionButtonText}>👤 Aprovações</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.greenButton}
            onPress={() => router.push("/relatorios")}
          >
            <Text style={styles.actionButtonText}>📊 Relatórios</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.orangeButton}
            onPress={() => router.push("/novoEvento")}
          >
            <Text style={styles.actionButtonText}>➕ Novo Evento</Text>
          </TouchableOpacity>
        </>
      )}
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
  searchHome: {
    backgroundColor: "#eeeee9",
    padding: 16,
    borderRadius: 14,
    marginBottom: 20,
  },

  searchHomeText: {
    color: "#023f14",
    fontWeight: "bold",
  },

  scrollContent: {
    paddingBottom: 120,
  },

  header: {
    marginBottom: 25,
  },

  logo: {
    color: "#fbffda",
    fontSize: 34,
    fontWeight: "bold",
  },

  userInfo: {
    color: "#fbffda",
    marginTop: 8,
    fontSize: 17,
  },

  sectionTitle: {
    color: "#fbffda",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
    marginTop: 15,
  },

  favoriteCard: {
    backgroundColor: "#f9ffa1",
    padding: 20,
    borderRadius: 18,
  },

  favoriteTitle: {
    color: "#023f14",
    fontWeight: "bold",
    fontSize: 18,
  },

  favoriteText: {
    color: "#023f14",
    marginTop: 6,
  },

  promoCard: {
    width: 280,
    backgroundColor: "#86d18b",
    padding: 15,
    borderRadius: 15,
    marginRight: 15,
  },

  card: {
    backgroundColor: "#86d18b",
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
  },

  cardTitle: {
    color: "#023f14",
    fontWeight: "bold",
    fontSize: 17,
  },

  cardCategory: {
    color: "#023f14",
    marginTop: 6,
    fontWeight: "bold",
  },

  cardDescription: {
    color: "#023f14",
    marginTop: 8,
  },

  smallButton: {
    backgroundColor: "#023f14",
    padding: 10,
    borderRadius: 8,
    marginTop: 12,
  },

  smallButtonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },

  greenButton: {
    backgroundColor: "#2e8b57",
    padding: 18,
    borderRadius: 12,
    marginBottom: 12,
  },

  orangeButton: {
    backgroundColor: "#ff7a00",
    padding: 18,
    borderRadius: 12,
    marginBottom: 12,
  },

  blueButton: {
    backgroundColor: "#1e90ff",
    padding: 18,
    borderRadius: 12,
    marginBottom: 12,
  },

  actionButtonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },

  emptyText: {
    color: "white",
  },
  businessRow: {
    backgroundColor: "#f9ffa1",
    padding: 16,
    borderRadius: 14,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  businessTitle: {
    color: "#023f14",
    fontSize: 16,
    fontWeight: "bold",
  },

  businessCategory: {
    color: "#ff7a00",
    marginTop: 4,
    fontWeight: "600",
  },

  editText: {
    color: "#023f14",
    fontWeight: "bold",
  },

  actionGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },

  gridButtonGreen: {
    backgroundColor: "#2e8b57",
    width: "48%",
    padding: 22,
    borderRadius: 15,
  },

  gridButtonOrange: {
    backgroundColor: "#ff7a00",
    width: "48%",
    padding: 22,
    borderRadius: 15,
  },

  gridButtonBlue: {
    backgroundColor: "#1e90ff",
    padding: 22,
    borderRadius: 15,
    marginBottom: 20,
  },

  gridButtonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 15,
  },
});
