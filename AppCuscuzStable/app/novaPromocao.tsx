import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from "@react-native-picker/picker";
import { router } from "expo-router";
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

export default function NovaPromocao() {
  const [usuario, setUsuario] = useState<any>(null);
  const [estabelecimentos, setEstabelecimentos] = useState<any[]>([]);

  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [estabelecimentoId, setEstabelecimentoId] = useState("");

  useEffect(() => {
    carregarUsuario();
  }, []);

  async function carregarUsuario() {
    const dados = await AsyncStorage.getItem("usuarioLogado");

    if (dados) {
      const usuarioLogado = JSON.parse(dados);

      setUsuario(usuarioLogado);

      carregarEstabelecimentos(usuarioLogado.id);
    }
  }

  async function carregarEstabelecimentos(usuarioId: number) {
    try {
      const response = await fetch(
        `http://192.168.1.111:3333/estabelecimentos/meus/${usuarioId}`
      );

      const data = await response.json();

      setEstabelecimentos(data);
    } catch (error) {
      console.log(error);

      Alert.alert("Erro", "Não foi possível carregar estabelecimentos");
    }
  }

  async function publicarPromocao() {
    if (!titulo || !descricao || !estabelecimentoId) {
      Alert.alert("Erro", "Preencha todos os campos");
      return;
    }

    try {
      const response = await fetch(
        "http://192.168.1.111:3333/promocoes",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            titulo,
            descricao,
            estabelecimento_id: estabelecimentoId,
            usuario_id: usuario.id,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        Alert.alert("Sucesso", "Promoção criada com sucesso");

        router.back();
      } else {
        Alert.alert("Erro", data.error);
      }
    } catch (error) {
      console.log(error);

      Alert.alert("Erro", "Não foi possível criar promoção");
    }
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.title}>Nova Promoção</Text>

      <TextInput
        placeholder="Título da promoção"
        placeholderTextColor="#666"
        style={styles.input}
        value={titulo}
        onChangeText={setTitulo}
      />

      <TextInput
        placeholder="Descrição"
        placeholderTextColor="#666"
        style={styles.input}
        value={descricao}
        onChangeText={setDescricao}
        multiline
      />

      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={estabelecimentoId}
          onValueChange={(itemValue) =>
            setEstabelecimentoId(itemValue)
          }
        >
          <Picker.Item
            label="Selecione um estabelecimento"
            value=""
          />

          {estabelecimentos.map((item) => (
            <Picker.Item
              key={item.id}
              label={item.nome}
              value={item.id}
            />
          ))}
        </Picker>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={publicarPromocao}
      >
        <Text style={styles.buttonText}>
          Publicar Promoção
        </Text>
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
    marginBottom: 30,
  },

  input: {
    backgroundColor: "#f9ffa1",
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
  },

  pickerContainer: {
    backgroundColor: "#f9ffa1",
    borderRadius: 12,
    marginBottom: 20,
    overflow: "hidden",
  },

  button: {
    backgroundColor: "#023f14",
    padding: 18,
    borderRadius: 12,
    marginBottom: 20,
  },

  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
});
