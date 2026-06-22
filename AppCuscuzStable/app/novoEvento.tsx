import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
} from "react-native";

export default function NovoEvento() {
  const [usuario, setUsuario] = useState<any>(null);

  const [titulo, setTitulo] = useState("");
  const [categoria, setCategoria] = useState("");
  const [descricao, setDescricao] = useState("");
  const [dataEvento, setDataEvento] = useState("");
  const [endereco, setEndereco] = useState("");
  const [valorEntrada, setValorEntrada] = useState("");
  const [linkIngresso, setLinkIngresso] = useState("");

  useEffect(() => {
    carregarUsuario();
  }, []);

  async function carregarUsuario() {
    const dados = await AsyncStorage.getItem("usuarioLogado");

    if (dados) {
      setUsuario(JSON.parse(dados));
    }
  }

  async function salvarEvento() {
    try {
      const response = await fetch("http://192.168.1.111:3333/eventos", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          titulo,
          categoria,
          descricao,
          data_evento: dataEvento,
          endereco,
          valor_entrada: valorEntrada,
          link_ingresso: linkIngresso,
          usuario_id: usuario.id,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert("Sucesso", "Evento enviado para aprovação", [
          {
            text: "OK",
            onPress: () => router.back(),
          },
        ]);
      } else {
        Alert.alert("Erro", data.error || "Erro ao criar evento");
      }
    } catch (error) {
      console.log(error);

      Alert.alert("Erro", "Não foi possível conectar ao servidor");
    }
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Novo Evento</Text>

      <TextInput
        placeholder="Título"
        placeholderTextColor="#666"
        style={styles.input}
        value={titulo}
        onChangeText={setTitulo}
      />

      <TextInput
        placeholder="Categoria"
        placeholderTextColor="#666"
        style={styles.input}
        value={categoria}
        onChangeText={setCategoria}
      />

      <TextInput
        placeholder="Descrição"
        placeholderTextColor="#666"
        style={styles.input}
        value={descricao}
        onChangeText={setDescricao}
      />

      <TextInput
        placeholder="Data (ex: 20/07/2026)"
        placeholderTextColor="#666"
        style={styles.input}
        value={dataEvento}
        onChangeText={setDataEvento}
      />

      <TextInput
        placeholder="Endereço"
        placeholderTextColor="#666"
        style={styles.input}
        value={endereco}
        onChangeText={setEndereco}
      />

      <TextInput
        placeholder="Valor Entrada (ou Gratuito)"
        placeholderTextColor="#666"
        style={styles.input}
        value={valorEntrada}
        onChangeText={setValorEntrada}
      />

      <TextInput
        placeholder="Link Ingresso (opcional)"
        placeholderTextColor="#666"
        style={styles.input}
        value={linkIngresso}
        onChangeText={setLinkIngresso}
      />

      <TouchableOpacity style={styles.button} onPress={salvarEvento}>
        <Text style={styles.buttonText}>Salvar Evento</Text>
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
    marginBottom: 25,
  },

  input: {
    backgroundColor: "#f9ffa1",
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
  },

  button: {
    backgroundColor: "#ff7a00",
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
