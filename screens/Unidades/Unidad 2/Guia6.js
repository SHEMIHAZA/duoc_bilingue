import { StyleSheet, Text, View, Button, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useLayoutEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';

const Exercise = ({ question, options, answer, handleOptionPress, selectedOption, showResult }) => {
  const isCorrect = selectedOption === answer;
  return (
    <View style={styles.exerciseContainer}>
      <Text style={styles.questionText}>{question}</Text>
      {options.map((option, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => handleOptionPress(option)}
          style={[
            styles.optionButton,
            selectedOption === option && styles.selectedOptionButton,
            showResult && selectedOption === option && isCorrect && styles.correctOptionButton,
            showResult && selectedOption === option && !isCorrect && styles.incorrectOptionButton,
          ]}
        >
          <Text>{option}</Text>
        </TouchableOpacity>
      ))}

      {showResult && (
         <Text style={isCorrect ? styles.correctAnswerText : styles.incorrectAnswerText}>
         {isCorrect ? 'Correct!' : 'Incorrect!'} The correct answer is {answer}.
       </Text>
      )}
    </View>
  );
};

const Guia6 = () => {
  const navigation = useNavigation();
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const handleOptionPress = (option, index) => {
    const updatedSelectedOptions = [...selectedOptions];
    updatedSelectedOptions[index] = option;
    setSelectedOptions(updatedSelectedOptions);

    const exercise = exercises[index];
    exercise.isCorrect = option === exercise.answer;
  };

  const checkAnswer = () => {
    setShowResult(true);
  };

  const resetQuiz = () => {
    setSelectedOptions([]);
    setShowResult(false);
    setModalVisible(false);
  };

  const showQuizResults = () => {
    setModalVisible(true);
  };

  const countCorrectAnswers = () => {
    let count = 0;
    selectedOptions.forEach((option, index) => {
      if (option === exercises[index].answer) {
        count++;
      }
    });
    return count;
  };

  const countIncorrectAnswers = () => {
    const totalQuestions = exercises.length;
    const correctAnswers = countCorrectAnswers();
    return totalQuestions - correctAnswers;
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

  const exercises = [
    {
      question: "Which verb tense is used to talk about future actions?",
      options: ["Future Simple", "Present Continuous", "Past Simple"],
      answer: "Future Simple",
    },

    {
      question: "Which verb tense is used to talk about future actions?",
      options: ["Future Simple", "Present Continuous", "Past Simple"],
      answer: "Future Simple",
    },

    {
      question: "Which verb tense is used to talk about future actions?",
      options: ["Future Simple", "Present Continuous", "Past Simple"],
      answer: "Future Simple",
    },

    {
      question: "Which verb tense is used to talk about future actions?",
      options: ["Future Simple", "Present Continuous", "Past Simple"],
      answer: "Future Simple",
    },

  
    // ... Agrega más objetos de ejercicio aquí ...
  ];

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

      {exercises.map((exercise, index) => (
        <View key={index} style={{ margin: 15 }}>
          <Exercise
            question={exercise.question}
            options={exercise.options}
            answer={exercise.answer}
            handleOptionPress={(option) => handleOptionPress(option, index)}
            selectedOption={selectedOptions[index]}
            showResult={showResult}
          />
        </View>
      ))}

      <View>
        <TouchableOpacity
          onPress={(showQuizResults, checkAnswer)}
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
            <Text style={styles.correctResultText}>
              Correct Answers: {countCorrectAnswers()}
            </Text>
            <Text style={styles.incorrectResultText}>
              Incorrect Answers: {countIncorrectAnswers()}
            </Text>
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

export default Guia6;

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
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  correctResultText: {
    color: 'green',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  incorrectResultText: {
    color: 'red',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalButton: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    padding: 10,
    backgroundColor: 'green',
    marginBottom: 10,
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  correctOptionButton: {
    backgroundColor: 'green',
    opacity: 0.6,
  },
  incorrectOptionButton: {
    backgroundColor: 'red',
    opacity: 0.6,
  },
  
});
