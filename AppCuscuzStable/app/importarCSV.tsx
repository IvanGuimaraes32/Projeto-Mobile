import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system/legacy";
import React, { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";

export default function ImportarCSV() {
  const [quantidade, setQuantidade] = useState(0);

  async function selecionarCSV() {
    try {
      const resultado = await DocumentPicker.getDocumentAsync({
        type: "*/*",
        copyToCacheDirectory: true,
      });

      if (resultado.canceled) {
        return;
      }

      const arquivo = resultado.assets[0];

      const conteudo = await FileSystem.readAsStringAsync(arquivo.uri);

      /*
         SEPARAR LINHAS
      */
      const linhas = conteudo
        .split("\n")
        .map((linha) => linha.trim())
        .filter((linha) => linha !== "");

      /*
         REMOVER CABEÇALHO
      */
      const registros = linhas.slice(1);

      /*
         CONVERTER CSV → JSON
         DELIMITADOR = ;
      */
      const estabelecimentos = registros.map((linha) => {
        const colunas = linha.split(";");

        return {
          nome: colunas[0]?.trim() || "",
          categoria: colunas[1]?.trim() || "",
          endereco: colunas[2]?.trim() || "",
          telefone_whatsapp: colunas[3]?.trim() || "",
        };
      });

      console.log("PRIMEIRO REGISTRO:");
      console.log(estabelecimentos[0]);

      /*
         ENVIAR PARA API
      */
      const response = await fetch(
        "http://192.168.1.111:3333/estabelecimentos/importar-csv",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            estabelecimentos,
          }),
        },
      );

      const data = await response.json();

      if (response.ok) {
        setQuantidade(estabelecimentos.length);

        Alert.alert(
          "Sucesso",
          `${estabelecimentos.length} registros importados`,
        );
      } else {
        Alert.alert("Erro", data.error);
      }
    } catch (error) {
      console.log(error);

      Alert.alert("Erro", "Falha ao importar CSV");
    }
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Importar Estabelecimentos via CSV</Text>

      <TouchableOpacity style={styles.button} onPress={selecionarCSV}>
        <Text style={styles.buttonText}>Selecionar Arquivo CSV</Text>
      </TouchableOpacity>

      {quantidade > 0 && (
        <Text style={styles.info}>{quantidade} registros importados</Text>
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

  title: {
    color: "#fbffda",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30,
  },

  button: {
    backgroundColor: "#6a0dad",
    padding: 18,
    borderRadius: 12,
    marginBottom: 20,
  },

  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },

  info: {
    color: "#fbffda",
    fontSize: 18,
    marginTop: 20,
  },
});
