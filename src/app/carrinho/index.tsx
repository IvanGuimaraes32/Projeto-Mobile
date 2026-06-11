import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function Carrinho() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Carrinho</Text>

      <View style={styles.card}>
        <Text style={styles.nome}>X-Burguer Artesanal</Text>
        <Text style={styles.preco}>R$ 29,90</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.nome}>Batata Frita</Text>
        <Text style={styles.preco}>R$ 19,90</Text>
      </View>

      <View style={styles.totalBox}>
        <Text style={styles.total}>
          Total: R$ 49,80
        </Text>
      </View>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>
          Finalizar Pedido
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

  preco:{
    marginTop:5,
    color:"#023f14"
  },

  totalBox:{
    marginTop:20
  },

  total:{
    color:"#fbffda",
    fontSize:22,
    fontWeight:"bold"
  },

  button:{
    backgroundColor:"#f9ffa1",
    padding:18,
    borderRadius:15,
    marginTop:20
  },

  buttonText:{
    textAlign:"center",
    fontWeight:"bold",
    color:"#023f14"
  }
});