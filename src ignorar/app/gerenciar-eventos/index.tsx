import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity
} from "react-native";

export default function GerenciarEventos() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gerenciar Eventos</Text>

      <TextInput
        style={styles.input}
        placeholder="Título do Evento"
        placeholderTextColor="#666"
      />

      <TextInput
        style={styles.input}
        placeholder="Data"
        placeholderTextColor="#666"
      />

      <TextInput
        style={styles.input}
        placeholder="Descrição"
        placeholderTextColor="#666"
      />

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>
          Criar Evento
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:"#023f14",
    padding:20,
    paddingTop:60
  },

  title:{
    color:"#fbffda",
    fontSize:28,
    fontWeight:"bold",
    marginBottom:20
  },

  input:{
    backgroundColor:"#f9ffa1",
    padding:15,
    borderRadius:12,
    marginBottom:15
  },

  button:{
    backgroundColor:"#86d18b",
    padding:18,
    borderRadius:12
  },

  buttonText:{
    textAlign:"center",
    fontWeight:"bold",
    color:"#023f14"
  }
});