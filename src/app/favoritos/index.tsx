import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Favoritos() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favoritos</Text>

      <View style={styles.card}>
        <Text style={styles.nome}>Hamburgueria do Cuscuz</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.nome}>Sushi Loko</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.nome}>Açaí do Vdo</Text>
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
  }
});