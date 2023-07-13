import { StyleSheet, Text, View, Button, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useLayoutEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';

const Exercise = ({ question, options, answer, handleOptionPress, selectedOption, showResult }) => {
  const [exerciseSelectedOption, setExerciseSelectedOption] = useState(null);

  const handleExerciseOptionPress = (option) => {
    setExerciseSelectedOption(option);
    handleOptionPress(option);
  };

  return (
    <View style={styles.exerciseContainer}>
      <Text style={styles.questionText}>{question}</Text>
      {options.map((option, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => handleExerciseOptionPress(option)}
          style={[
            styles.optionButton,
            exerciseSelectedOption === option && styles.selectedOptionButton,
          ]}
        >
          <Text>{option}</Text>
        </TouchableOpacity>
      ))}

      {showResult && (
        <Text style={exerciseSelectedOption === answer ? styles.correctAnswerText : styles.incorrectAnswerText}>
          {exerciseSelectedOption === answer ? 'Correct!' : 'Incorrect!'} The correct answer is {answer}.
        </Text>
      )}
    </View>
  );
};

const Guia2 = () => {
  const navigation = useNavigation();
  const [showResult, setShowResult] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const handleOptionPress = (option) => {
    // Handle the option press here
  };

  const checkAnswer = () => {
    setShowResult(true);
  };

  const resetQuiz = () => {
    setShowResult(false);
    setModalVisible(false);
  };

  const showQuizResults = () => {
    setModalVisible(true);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: "Simple Past of Be: was/were",
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
    <ScrollView contentContainerStyle={styles.container}>
      <View style={{ backgroundColor: "#F8BBD0" }}>
        <Text style={{
          height: 65,
          marginLeft: 20,
          marginRight: 20,
          marginTop: 20,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-around",
        }}>
          Remember this: we often add -er or -or to a verb, e.g., writer, actor. We often add -ian, -ist or man / woman to a noun, e.g., musician.
        </Text>
      </View>

      {/* EJERCICIOS DE SELECCION */}
      <View style={{ margin: 15 }}>
        <Exercise
          question="Which verb tense is used to talk about future actions?"
          options={["Future Simple", "Present Continuous", "Past Simple"]}
          answer="Future Simple"
          handleOptionPress={handleOptionPress}
          showResult={showResult}
        />
      </View>

      <View style={{ margin: 15, borderBottomWidth: 1, borderBottomColor: 'black' }} />

      <View style={{ margin: 15 }}>
        <Exercise
          question="Which verb tense is used to talk about future actions?"
          options={["Future Simple", "Present Continuous", "Past Simple"]}
          answer="Future Simple"
          handleOptionPress={handleOptionPress}
          showResult={showResult}
        />
      </View>


      {/* ... Repite las instancias de Exercise para el resto de preguntas ... */}

      <View>
        <TouchableOpacity
          onPress={showQuizResults}
          style={{
            borderWidth: 1,
            borderRadius: 20,
            padding: 15,
            marginBottom: 20,
            marginLeft: 12,
            marginRight: 12,
            backgroundColor: "#009BCC",
          }}
        >
          <Text style={{ textAlign: "center" }}>
            Check your Answers
          </Text>
        </TouchableOpacity>
      </View>

      {/* Modal para mostrar los resultados */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>
              Your quiz results:
            </Text>
            {/* ... Mostrar los resultados del quiz aquí ... */}
            <TouchableOpacity
              onPress={resetQuiz}
              style={styles.modalButton}
            >
              <Text style={styles.modalButtonText}>
                Try Again
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default Guia2;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: 'white',
  },
  exerciseContainer: {
    marginBottom: 20,
    marginTop: 30,
  },
  questionText: {
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 10,
    color: "black"
  },
  optionButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    borderColor: "#FF4081",
    borderWidth: 1,
    paddingVertical: 10,
    borderRadius: 10,
    marginLeft: 12,
    marginRight: 12,
    marginTop: 15,
    height: 50,
  },
  checkAnswerButton: {
    marginTop: 20,
    borderColor: "#FF4081",
    color: "black",
  },
  checkAnswerButtonText: {
    color: "black",
  },
  correctAnswerText: {
    color: 'green',
    marginTop: 10,
    margin: 25,
    fontSize: 16,
    fontWeight: 'bold',
  },
  incorrectAnswerText: {
    color: 'red',
    marginTop: 10,
    margin: 25,
    fontSize: 16,
    fontWeight: 'bold',
  },
  selectedOptionButton: {
    backgroundColor: "#FF1151",
    opacity: 0.6,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: '#009BCC',
    padding: 10,
    borderRadius: 10,
    width: '60%',
    alignItems: 'center',
    marginTop: 20,
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
