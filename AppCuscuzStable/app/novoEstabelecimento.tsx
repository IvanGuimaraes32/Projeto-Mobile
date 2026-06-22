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
import RNPickerSelect from "react-native-picker-select";

export default function NovoEstabelecimento() {
  const [usuario, setUsuario] = useState<any>(null);

  const [nome, setNome] = useState("");
  const [categoria, setCategoria] = useState("");
  const [descricao, setDescricao] = useState("");
  const [endereco, setEndereco] = useState("");
  const [telefone, setTelefone] = useState("");
  const [imagem, setImagem] = useState("");

  useEffect(() => {
    carregarUsuario();
  }, []);

  async function carregarUsuario() {
    const dados = await AsyncStorage.getItem("usuarioLogado");

    if (dados) {
      setUsuario(JSON.parse(dados));
    }
  }

  async function salvarEstabelecimento() {
    try {
      const response = await fetch(
        "http://192.168.1.111:3333/estabelecimentos",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            nome,
            categoria,
            descricao,
            endereco,
            telefone_whatsapp: telefone,
            imagem,
            usuario_id: usuario.id,
            tipo_usuario: usuario.tipo,
          }),
        },
      );

      const data = await response.json();

      if (response.ok) {
        Alert.alert(
          "Sucesso",
          usuario.tipo === "admin"
            ? "Estabelecimento publicado"
            : "Estabelecimento enviado para aprovação",
          [{ text: "OK", onPress: () => router.back() }],
        );
      } else {
        Alert.alert("Erro", data.error || "Erro ao cadastrar");
      }
    } catch (error) {
      console.log(error);

      Alert.alert("Erro", "Não foi possível conectar ao servidor");
    }
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Novo Estabelecimento</Text>

      <TextInput
        placeholder="Nome"
        placeholderTextColor="#666"
        style={styles.input}
        value={nome}
        onChangeText={setNome}
      />

      <Text style={styles.label}>Categoria</Text>

      <RNPickerSelect
        onValueChange={(value) => setCategoria(value)}
        items={[
          { label: "Restaurante", value: "Restaurante" },
          { label: "Lanchonete", value: "Lanchonete" },
          { label: "Mercado", value: "Mercado" },
          { label: "Farmácia", value: "Farmácia" },
          { label: "Padaria", value: "Padaria" },
          { label: "Loja", value: "Loja" },
          { label: "Pet Shop", value: "Pet Shop" },
          { label: "Academia", value: "Academia" },
          { label: "Salão de Beleza", value: "Salão de Beleza" },
          { label: "Serviços Gerais", value: "Serviços Gerais" },
        ]}
        placeholder={{
          label: "Selecione uma categoria...",
          value: null,
        }}
        style={pickerSelectStyles}
      />

      <TextInput
        placeholder="Descrição"
        placeholderTextColor="#666"
        style={styles.input}
        value={descricao}
        onChangeText={setDescricao}
      />

      <TextInput
        placeholder="Endereço"
        placeholderTextColor="#666"
        style={styles.input}
        value={endereco}
        onChangeText={setEndereco}
      />

      <TextInput
        placeholder="Telefone WhatsApp"
        placeholderTextColor="#666"
        style={styles.input}
        value={telefone}
        onChangeText={setTelefone}
      />

      <TextInput
        placeholder="URL da imagem"
        placeholderTextColor="#666"
        style={styles.input}
        value={imagem}
        onChangeText={setImagem}
      />

      <TouchableOpacity style={styles.button} onPress={salvarEstabelecimento}>
        <Text style={styles.buttonText}>Salvar Estabelecimento</Text>
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

  label: {
    color: "#fbffda",
    marginBottom: 8,
    fontWeight: "bold",
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
    marginTop: 20,
    marginBottom: 20,
  },

  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
});

const pickerSelectStyles = {
  inputIOS: {
    backgroundColor: "#f9ffa1",
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    color: "#000",
  },

  inputAndroid: {
    backgroundColor: "#f9ffa1",
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    color: "#000",
  },
};
