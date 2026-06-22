import React from "react";
import { ScrollView } from "react-native";

export default function AppScroll({ children, style }: any) {
  return (
    <ScrollView
      style={style}
      contentContainerStyle={{
        paddingBottom: 120,
      }}
      showsVerticalScrollIndicator={false}
    >
      {children}
    </ScrollView>
  );
}