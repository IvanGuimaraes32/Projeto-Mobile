import React, { useEffect, useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Admin() {
  const [solicitacoes, setSolicitacoes] = useState<any[]>([]);
  const [eventosPendentes, setEventosPendentes] = useState<any[]>([]);
  const [estabelecimentosPendentes, setEstabelecimentosPendentes] = useState<
    any[]
  >([]);
  const [associacoesPendentes, setAssociacoesPendentes] = useState<any[]>([]);

  useEffect(() => {
    carregarSolicitacoes();
    carregarEventosPendentes();
    carregarEstabelecimentosPendentes();
    carregarAssociacoesPendentes();
  }, []);

  async function carregarSolicitacoes() {
    try {
      const response = await fetch(
        "http://192.168.1.111:3333/usuarios/solicitacoes",
      );

      const data = await response.json();
      setSolicitacoes(data);
    } catch (error) {
      console.log(error);
      Alert.alert("Erro", "Não foi possível carregar solicitações");
    }
  }

  async function carregarEventosPendentes() {
    try {
      const response = await fetch(
        "http://192.168.1.111:3333/eventos/pendentes",
      );

      const data = await response.json();
      setEventosPendentes(data);
    } catch (error) {
      console.log(error);
    }
  }

  async function carregarEstabelecimentosPendentes() {
    try {
      const response = await fetch(
        "http://192.168.1.111:3333/estabelecimentos/pendentes/lista",
      );

      const data = await response.json();
      setEstabelecimentosPendentes(data);
    } catch (error) {
      console.log(error);
    }
  }

  async function carregarAssociacoesPendentes() {
    try {
      const response = await fetch(
        "http://192.168.1.111:3333/estabelecimentos/solicitacoes-associacao",
      );

      const data = await response.json();
      setAssociacoesPendentes(data);
    } catch (error) {
      console.log(error);
    }
  }

  async function aprovarUsuario(usuarioId: number) {
    try {
      const response = await fetch(
        "http://192.168.1.111:3333/usuarios/aprovar-upgrade",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            usuario_id: usuarioId,
          }),
        },
      );

      const data = await response.json();

      if (response.ok) {
        Alert.alert("Sucesso", "Usuário aprovado");
        carregarSolicitacoes();
      } else {
        Alert.alert("Erro", data.error);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function recusarUsuario(usuarioId: number) {
    try {
      const response = await fetch(
        "http://192.168.1.111:3333/usuarios/recusar-upgrade",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            usuario_id: usuarioId,
          }),
        },
      );

      const data = await response.json();

      if (response.ok) {
        Alert.alert("Sucesso", "Solicitação recusada");
        carregarSolicitacoes();
      } else {
        Alert.alert("Erro", data.error);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function aprovarEvento(eventoId: number) {
    try {
      const response = await fetch(
        "http://192.168.1.111:3333/eventos/aprovar",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            evento_id: eventoId,
          }),
        },
      );

      const data = await response.json();

      if (response.ok) {
        Alert.alert("Sucesso", "Evento aprovado");
        carregarEventosPendentes();
      } else {
        Alert.alert("Erro", data.error);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function recusarEvento(eventoId: number) {
    try {
      const response = await fetch(
        "http://192.168.1.111:3333/eventos/recusar",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            evento_id: eventoId,
          }),
        },
      );

      const data = await response.json();

      if (response.ok) {
        Alert.alert("Sucesso", "Evento recusado");
        carregarEventosPendentes();
      } else {
        Alert.alert("Erro", data.error);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function aprovarEstabelecimento(estabelecimentoId: number) {
    try {
      const response = await fetch(
        "http://192.168.1.111:3333/estabelecimentos/aprovar",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            estabelecimento_id: estabelecimentoId,
          }),
        },
      );

      const data = await response.json();

      if (response.ok) {
        Alert.alert("Sucesso", "Estabelecimento aprovado");
        carregarEstabelecimentosPendentes();
      } else {
        Alert.alert("Erro", data.error);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function recusarEstabelecimento(estabelecimentoId: number) {
    try {
      const response = await fetch(
        "http://192.168.1.111:3333/estabelecimentos/recusar",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            estabelecimento_id: estabelecimentoId,
          }),
        },
      );

      const data = await response.json();

      if (response.ok) {
        Alert.alert("Sucesso", "Estabelecimento recusado");
        carregarEstabelecimentosPendentes();
      } else {
        Alert.alert("Erro", data.error);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function aprovarAssociacao(
    usuarioId: number,
    estabelecimentoId: number,
  ) {
    try {
      const response = await fetch(
        "http://192.168.1.111:3333/estabelecimentos/aprovar-associacao",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            usuario_id: usuarioId,
            estabelecimento_id: estabelecimentoId,
          }),
        },
      );

      const data = await response.json();

      if (response.ok) {
        Alert.alert("Sucesso", "Associação aprovada");
        carregarAssociacoesPendentes();
      } else {
        Alert.alert("Erro", data.error);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function recusarAssociacao(
    usuarioId: number,
    estabelecimentoId: number,
  ) {
    try {
      const response = await fetch(
        "http://192.168.1.111:3333/estabelecimentos/recusar-associacao",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            usuario_id: usuarioId,
            estabelecimento_id: estabelecimentoId,
          }),
        },
      );

      const data = await response.json();

      if (response.ok) {
        Alert.alert("Sucesso", "Associação recusada");
        carregarAssociacoesPendentes();
      } else {
        Alert.alert("Erro", data.error);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.title}>Painel Administrador</Text>

      <Text style={styles.subtitle}>Solicitações de Upgrade</Text>

      {solicitacoes.length === 0 && (
        <Text style={styles.empty}>Nenhuma solicitação pendente</Text>
      )}

      {solicitacoes.map((item, index) => (
        <View key={index} style={styles.card}>
          <Text style={styles.nome}>{item.nome}</Text>
          <Text style={styles.email}>{item.email}</Text>

          <View style={styles.row}>
            <TouchableOpacity
              style={styles.approveButton}
              onPress={() => aprovarUsuario(item.usuario_id)}
            >
              <Text style={styles.buttonText}>SIM</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.rejectButton}
              onPress={() => recusarUsuario(item.usuario_id)}
            >
              <Text style={styles.buttonText}>NÃO</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}

      <Text style={styles.subtitle}>Eventos Pendentes</Text>

      {eventosPendentes.length === 0 && (
        <Text style={styles.empty}>Nenhum evento pendente</Text>
      )}

      {eventosPendentes.map((item, index) => (
        <View key={index} style={styles.card}>
          <Text style={styles.nome}>{item.titulo}</Text>
          <Text style={styles.email}>{item.categoria}</Text>

          <View style={styles.row}>
            <TouchableOpacity
              style={styles.approveButton}
              onPress={() => aprovarEvento(item.id)}
            >
              <Text style={styles.buttonText}>SIM</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.rejectButton}
              onPress={() => recusarEvento(item.id)}
            >
              <Text style={styles.buttonText}>NÃO</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}

      <Text style={styles.subtitle}>Estabelecimentos Pendentes</Text>

      {estabelecimentosPendentes.length === 0 && (
        <Text style={styles.empty}>Nenhum estabelecimento pendente</Text>
      )}

      {estabelecimentosPendentes.map((item, index) => (
        <View key={index} style={styles.card}>
          <Text style={styles.nome}>{item.nome}</Text>
          <Text style={styles.email}>{item.categoria}</Text>

          <View style={styles.row}>
            <TouchableOpacity
              style={styles.approveButton}
              onPress={() => aprovarEstabelecimento(item.id)}
            >
              <Text style={styles.buttonText}>SIM</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.rejectButton}
              onPress={() => recusarEstabelecimento(item.id)}
            >
              <Text style={styles.buttonText}>NÃO</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}

      <Text style={styles.subtitle}>Solicitações de Associação</Text>

      {associacoesPendentes.length === 0 && (
        <Text style={styles.empty}>Nenhuma solicitação pendente</Text>
      )}

      {associacoesPendentes.map((item, index) => (
        <View key={index} style={styles.card}>
          <Text style={styles.nome}>{item.estabelecimento_nome}</Text>
          <Text style={styles.email}>Solicitado por: {item.usuario_nome}</Text>

          <View style={styles.row}>
            <TouchableOpacity
              style={styles.approveButton}
              onPress={() =>
                aprovarAssociacao(item.usuario_id, item.estabelecimento_id)
              }
            >
              <Text style={styles.buttonText}>SIM</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.rejectButton}
              onPress={() =>
                recusarAssociacao(item.usuario_id, item.estabelecimento_id)
              }
            >
              <Text style={styles.buttonText}>NÃO</Text>
            </TouchableOpacity>
          </View>
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

  scrollContent: {
    paddingBottom: 120,
  },

  title: {
    color: "#fbffda",
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 25,
  },

  subtitle: {
    color: "#fbffda",
    fontSize: 20,
    marginBottom: 20,
    marginTop: 10,
  },

  empty: {
    color: "white",
    fontSize: 16,
    marginBottom: 15,
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

  email: {
    color: "#023f14",
    marginTop: 5,
    marginBottom: 15,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  approveButton: {
    backgroundColor: "#2e8b57",
    padding: 15,
    borderRadius: 10,
    width: "48%",
  },

  rejectButton: {
    backgroundColor: "#b22222",
    padding: 15,
    borderRadius: 10,
    width: "48%",
  },

  buttonText: {
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
  },
});
