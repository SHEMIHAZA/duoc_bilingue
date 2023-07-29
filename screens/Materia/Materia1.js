import { View, Text, ScrollView, ImageBackground, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { WebView } from 'react-native-webview'; // Paso 1: Importar WebView

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

  return (
    <>
      <ImageBackground source={require("../assets/images/oatmeal-11.jpg")} style={{ flex: 1, resizeMode: "cover" }}>
        <SafeAreaView>

          <ScrollView>
            <View>
              {/*  Titulo   */}
              <Text style={{
                textAlign: 'center', marginTop: 20, fontFamily: "Poppins", textShadowColor: 'rgba(0, 0, 0, 0.3)',
                textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 15, fontSize: 18, marginLeft: 10, marginRight: 10
              }}>
                You are going to watch a video about Sophie, a German vlogger, who describes her experience as an exchange student at a Japanese High School.
              </Text>
            </View>
            {/* Video */}
            <View style={{ marginLeft: 10, marginRight: 10, borderWidth: 1, borderRadius: 5, marginBottom: 25, opacity: 0.9, marginTop: 30 }}>

              <WebView // Paso 3: Agregar el componente WebView con la URL del video que desees mostrar
                style={{ height: 250 }}
                source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/duoc-bilingue.appspot.com/o/1280x720%20Japanese%20High%20School%20Lif.mp4?alt=media&token=1c705da9-dec5-4cf8-b58e-fdc6ecefb230' }}
                allowsFullscreenVideo={true}
              />
            </View>
            <View>

              <Text style={{
                textAlign: 'center', marginTop: 20, fontFamily: "Poppins", textShadowColor: 'rgba(0, 0, 0, 0.3)',
                textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 15, fontSize: 18, marginLeft: 10, marginRight: 10,
                borderWidth: 1, borderRadius: 10, backgroundColor: "#5f6f5d", borderColor: 'transparent', padding: 10, color: "#f7f3f2"
              }}>
                Mark "True" or "False" while watching the video.
              </Text>
            </View>

            <View>
              {/* Cuestionario */}
              <Text style={styles.title}>1. Sophie went on a high school exchange to Japan for 6 months.</Text>
            </View>
            <View>
              {/* Cuestionario */}
              <Text style={styles.title}>2. When you enter any public building in Japan, you must take off your shoes.</Text>
            </View>
            <View>
              {/* Cuestionario */}
              <Text style={styles.title}>3. Sophie didn't wear a school uniform in German.</Text>
            </View>
            <View>
              {/* Cuestionario */}
              <Text style={styles.title}>4. Sophie thinks Japanese homemade food is better than German food.</Text>
            </View>
            <View>
              {/* Cuestionario */}
              <Text style={styles.title}>5. Sophie didn't learn Japanese.</Text>
            </View>
            <View>
              {/* Cuestionario */}
              <Text style={styles.title}>6. It was easy for Sophie to adapt to Japanese culture.</Text>
            </View>
          </ScrollView>
        </SafeAreaView>
      </ImageBackground>
    </>
  )
}

export default Materia1;

const styles = StyleSheet.create({
  title: {
    marginTop: 20, fontFamily: "Poppins", textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 15, fontSize: 15, marginLeft: 15, marginRight: 10
  }
});
