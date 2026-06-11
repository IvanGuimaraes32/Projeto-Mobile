import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView
} from "react-native";

export default function Eventos() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Eventos</Text>

      <View style={styles.card}>
        <Text style={styles.eventTitle}>
          Festival do Hambúrguer
        </Text>

        <Text style={styles.eventText}>
          Descontos especiais durante toda a semana.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.eventTitle}>
          Noite da Pizza
        </Text>

        <Text style={styles.eventText}>
          Rodízio promocional para clientes cadastrados.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.eventTitle}>
          Festival do Açaí
        </Text>

        <Text style={styles.eventText}>
          Combos e brindes exclusivos.
        </Text>
      </View>
    </ScrollView>
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
    fontSize:30,
    fontWeight:"bold",
    marginBottom:20
  },

  card:{
    backgroundColor:"#86d18b",
    padding:20,
    borderRadius:15,
    marginBottom:15
  },

  eventTitle:{
    color:"#023f14",
    fontSize:18,
    fontWeight:"bold"
  },

  eventText:{
    color:"#023f14",
    marginTop:8
  }
});