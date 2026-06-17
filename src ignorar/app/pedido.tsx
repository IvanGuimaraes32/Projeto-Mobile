import { View, Text } from "react-native";

export default function Pedido() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#023f14"
      }}
    >
      <Text
        style={{
          color: "#fbffda",
          fontSize: 28,
          fontWeight: "bold"
        }}
      >
        Tela de Pedido
      </Text>

      <Text
        style={{
          color: "#fff",
          marginTop: 10
        }}
      >
        Aqui futuramente entrará o sistema do backend.
      </Text>
    </View>
  );
}