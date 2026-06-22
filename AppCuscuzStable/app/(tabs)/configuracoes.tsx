import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Configuracoes() {
  const [usuario, setUsuario] = useState<any>(null);

  useEffect(() => {
    carregarUsuario();
  }, []);

  async function carregarUsuario() {
    const dados = await AsyncStorage.getItem("usuarioLogado");

    if (dados) {
      setUsuario(JSON.parse(dados));
    }
  }

  async function sair() {
    await AsyncStorage.removeItem("usuarioLogado");
    router.replace("/login");
  }

  function abrirCuscuz() {
    router.push("/cuscuz");
  }

  function abrirAdmin() {
    router.push("/admin");
  }

  function abrirAssociacao() {
    router.push("/solicitarAssociacao");
  }

  function abrirImportacaoCSV() {
    router.push("/importarCSV");
  }

  function enviarFeedback() {
    const url = "mailto:ivan18grn@gmail.com?subject=Feedback Aero Busca";
    Linking.openURL(url);
  }

  async function solicitarUpgrade() {
    try {
      const response = await fetch(
        "http://192.168.1.111:3333/usuarios/solicitar-upgrade",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            usuario_id: usuario.id,
          }),
        },
      );

      const data = await response.json();

      if (response.ok) {
        const usuarioAtualizado = {
          ...usuario,
          solicitou_upgrade: 1,
        };

        setUsuario(usuarioAtualizado);

        await AsyncStorage.setItem(
          "usuarioLogado",
          JSON.stringify(usuarioAtualizado),
        );

        Alert.alert("Sucesso", "Solicitação enviada com sucesso");
      } else {
        Alert.alert("Erro", data.error || "Erro ao enviar solicitação");
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Erro", "Não foi possível enviar solicitação");
    }
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.title}>Configurações</Text>

      {/* PERFIL */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Meu Perfil</Text>

        <Text style={styles.info}>Nome: {usuario?.nome}</Text>

        <Text style={styles.info}>Email: {usuario?.email}</Text>

        <Text style={styles.info}>Perfil: {usuario?.tipo}</Text>
      </View>

      {/* USUÁRIO COMUM */}
      {usuario?.tipo === "comum" && usuario?.solicitou_upgrade === 0 && (
        <TouchableOpacity style={styles.button} onPress={solicitarUpgrade}>
          <Text style={styles.buttonText}>Solicitar Perfil Empreendedor</Text>
        </TouchableOpacity>
      )}

      {/* SOLICITAÇÃO ENVIADA */}
      {usuario?.solicitou_upgrade === 1 && (
        <TouchableOpacity style={styles.disabledButton} disabled={true}>
          <Text style={styles.buttonText}>Solicitação Enviada</Text>
        </TouchableOpacity>
      )}

      {/* EMPREENDEDOR */}
      {usuario?.tipo === "empreendedor" && (
        <TouchableOpacity
          style={styles.associationButton}
          onPress={abrirAssociacao}
        >
          <Text style={styles.buttonText}>
            Associar Estabelecimento Existente
          </Text>
        </TouchableOpacity>
      )}

      {/* ADMIN */}
      {usuario?.tipo === "admin" && (
        <>
          <TouchableOpacity style={styles.adminButton} onPress={abrirAdmin}>
            <Text style={styles.buttonText}>Painel Administrador</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.csvButton}
            onPress={abrirImportacaoCSV}
          >
            <Text style={styles.buttonText}>Importar CSV Estabelecimentos</Text>
          </TouchableOpacity>
        </>
      )}

      {/* FEEDBACK */}
      <TouchableOpacity style={styles.button} onPress={enviarFeedback}>
        <Text style={styles.buttonText}>Ajude-nos a melhorar</Text>
      </TouchableOpacity>

      {/* CUSCUZ */}
      <TouchableOpacity style={styles.button} onPress={abrirCuscuz}>
        <Text style={styles.buttonText}>Conheça o Cuscuz Pé de Serra</Text>
      </TouchableOpacity>

      {/* LOGOUT */}
      <TouchableOpacity style={styles.logoutButton} onPress={sair}>
        <Text style={styles.buttonText}>Sair</Text>
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

  /*
     ESPAÇO FINAL PARA NÃO FICAR ATRÁS DA TAB BAR
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

  card: {
    backgroundColor: "#f9ffa1",
    padding: 20,
    borderRadius: 15,
    marginBottom: 25,
  },

  cardTitle: {
    color: "#023f14",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },

  info: {
    color: "#023f14",
    marginBottom: 5,
    fontSize: 15,
  },

  button: {
    backgroundColor: "#ff7a00",
    padding: 18,
    borderRadius: 12,
    marginBottom: 15,
  },

  adminButton: {
    backgroundColor: "#1e90ff",
    padding: 18,
    borderRadius: 12,
    marginBottom: 15,
  },

  csvButton: {
    backgroundColor: "#6a0dad",
    padding: 18,
    borderRadius: 12,
    marginBottom: 15,
  },

  associationButton: {
    backgroundColor: "#2e8b57",
    padding: 18,
    borderRadius: 12,
    marginBottom: 15,
  },

  disabledButton: {
    backgroundColor: "#777",
    padding: 18,
    borderRadius: 12,
    marginBottom: 15,
  },

  logoutButton: {
    backgroundColor: "#b22222",
    padding: 18,
    borderRadius: 12,
    marginBottom: 20,
  },

  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
});
