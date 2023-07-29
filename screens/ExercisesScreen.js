import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useLayoutEffect } from 'react';
import { ImageBackground, TextInput, Text, View, ScrollView, Pressable, StyleSheet } from 'react-native';
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

  const data = [
    {
      title: "Guia Practica",
      subtitle: "Unidad: Where are you from?",
      route: "Guia1",
    },
    {
      title: "Chelsea Girls",
      subtitle: "simple past: regular verbs",
      route: "Guia2",
    },
    {
      title: "A night to remember",
      subtitle: "simple past: irregular verbs",
      route: "Guia3",
    },
    {
      title: "Practical",
      subtitle: "Vocabulary",
      route: "",
    },
    {
      title: "A murder story",
      subtitle: "simple past: regular and irregular verbs",
      route: "Guia4",
    },
    {
      title: "A house with story",
      subtitle: "there is / there are, some / any + plural nouns",
      route: "Guia5",
    },
    {
      title: "A night in a haunted hotel",
      subtitle: "there was / there were",
      route: "Guia6",
    },
  ];

  const material = [
    {
      title: "Where are you from?",
      subtitle: "verb be: he, she, it",
      route: "Materia1",
    },
    {
      title: "Listening 2",
      subtitle: "Practice your listening and answer the questions1 ",
      route: "Materia2",
    },
    {
      title: "Japanese High School",
      subtitle: "Watch the video and mark the options",
      route: "Materia3",
    },
    {
      title: "Listening",
      subtitle: "Practice your listening and answer the questions",
      route: "Materia4",
    },
    {
      title: "xxxxxxex",
      subtitle: "xxxxexx",
      route: "",
    },
    {
      title: "xxxxxfxx",
      subtitle: "xxxfxxx",
      route: "",
    },
    {
      title: "xxxgxxxx",
      subtitle: "xxxgxxx",
      route: "",
    },
  ];

  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = () => {
    // Filtrar los datos existentes en base al texto de búsqueda
    const filteredResults = data.filter(item =>
      item.title.toLowerCase().includes(searchText.toLowerCase())
    );
    setSearchResults(filteredResults);
  };

  return (
    <>
      <ImageBackground source={require("../screens/assets/images/oatmeal-13.jpg")} style={{ flex: 1, resizeMode: "cover" }}>
        <View>
          <ScrollView>
            <View style={{ margin: 20 }}>
              {/* Buscar Unidad */}
              <Pressable
                style={({ pressed }) => [
                  {
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10,
                    paddingHorizontal: 10,
                    borderColor: "#6f6f5d",
                    borderWidth: 2,
                    paddingVertical: 10,
                    borderRadius: 30,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: pressed ? 0 : 5,
                  },
                ]}
              >
                <Ionicons name="ios-search-outline" size={24} color="black" />
                <TextInput
                  placeholder="Buscar Unidad"
                  value={searchText}
                  onChangeText={text => setSearchText(text)}
                />
              </Pressable>

              {/* Boton Buscar */}
              <Pressable
                onPress={handleSearch}
                style={({ pressed }) => [
                  {
                    paddingHorizontal: 10,
                    borderColor: "#F5F5F5",
                    borderWidth: 2,
                    paddingVertical: 10,
                    borderRadius: 30,
                    backgroundColor: "#6f6f5d",
                    marginTop: 10,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: pressed ? 0 : 5,
                  },
                ]}
              >
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 15,
                    fontWeight: "500",
                    color: "#f7f3f2",
                  }}
                >
                  Search
                </Text>
              </Pressable>

            </View>
            <Text style={{ marginHorizontal: 28, fontSize: 17, fontWeight: "500", color: "#272525", textShadowColor: 'rgba(0, 0, 0, 0.3)',
                           textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 15, fontFamily:"Poppins",}}>
              Exercises
            </Text>
            {/* Carrusel Horizontal */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {searchResults.length > 0 ? (
                searchResults.map(item => (
                  <Pressable
                    key={item.title}
                    onPress={() => navigation.navigate(item.route)}
                    style={({ pressed }) => [
                      {
                        width: 200,
                        height: 150,
                        marginTop: 10,
                        backgroundColor: "#f7f3f2",
                        borderRadius: 15,
                        padding: 20,
                        marginHorizontal: 8,
                        borderWidth: 1,
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.25,
                        shadowRadius: 3.84,
                        elevation: pressed ? 0 : 5,
                      },
                    ]}
                  >
                    <Text style={{ color: "#272525", fontSize: 20, fontWeight: "bold", marginVertical: 7 }}>{item.title}</Text>
                    <Text style={{ color: "#272525", fontSize: 13, fontWeight: "500" }}>{item.subtitle}</Text>
                  </Pressable>
                ))
              ) : (
                data.map(item => (
                  <Pressable
                    key={item.title}
                    onPress={() => navigation.navigate(item.route)}
                    style={({ pressed }) => [
                      {
                        width: 200,
                        height: 150,
                        marginTop: 10,
                        backgroundColor: "#f7f3f2",
                        borderRadius: 15,
                        padding: 20,
                        marginHorizontal: 8,
                        borderWidth: 1,
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.25,
                        shadowRadius: 3.84,
                        elevation: pressed ? 0 : 5,
                      },
                    ]}
                  >
                    <Text style={{ color: "#272525", fontSize: 20, fontWeight: "bold", marginVertical: 7, textShadowColor: 'rgba(0, 0, 0, 0.3)', textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 15, fontFamily:"Poppins", }}>{item.title}</Text>
                    <Text style={{ color: "#272525", fontSize: 13, fontWeight: "500", textShadowColor: 'rgba(0, 0, 0, 0.3)', textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 15, fontFamily:"Poppins", }}>{item.subtitle}</Text>
                  </Pressable>
                ))
              )}
            </ScrollView>

            <Pressable style={{ paddingBottom: 55 }}>
            </Pressable>
            <View>
              <Text style={{ marginHorizontal: 28, fontSize: 17, fontWeight: "500", color: "#272525", textShadowColor: 'rgba(0, 0, 0, 0.4)',
                             textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 15, fontFamily:"Poppins", }}>
                Study Guide
              </Text>

              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {searchResults.length > 0 ? (
                  searchResults.map(item => (
                    <Pressable
                      key={item.title}
                      onPress={() => navigation.navigate(item.route)}
                      style={({ pressed }) => [
                        {
                          width: 200,
                          height: 150,
                          marginTop: 10,
                          backgroundColor: "#f7f3f2",
                          borderRadius: 15,
                          padding: 20,
                          marginHorizontal: 8,
                          borderWidth: 1,
                          shadowColor: '#000',
                          shadowOffset: { width: 1, height: 1 },
                          shadowOpacity: 0.25,
                          shadowRadius: 3.84,
                          elevation: pressed ? 0 : 5,
                        },
                      ]}
                    >
                      <Text style={{ color: "#272525", fontSize: 20, fontWeight: "bold", marginVertical: 7 }}>{item.title}</Text>
                      <Text style={{ color: "#272525", fontSize: 13, fontWeight: "500" }}>{item.subtitle}</Text>
                    </Pressable>
                  ))
                ) : (
                  material.map(item => (
                    <Pressable
                      key={item.title}
                      onPress={() => navigation.navigate(item.route)}
                      style={({ pressed }) => [
                        {
                          width: 200,
                          height: 150,
                          marginTop: 10,
                          backgroundColor: "#f7f3f2",
                          borderRadius: 15,
                          padding: 20,
                          marginHorizontal: 8,
                          borderWidth: 1,
                          shadowColor: '#000',
                          shadowOffset: { width: 0, height: 2 },
                          shadowOpacity: 0.25,
                          shadowRadius: 3.84,
                          elevation: pressed ? 0 : 5,
                        },
                      ]}
                    >
                      <Text style={{ color: "#272525", fontSize: 20, fontWeight: "bold", marginVertical: 7, textShadowColor: 'rgba(0, 0, 0, 0.3)', textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 15, fontFamily:"Poppins", }}>{item.title}</Text>
                      <Text style={{ color: "#272525", fontSize: 13, fontWeight: "500", textShadowColor: 'rgba(0, 0, 0, 0.3)', textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 15, fontFamily:"Poppins", }}>{item.subtitle}</Text>
                    </Pressable>
                  ))
                )}
              </ScrollView>
            </View>
          </ScrollView>
        </View>
      </ImageBackground>
    </>
  );
}

export default NotificacionesScreen;

const styles = StyleSheet.create({});

