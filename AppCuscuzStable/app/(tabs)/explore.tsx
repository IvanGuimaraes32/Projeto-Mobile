import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView
} from "react-native";

export default function Eventos() {

  const [eventos, setEventos] = useState([]);

  useEffect(() => {
    carregarEventos();
  }, []);

  async function carregarEventos() {
    try {

      const response = await fetch(
        "http://192.168.1.111:3333/eventos"
      );

      const data = await response.json();
      console.log("EVENTOS RECEBIDOS:", data);
      setEventos(data);

      console.log(data);

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <ScrollView style={styles.container}>

      <Text style={styles.title}>Eventos</Text>

      <Text style={{ color: "white", marginBottom: 20 }}>
        Total: {eventos.length}
      </Text>

      {eventos.map((item, index) => (

        <View key={index} style={styles.card}>

          <Text style={styles.eventTitle}>
            {item.titulo}
          </Text>

          <Text style={styles.eventText}>
            {item.descricao}
          </Text>

        </View>

      ))}

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