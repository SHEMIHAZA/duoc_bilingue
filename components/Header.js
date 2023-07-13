import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

const Header = () => {
  const navigation = useNavigation();
  const [selectedButton, setSelectedButton] = useState("unidad");
  const handleButtonPress = (buttonName) => {
    setSelectedButton(buttonName);
  };

  return (
    <View
      style={{
        backgroundColor: "#F8BBD0",
        height: 65,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
      }}
    >
      {/* Menu Unidades, Ejercicios, Ayuda */}
      <Pressable
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: selectedButton === 'unidad' ? '#FF4081' : '#f3f3',
          borderColor: selectedButton === 'unidad' ? '#E91E63' : '#f3f3',
          borderWidth: 1,
          borderRadius: 3,
          paddingLeft: 9,
          paddingRight: 9,
          padding: 6,
        }}
        onPress={() => {
          handleButtonPress('unidad');
          navigation.navigate("Unidad");
          }}
      >
        <AntDesign name="book" size={24} color={selectedButton === 'unidad' ? '#34495E' : '#BDBDBD'} />
        <Text
          style={{
            marginLeft: 8,
            fontWeight: "bold",
            color: selectedButton === 'unidad' ? '#34495E' : '#F5F5F5',
            fontSize: 15,
          }}
        >
          Settings
        </Text>
      </Pressable>
{/* ----------------------------------------------------------------------------------------------- */}
      <Pressable
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: selectedButton === 'ejercicios' ? '#FF4081' : '#f3f3',
          borderColor: selectedButton === 'ejercicios' ? '#E91E63' : '#f3f3',
          paddingLeft: 9,
          paddingRight: 9,
          padding: 6,
          borderWidth: 1,
          borderRadius: 3,
        }}
        onPress={() => {
          handleButtonPress('ejercicios');
          navigation.navigate("Ejercicios");
        }}
      >
        <SimpleLineIcons name="pencil" size={24} color={selectedButton === 'ejercicios' ? '#34495E' : '#BDBDBD'} />
        <Text
          style={{
            marginLeft: 8,
            fontWeight: "bold",
            color: selectedButton === 'ejercicios' ? '#34495E' : '#F5F5F5',
            fontSize: 15,
          }}
        >
          
          Progress
        </Text>
      </Pressable>
{/* ----------------------------------------------------------------------------------------------- */}
      <Pressable
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: selectedButton === 'ayuda' ? '#FF4081' : '#f3f3',
          borderColor: selectedButton === 'ayuda' ? '#E91E63' : '#f3f3',
          paddingLeft: 9,
          paddingRight: 9,
          padding: 6,
          borderWidth: 1,
          borderRadius: 3,
        }}
        onPress={() => {
          handleButtonPress('ayuda'); 
          navigation.navigate("Ayuda");
        }}
      >
        <Ionicons name="ios-help" size={24} color={selectedButton === 'ayuda' ? '#34495E' : '#BDBDBD'} />
        <Text
          style={{
            marginLeft: 8,
            fontWeight: "bold",
            color: selectedButton === 'ayuda' ? '#34495E' : '#F5F5F5',
            fontSize: 15,
          }}
        >
          Help
        </Text>
      </Pressable>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({});
