import { router, useLocalSearchParams } from "expo-router";
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

export default function EditarEstabelecimento() {
  const { id } = useLocalSearchParams();

  const [nome, setNome] = useState("");
  const [categoria, setCategoria] = useState("");
  const [descricao, setDescricao] = useState("");
  const [endereco, setEndereco] = useState("");
  const [telefone, setTelefone] = useState("");
  const [imagem, setImagem] = useState("");

  useEffect(() => {
    carregarEstabelecimento();
  }, []);

  async function carregarEstabelecimento() {
    try {
      const response = await fetch(
        `http://192.168.1.111:3333/estabelecimentos/${id}`,
      );

      const data = await response.json();

      setNome(data.nome || "");
      setCategoria(data.categoria || "");
      setDescricao(data.descricao || "");
      setEndereco(data.endereco || "");
      setTelefone(data.telefone_whatsapp || "");
      setImagem(data.imagem || "");
    } catch (error) {
      console.log(error);
    }
  }

  async function salvarEdicao() {
    try {
      const response = await fetch(
        `http://192.168.1.111:3333/estabelecimentos/${id}`,
        {
          method: "PUT",

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
          }),
        },
      );

      const data = await response.json();

      if (response.ok) {
        Alert.alert("Sucesso", "Estabelecimento atualizado", [
          {
            text: "OK",
            onPress: () => router.back(),
          },
        ]);
      } else {
        Alert.alert("Erro", data.error);
      }
    } catch (error) {
      console.log(error);

      Alert.alert("Erro", "Não foi possível salvar");
    }
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Editar Estabelecimento</Text>

      <TextInput
        style={styles.input}
        value={nome}
        onChangeText={setNome}
        placeholder="Nome"
        placeholderTextColor="#666"
      />

      <Text style={styles.label}>Categoria</Text>

      <RNPickerSelect
        onValueChange={(value) => setCategoria(value)}
        value={categoria}
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
        style={pickerSelectStyles}
      />

      <TextInput
        style={styles.input}
        value={descricao}
        onChangeText={setDescricao}
        placeholder="Descrição"
        placeholderTextColor="#666"
      />

      <TextInput
        style={styles.input}
        value={endereco}
        onChangeText={setEndereco}
        placeholder="Endereço"
        placeholderTextColor="#666"
      />

      <TextInput
        style={styles.input}
        value={telefone}
        onChangeText={setTelefone}
        placeholder="Telefone"
        placeholderTextColor="#666"
      />

      <TextInput
        style={styles.input}
        value={imagem}
        onChangeText={setImagem}
        placeholder="URL da imagem"
        placeholderTextColor="#666"
      />

      <TouchableOpacity style={styles.button} onPress={salvarEdicao}>
        <Text style={styles.buttonText}>Salvar Alterações</Text>
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
    backgroundColor: "#2e8b57",
    padding: 18,
    borderRadius: 12,
    marginTop: 20,
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
