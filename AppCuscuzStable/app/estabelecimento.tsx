import { FontAwesome, Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
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
  const [usuario, setUsuario] = useState<any>(null);
  const [seguindo, setSeguindo] = useState(false);

  useEffect(() => {
    carregarEstabelecimento();
    carregarUsuario();
  }, []);

  async function carregarUsuario() {
    const dados = await AsyncStorage.getItem("usuarioLogado");

    if (dados) {
      const usuarioLogado = JSON.parse(dados);

      setUsuario(usuarioLogado);

      verificarSeSegue(usuarioLogado.id);
    }
  }

  async function verificarSeSegue(usuarioId: number) {
    try {
      const response = await fetch(
        `http://192.168.1.111:3333/favoritos/verificar/${usuarioId}/${id}`,
      );

      const data = await response.json();

      setSeguindo(data.seguindo);
    } catch (error) {
      console.log(error);
    }
  }

  async function carregarEstabelecimento() {
    try {
      const response = await fetch(
        `http://192.168.1.111:3333/estabelecimentos/${id}`,
      );

      const data = await response.json();

      setEstabelecimento(data);
    } catch (error) {
      console.log(error);
    }
  }

  async function acompanhar() {
    try {
      const response = await fetch("http://192.168.1.111:3333/favoritos", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          usuario_id: usuario.id,
          estabelecimento_id: estabelecimento.id,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSeguindo(data.seguindo);

        Alert.alert("Sucesso", data.message);
      } else {
        Alert.alert("Erro", data.error);
      }
    } catch (error) {
      console.log(error);
    }
  }

  function abrirWhatsApp() {
    Linking.openURL(`https://wa.me/${estabelecimento.telefone_whatsapp}`);
  }

  function abrirMaps() {
    Linking.openURL(
      `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        estabelecimento.endereco,
      )}`,
    );
  }

  if (!estabelecimento) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#f9ffa1" />
        <Text style={styles.loadingText}>Carregando estabelecimento...</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      {estabelecimento.imagem ? (
        <Image source={{ uri: estabelecimento.imagem }} style={styles.image} />
      ) : (
        <View style={styles.placeholder}>
          <Text style={styles.placeholderText}>Sem imagem</Text>
        </View>
      )}

      <View style={styles.banner}>
        <Text style={styles.bannerTitle}>{estabelecimento.nome}</Text>
        <Text style={styles.categoryBadge}>{estabelecimento.categoria}</Text>
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.infoTitle}>📝 Sobre</Text>

        <Text style={styles.infoText}>
          {estabelecimento.descricao || "Sem descrição cadastrada"}
        </Text>
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.infoTitle}>📍 Endereço</Text>

        <Text style={styles.infoText}>{estabelecimento.endereco}</Text>
      </View>

      <TouchableOpacity
        style={seguindo ? styles.followingButton : styles.followButton}
        onPress={acompanhar}
      >
        <Text style={styles.buttonText}>
          {seguindo ? "★ Seguindo" : "☆ Seguir este comércio"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.mapsButton} onPress={abrirMaps}>
        <Ionicons name="location" size={22} color="white" />

        <Text style={styles.iconButtonText}>Ver localização</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.whatsappButton} onPress={abrirWhatsApp}>
        <FontAwesome name="whatsapp" size={22} color="white" />

        <Text style={styles.iconButtonText}>Falar no WhatsApp</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#023f14",
  },

  scrollContent: {
    paddingBottom: 120,
  },

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#023f14",
  },

  loadingText: {
    color: "white",
    marginTop: 15,
    fontSize: 16,
  },

  image: {
    width: "100%",
    height: 230,
  },

  placeholder: {
    height: 230,
    backgroundColor: "#444",
    justifyContent: "center",
    alignItems: "center",
  },

  placeholderText: {
    color: "white",
  },

  banner: {
    backgroundColor: "#ff7a00",
    padding: 25,
  },

  bannerTitle: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
  },

  categoryBadge: {
    backgroundColor: "#ffffff30",
    color: "white",
    marginTop: 12,
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    fontWeight: "bold",
  },

  infoCard: {
    backgroundColor: "#145c2a",
    marginHorizontal: 20,
    marginTop: 18,
    padding: 18,
    borderRadius: 14,
  },

  infoTitle: {
    color: "#f9ffa1",
    fontSize: 18,
    fontWeight: "bold",
  },

  infoText: {
    color: "white",
    marginTop: 10,
    lineHeight: 22,
  },

  followButton: {
    backgroundColor: "#ff7a00",
    margin: 20,
    padding: 18,
    borderRadius: 12,
  },

  followingButton: {
    backgroundColor: "#d4af37",
    margin: 20,
    padding: 18,
    borderRadius: 12,
  },

  mapsButton: {
    backgroundColor: "#4285F4",
    marginHorizontal: 20,
    marginBottom: 15,
    padding: 18,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },

  whatsappButton: {
    backgroundColor: "#25D366",
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 18,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },

  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 15,
  },

  iconButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 15,
  },
});
