import React, { useLayoutEffect, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import moment from 'moment';
import { SafeAreaView } from "react-native-safe-area-context";
import * as Font from 'expo-font';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, ImageBackground } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = () => {
  const navigation = useNavigation();
  const currentDate = moment().format('MMMM Do YYYY');
  const [username, setUsername] = useState('');
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    // Carga la fuente cuando el componente se monta
    const loadFont = async () => {
      await Font.loadAsync({
        'Poppins': require('../screens/assets/fonts/Poppins-Light.ttf'),
      });
      setFontLoaded(true);
    };

    loadFont();

    // Obtener el nombre del usuario desde AsyncStorage
    const getUsername = async () => {
      try {
        const storedUsername = await AsyncStorage.getItem('username');
        if (storedUsername !== null) {
          setUsername(storedUsername);
        }
      } catch (error) {
        console.log('Error al obtener el nombre del usuario desde AsyncStorage:', error);
      }
    };

    getUsername();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: "DUOC BILINGUE",
      justifyContent: "center",
      headerTitleStyle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "white",
      },
      headerStyle: {
        backgroundColor: "#6f6f5d",
        height: 110,
        borderBottomColor: "transparent",
        shadowColor: "transparent",
      },
      headerRight: () => (
        <Ionicons
          name="notifications-outline"
          size={24}
          color="white"
          style={{ marginRight: 12 }}
        />
      ),
    });
  }, []);
  if (!fontLoaded) {
    return null; // Mostrar una pantalla de carga o un componente de carga aquí
  }

  return (
    <>
      <ImageBackground
        source={require("../screens/assets/images/oatmeal-13.jpg")}
        style={{ flex: 1, resizeMode: "cover" }}
      >
        <View style={{
          height: 40,
          flexDirection: "row",
          alignItems: "flex-start",
          justifyContent: "space-around"
        }}>
          <Text style={{ color: '#6f6f5d', fontSize: 20, fontFamily: "Poppins", marginTop: 15 }}>Today: {currentDate}</Text>
        </View>
        <View style={{ alignItems: "center", marginTop: 10 }}>
          <Text style={{ color: "#6f6f5d", fontSize: 20, fontWeight: "bold", borderRadius:10, padding:5, marginTop:0 }}>
            ¡Welcome, {username}!
          </Text>
        </View>

        <SafeAreaView>
          <ScrollView>
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                style={{
                  width: 180,
                  height: 150,
                  marginTop: 10,
                  backgroundColor: "#f7f3f2",
                  borderRadius: 15,
                  padding: 20,
                  marginHorizontal: 8,
                  borderWidth:1,
                }}
                onPress={() => navigation.navigate("Materia1")}
              >
                <Text style={{ color: "#272525", fontSize: 20, fontWeight: "bold", marginVertical: 7, justifyContent: "space-around" }}>Access study material here</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  width: 180,
                  height: 150,
                  marginTop: 10,
                  backgroundColor: "#f7f3f2",
                  borderRadius: 15,
                  padding: 20,
                  marginRight: 8,
                  borderWidth:1,
                }}
              >
                <Text style={{ color: "#272525", fontSize: 20, fontWeight: "bold", marginVertical: 7, justifyContent: "space-around" }}>Analyze your progress</Text>
              </TouchableOpacity>
            </View>

            <View style={{ flexDirection: "row", marginTop: 25, }}>
              <TouchableOpacity
                style={{
                  width: 180,
                  height: 150,
                  marginTop: 10,
                  backgroundColor: "#f7f3f2",
                  borderRadius: 15,
                  padding: 20,
                  marginHorizontal: 8,
                  borderWidth:1,
                }}
              >
                <Text style={{ color: "#272525", fontSize: 20, fontWeight: "bold", marginVertical: 7, justifyContent: "space-around" }}>More information</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  width: 180,
                  height: 150,
                  marginTop: 10,
                  backgroundColor: "#f7f3f2",
                  borderRadius: 15,
                  padding: 20,
                  marginRight: 8,
                  borderWidth:1,
                }}
              >
                <Text style={{ color: "#272525", fontSize: 20, fontWeight: "bold", marginVertical: 7, justifyContent: "space-around" }}>Access help pages</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </SafeAreaView>
      </ImageBackground>
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});

