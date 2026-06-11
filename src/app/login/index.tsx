import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet
} from "react-native";

export default function Login() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

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
          Entrar
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