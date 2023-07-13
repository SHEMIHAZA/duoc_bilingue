import { StyleSheet, Text, View, TextInput, ImageBackground } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { useLayoutEffect } from 'react';
import Header from '../components/Header';
import { ScrollView } from 'react-native';
import { Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const NotificacionesScreen = () => {
  const navigation = useNavigation();
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
        backgroundColor: "#C2185B",
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
  return (
    <>
    <ImageBackground source={require("../screens/assets/images/english.jpg")}
                               style={{ flex: 1, resizeMode:"cover" }}>
      <View>
      
        <ScrollView>
          <View
            style={{
              margin: 20,
            }}
          >
            {/* Buscar Unidad */}
            <Pressable
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
                paddingHorizontal: 10,
                borderColor: "#FF4081",
                borderWidth: 2,
                paddingVertical: 10,
                borderRadius: 30,
              }}
            >
              <Ionicons name="ios-search-outline" size={24} color="black" />
              <TextInput placeholder="Buscar Unidad" />
            </Pressable>

            {/* Boton Buscar */}
            <Pressable
            onPress={() => navigation.navigate("Search")}
              style={{
                paddingHorizontal: 10,
                borderColor: "#F5F5F5",
                borderWidth: 2,
                paddingVertical: 10,
                borderRadius: 30,
                backgroundColor: "#00BCD4",
                marginTop: 10,
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 15,
                  fontWeight: 500,
                  color: "#34495E",
                }}
              >
                Search
              </Text>
            </Pressable>
          </View>
          <Text
            style={{ marginHorizontal: 28, fontSize: 17, fontWeight: "500", color:"white" }}
          >
            Unidad 1
          </Text>
          {/* Carrusel Horizontal */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <Pressable
            onPress={() => navigation.navigate("Guia1")}
              style={{
                width: 200,
                height: 150,
                marginTop: 10,
                backgroundColor: "#34495E",
                borderRadius: 15,
                padding:20,
                marginHorizontal:8
              }}
            >
              <Text style={{color:"white", fontSize:20, fontWeight:"bold", marginVertical:7}}>At the National Portrait Gallery</Text>
              <Text style={{color:"white", fontSize:13, fontWeight:"500"}}>simple past of be: was/were</Text>
            </Pressable>

            <Pressable
            onPress={() => navigation.navigate("Guia2")}
              style={{
                width: 200,
                height: 150,
                marginTop: 10,
                backgroundColor: "#34495E",
                borderRadius: 15,
                padding:20,
                marginHorizontal:8
              }}
            >
              <Text style={{color:"white", fontSize:20, fontWeight:"bold", marginVertical:7}}>Chelsea Girls</Text>
              <Text style={{color:"white", fontSize:13, fontWeight:"500"}}>simple past: regular verbs</Text>
            </Pressable>

            <Pressable
            onPress={() => navigation.navigate("Guia3")}
              style={{
                width: 200,
                height: 150,
                marginTop: 10,
                backgroundColor: "#34495E",
                borderRadius: 15,
                padding:20,
                marginHorizontal:8
              }}
            >
              <Text style={{color:"white", fontSize:20, fontWeight:"bold", marginVertical:7}}>A night to remember</Text>
              <Text style={{color:"white", fontSize:13, fontWeight:"500"}}>simple past: irregular verbs</Text>
            </Pressable>

            <Pressable
              style={{
                width: 200,
                height: 150,
                marginTop: 10,
                backgroundColor: "#34495E",
                borderRadius: 15,
                padding:20,
                marginHorizontal:8
              }}
            >
              <Text style={{color:"white", fontSize:20, fontWeight:"bold", marginVertical:7}}>Practical</Text>
              <Text style={{color:"white", fontSize:13, fontWeight:"500"}}>Vocabulary</Text>
            </Pressable>
          </ScrollView>



          <Text
            style={{ marginHorizontal: 28, fontSize: 17, fontWeight: "500", marginTop:15, color:"white" }}
          >
            Unidad 2
          </Text>
          {/* Carrusel */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <Pressable
            onPress={() => navigation.navigate("Guia4")}
              style={{
                width: 200,
                height: 150,
                marginTop: 10,
                backgroundColor: "#34495E",
                borderRadius: 15,
                padding:20,
                marginHorizontal:8
              }}
            >
              <Text style={{color:"white", fontSize:20, fontWeight:"bold", marginVertical:7}}>A murder story</Text>
              <Text style={{color:"white", fontSize:13, fontWeight:"500"}}>simple past: regular and irregular verbs</Text>
            </Pressable>

            <Pressable
            onPress={() => navigation.navigate("Guia5")}
              style={{
                width: 200,
                height: 150,
                marginTop: 10,
                backgroundColor: "#34495E",
                borderRadius: 15,
                padding:20,
                marginHorizontal:8
              }}
            >
              <Text style={{color:"white", fontSize:20, fontWeight:"bold", marginVertical:7}}>A house with story</Text>
              <Text style={{color:"white", fontSize:13, fontWeight:"500"}}>there is / there are, some / any + plural nouns</Text>
            </Pressable>


            <Pressable
            onPress={() => navigation.navigate("Guia6")}
              style={{
                width: 200,
                height: 150,
                marginTop: 10,
                backgroundColor: "#34495E",
                borderRadius: 15,
                padding:20,
                marginHorizontal:8
              }}
            >
              <Text style={{color:"white", fontSize:20, fontWeight:"bold", marginVertical:7}}>A night in a haunted hotel</Text>
              <Text style={{color:"white", fontSize:13, fontWeight:"500"}}>there was / there were</Text>
            </Pressable>
            </ScrollView>
            <Pressable style={{paddingBottom:55}}>
                
                              
              
            </Pressable>
        </ScrollView>
        
      </View>
      </ImageBackground>
    </>
  )
}

export default NotificacionesScreen

const styles = StyleSheet.create({})