import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet
} from "react-native";

export default function Cadastro() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro</Text>

      <TextInput
        placeholder="Nome"
        placeholderTextColor="#666"
        style={styles.input}
      />

      <TextInput
        placeholder="Email"
        placeholderTextColor="#666"
        style={styles.input}
      />

      <TextInput
        placeholder="Senha"
        placeholderTextColor="#666"
        secureTextEntry
        style={styles.input}
      />

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>
          Criar Conta
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:"#023f14",
    justifyContent:"center",
    padding:20
  },

  title:{
    color:"#fbffda",
    fontSize:32,
    fontWeight:"bold",
    marginBottom:30,
    textAlign:"center"
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