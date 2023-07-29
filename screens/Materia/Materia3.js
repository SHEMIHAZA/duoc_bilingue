import React, { useState } from 'react';
import { View, Text, ScrollView, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { WebView } from 'react-native-webview';
import { useLayoutEffect } from 'react';

const Materia3 = () => {
  const navigation = useNavigation();
  const [answers, setAnswers] = useState([
    { question: 'Sophie went on a high school exchange to Japan for 6 months.', answer: '', result: 'true' }, // Pregunta 1
    { question: 'When you enter any public building in Japan, you must take off your shoes.', answer: '', result: 'false' }, // Pregunta 2
    { question: "Sophie didn't wear a school uniform in Germany.", answer: '', result: 'false' }, // Pregunta 3
    { question: 'Sophie thinks Japanese homemade food is better than German food.', answer: '', result: 'true' }, // Pregunta 4
    { question: "Sophie didn't learn Japanese.", answer: '', result: 'true' }, // Pregunta 5
    { question: 'It was easy for Sophie to adapt to Japanese culture.', answer: '', result: 'false' }, // Pregunta 6
  ]);

  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (questionNumber, answer) => {
    const updatedAnswers = [...answers];
    updatedAnswers[questionNumber - 1].answer = answer;
    setAnswers(updatedAnswers);
  };

  const checkAnswers = () => {
    const updatedAnswers = answers.map(item => ({
      ...item,
      result: item.answer === 'true' ? 'Correct' : 'Incorrect',
    }));
    setAnswers(updatedAnswers);
    setShowResults(true);
  };

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

          <ScrollView showsVerticalScrollIndicator={false}>
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

              <WebView
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

            {/* Renderizar las preguntas y respuestas */}
            {answers.map((item, index) => (
              <View key={index} style={styles.questionContainer}>
                <Text style={styles.questionText}>{index + 1}. {item.question}</Text>
                <View style={styles.buttonsContainer}>
                  <TouchableOpacity
                    style={[
                      styles.answerButton,
                      item.answer === 'true' && styles.correctButton,
                      showResults && item.answer === 'false' && styles.incorrectButton,
                    ]}
                    onPress={() => handleAnswer(index + 1, 'true')}
                    disabled={showResults}
                  >
                    <Text style={styles.answerText}>T</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.answerButton,
                      item.answer === 'false' && styles.correctButton,
                      showResults && item.answer === 'true' && styles.incorrectButton,
                    ]}
                    onPress={() => handleAnswer(index + 1, 'false')}
                    disabled={showResults}
                  >
                    <Text style={styles.answerText}>F</Text>
                  </TouchableOpacity>
                </View>
                {/* Mostrar el resultado solo cuando showResults sea verdadero y el usuario haya seleccionado una opción */}
                {showResults && item.answer !== '' && (
                  <View style={styles.resultContainer}>
                    <Text style={item.answer === 'true' ? styles.correctText : styles.incorrectText}>
                      {item.result}
                    </Text>
                  </View>
                )}
              </View>
            ))}

            {/* Boton Check */}
            <TouchableOpacity style={styles.checkButton} onPress={checkAnswers}>
              <Text style={styles.checkButtonText}>Check Your Answers</Text>
            </TouchableOpacity>
          </ScrollView>
        </SafeAreaView>
      </ImageBackground>
    </>
  )
}
export default Materia3;

const styles = StyleSheet.create({
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  answerButton: {
    backgroundColor: '#f7f3f2',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  correctButton: {
    backgroundColor: '#5f6f5d',
  },

  answerText: {
    fontSize: 13,
    color: '#272525',
  },
  title: {
    marginTop: 20,
    fontFamily: "Poppins",
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 15,
    fontSize: 15,
    marginLeft: 15,
    marginRight: 10
  },
  questionContainer: {
    marginVertical: 10,
    marginLeft: 15,
    marginRight: 10,
  },
  questionText: {
    fontSize: 16,
    fontFamily: 'Poppins'
  },
  checkButton: {
    backgroundColor: '#6f6f5d',
    padding: 10,
    borderRadius: 5,
    margin: 20,
    alignItems: 'center',
    marginBottom: 50,
  },
  checkButtonText: {
    color: '#f7f3f2',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resultContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  correctText: {
    color: 'green',
    fontSize: 14,
  },
  incorrectText: {
    color: 'red',
    fontSize: 14,
  },
});