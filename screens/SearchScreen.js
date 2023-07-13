import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
} from "react-native";
import React, { useState } from 'react';
import { Ionicons } from "@expo/vector-icons";

const SearchScreen = () => {
  const [input,setInput] = useState("");
  const data = [
    {
    // API materia de inglés
    }
  ];
  return (
    <SafeAreaView>
      <View
        style={{
          padding: 10,
          margin: 20,
          marginTop: 60,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          borderColor: "#E67E22",
          borderWidth: 4,
          borderRadius: 25,
        }}
      >
        <TextInput
          value={input}
          onChangeText={(text) => setInput(text)}
          placeholder="buscar"
          style={{ marginLeft: 13 }}
        />
        <Ionicons name="ios-search-outline" size={29} color="black" />
      </View>
    </SafeAreaView>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({});
