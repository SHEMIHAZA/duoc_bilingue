import { View, Text, ScrollView, ImageBackground } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient'

const Materia1 = () => {
    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
          headerShown: true,
          title: "TIEMPOS VERBALES",
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
    <ImageBackground source={require("../assets/images/fondo1.jpg")}
                                    style={{ flex: 1, resizeMode:"cover", shadowOpacity:0.1}}>
    <SafeAreaView>
    
        <ScrollView>
        
            <View style={{marginLeft:10, marginRight:10, borderWidth:1, borderRadius:5, backgroundColor: "#fff1f1", marginBottom: 25 }}>
                <Text style={{fontSize:30, textAlign:"center"}}>
                    Presente Simple
                </Text>
                <Text style={{marginLeft:12, marginTop:10, fontWeight:"bold", fontSize:20}}>
                    USO: 
                </Text>
                <Text style={{marginLeft:12, marginRight:12, marginTop:10, fontSize:20}}>
                Cosas que ocurren siempre o habitualmente
                </Text>

                <Text style={{marginLeft:12, marginTop:20, fontWeight:"bold", fontSize:20}}>
                    EJEMPLO:
                </Text>
                <Text style={{marginLeft:12, marginRight:12, marginTop:10, fontSize:20, marginBottom:20, borderWidth:1, borderRadius: 8, backgroundColor:"#f2f2", padding:12}}>
                        1. I work in a museum.{'\n'}
                        2. She doesn't play basketball.
                </Text>
            </View>

{/* --------------------------------------------------------------------------------------------------------------------------- */}

            <View style={{marginLeft:10, marginRight:10, borderWidth:1, borderRadius:5, backgroundColor: "#fff1f1", marginBottom: 25 }}>
                <Text style={{fontSize:30, textAlign:"center"}}>
                    Presente Continuo
                </Text>
                <Text style={{marginLeft:12, marginTop:10, fontWeight:"bold", fontSize:20}}>
                    USO: 
                </Text>
                <Text style={{marginLeft:12, marginRight:12, marginTop:10, fontSize:20}}>
                    Cosas que estan ocurriendo ahora o cerca en el tiempo.
                </Text>
                <Text style={{marginLeft:12, marginRight:12, marginTop:10, fontSize:20}}>
                    Arreglos para el futuro cercano.
                </Text>

                <Text style={{marginLeft:12, marginTop:20, fontWeight:"bold", fontSize:20}}>
                    EJEMPLO:
                </Text>
                <Text style={{marginLeft:12, marginRight:12, marginTop:10, fontSize:20, marginBottom:1, borderWidth:1, borderRadius: 8, backgroundColor:"#f2f2", padding:12}}>
                        1. She's wearing a red dress.{'\n'}
                </Text>
                <Text style={{marginLeft:12, marginRight:12, marginTop:10, fontSize:20, marginBottom:20, borderWidth:1, borderRadius: 8, backgroundColor:"#f2f2", padding:12}}>
                        1. I'm arriving on monday.
                </Text>
            </View>

{/* --------------------------------------------------------------------------------------------------------------------------- */}

            <View style={{marginLeft:10, marginRight:10, borderWidth:1, borderRadius:5, backgroundColor: "#fff1f1", marginBottom: 25 }}>
                <Text style={{fontSize:30, textAlign:"center"}}>
                    Pasado Simple
                </Text>
                <Text style={{marginLeft:12, marginTop:10, fontWeight:"bold", fontSize:20}}>
                    USO: 
                </Text>
                <Text style={{marginLeft:12, marginTop:10, fontSize:20}}>
                    Acciones finalizadas en el pasado
                </Text>

                <Text style={{marginLeft:12, marginTop:10, fontWeight:"bold", fontSize:20}}>
                    EJEMPLO:
                </Text>
                <Text style={{marginLeft:12, marginRight:12, marginTop:10, fontSize:20, marginBottom:20, borderWidth:1, borderRadius: 5, backgroundColor:"#f2f2", padding:12}}>
                        1. We played videogames last night.{'\n'}
                        2. They didn't go to classes.
                </Text>
            </View>

        </ScrollView>
        
    </SafeAreaView>
    </ImageBackground>
    
    </>
  )
}

export default Materia1