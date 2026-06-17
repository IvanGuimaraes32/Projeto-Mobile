import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Pedidos() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meus Pedidos</Text>

      <View style={styles.card}>
        <Text style={styles.nome}>Hamburgueria do Cuscuz</Text>
        <Text style={styles.status}>Entregue</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.nome}>Pizza do Pedrinho</Text>
        <Text style={styles.status}>Em preparo</Text>
      </View>
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

  card:{
    backgroundColor:"#86d18b",
    padding:20,
    borderRadius:15,
    marginBottom:15
  },

  nome:{
    fontSize:18,
    fontWeight:"bold",
    color:"#023f14"
  },

  status:{
    marginTop:5,
    color:"#023f14"
  }
});