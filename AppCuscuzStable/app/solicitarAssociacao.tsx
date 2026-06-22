import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

export default function SolicitarAssociacao() {
  const [usuario, setUsuario] = useState<any>(null);
  const [estabelecimentos, setEstabelecimentos] = useState<any[]>([]);
  const [estabelecimentosFiltrados, setEstabelecimentosFiltrados] = useState<
    any[]
  >([]);
  const [pesquisa, setPesquisa] = useState("");

  useEffect(() => {
    carregarUsuario();
    carregarEstabelecimentos();
  }, []);

  async function carregarUsuario() {
    const dados = await AsyncStorage.getItem("usuarioLogado");

    if (dados) {
      setUsuario(JSON.parse(dados));
    }
  }

  async function carregarEstabelecimentos() {
    try {
      const response = await fetch(
        "http://192.168.1.111:3333/estabelecimentos/sem-dono",
      );

      const data = await response.json();

      setEstabelecimentos(data);
      setEstabelecimentosFiltrados(data);
    } catch (error) {
      console.log(error);

      Alert.alert("Erro", "Não foi possível carregar estabelecimentos");
    }
  }

  function pesquisarEstabelecimento(texto: string) {
    setPesquisa(texto);

    if (texto.trim() === "") {
      setEstabelecimentosFiltrados(estabelecimentos);
      return;
    }

    const filtrados = estabelecimentos.filter((item) =>
      item.nome.toLowerCase().includes(texto.toLowerCase()),
    );

    setEstabelecimentosFiltrados(filtrados);
  }

  async function solicitarAssociacao(estabelecimentoId: number) {
    try {
      const response = await fetch(
        "http://192.168.1.111:3333/estabelecimentos/solicitar-associacao",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            usuario_id: usuario.id,
            estabelecimento_id: estabelecimentoId,
          }),
        },
      );

      const data = await response.json();

      if (response.ok) {
        Alert.alert(
          "Sucesso",
          "Solicitação enviada para aprovação do administrador",
        );
      } else {
        Alert.alert("Erro", data.error);
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
      <Text style={styles.title}>Associar Estabelecimento Existente</Text>

      <TextInput
        style={styles.input}
        placeholder="Pesquisar estabelecimento..."
        placeholderTextColor="#666"
        value={pesquisa}
        onChangeText={pesquisarEstabelecimento}
      />

      {estabelecimentosFiltrados.length === 0 && (
        <Text style={styles.empty}>Nenhum estabelecimento encontrado</Text>
      )}

      {estabelecimentosFiltrados.map((item, index) => (
        <View key={index} style={styles.card}>
          <Text style={styles.nome}>{item.nome}</Text>

          <Text style={styles.info}>{item.categoria}</Text>

          <Text style={styles.info}>{item.endereco}</Text>

          <TouchableOpacity
            style={styles.button}
            onPress={() => solicitarAssociacao(item.id)}
          >
            <Text style={styles.buttonText}>Solicitar Associação</Text>
          </TouchableOpacity>
        </View>
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

  /*
     ESPAÇO FINAL PARA NÃO FICAR ATRÁS DA BARRA
  */
  scrollContent: {
    paddingBottom: 120,
  },

  title: {
    color: "#fbffda",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },

  input: {
    backgroundColor: "#f9ffa1",
    padding: 15,
    borderRadius: 12,
    marginBottom: 20,
    color: "#000",
  },

  card: {
    backgroundColor: "#f9ffa1",
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
  },

  nome: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#023f14",
  },

  info: {
    color: "#023f14",
    marginTop: 5,
  },

  button: {
    backgroundColor: "#ff7a00",
    padding: 14,
    borderRadius: 10,
    marginTop: 15,
  },

  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },

  empty: {
    color: "white",
    fontSize: 18,
  },
});
