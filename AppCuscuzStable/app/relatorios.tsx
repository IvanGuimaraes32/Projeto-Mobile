import { File, Paths } from "expo-file-system";
import * as Sharing from "expo-sharing";
import React from "react";
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
} from "react-native";

export default function Relatorios() {
  async function gerarCSV(tipo: string) {
    try {
      /*
         BUSCAR DADOS
      */
      const response = await fetch(
        `http://192.168.1.111:3333/relatorios/${tipo}`,
      );

      const dados = await response.json();

      if (!dados || dados.length === 0) {
        Alert.alert("Aviso", "Nenhum dado encontrado");
        return;
      }

      /*
         MONTAR CSV
      */
      const headers = Object.keys(dados[0]);

      let csv = headers.join(",") + "\n";

      dados.forEach((item: any) => {
        const linha = headers
          .map((header) => {
            const valor = item[header] ?? "";
            return `"${String(valor).replace(/"/g, '""')}"`;
          })
          .join(",");

        csv += linha + "\n";
      });

      /*
         CRIAR ARQUIVO (API NOVA)
      */
      const caminho = Paths.cache.uri + `${tipo}.csv`;

      const arquivo = new File(caminho);

      await arquivo.write(csv);

      /*
         COMPARTILHAR
      */
      await Sharing.shareAsync(arquivo.uri);
    } catch (error) {
      console.log(error);

      Alert.alert("Erro", "Não foi possível gerar o CSV");
    }
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Central de Relatórios</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => gerarCSV("usuarios")}
      >
        <Text style={styles.buttonText}>CSV Usuários</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => gerarCSV("estabelecimentos")}
      >
        <Text style={styles.buttonText}>CSV Estabelecimentos</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => gerarCSV("eventos")}
      >
        <Text style={styles.buttonText}>CSV Eventos</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => gerarCSV("promocoes")}
      >
        <Text style={styles.buttonText}>CSV Promoções</Text>
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
    marginBottom: 35,
  },

  button: {
    backgroundColor: "#1e90ff",
    padding: 18,
    borderRadius: 12,
    marginBottom: 15,
  },

  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
});
