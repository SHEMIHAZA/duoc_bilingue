import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useLayoutEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';

const Exercise = ({ question, options, answer, handleOptionPress, selectedOption, showResult }) => {
  const [isAnswered, setIsAnswered] = useState(false);
  const isCorrect = selectedOption === answer;
  const incorrectMessage = 'Incorrect! The correct answer is ' + answer + '.';
  const correctMessage = 'Correct!';

  const handlePress = (option) => {
    handleOptionPress(option);
    setIsAnswered(true);
  };

  return (
    <View style={styles.exerciseContainer}>
      <Text style={styles.questionText}>{question}</Text>
      {options.map((option, index) => {
        const isSelected = selectedOption === option;
        const isCurrentAnswer = answer === option;
        const isChosenAnswer = showResult && isSelected;
        const isCorrectAnswer = isChosenAnswer && isCorrect;

        return (
          <TouchableOpacity
            key={index}
            onPress={() => handlePress(option)}
            style={[
              styles.optionButton,
              isSelected && styles.selectedOptionButton,
              isChosenAnswer && isCorrectAnswer && styles.correctOptionButton,
              isChosenAnswer && !isCorrectAnswer && styles.incorrectOptionButton,
            ]}
          >
            <Text>{option}</Text>
            {isAnswered && (
              <Text style={isCorrectAnswer ? styles.correctAnswerText : styles.incorrectAnswerText}>
                {isCorrectAnswer ? correctMessage : incorrectMessage}
              </Text>
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const Guia1 = () => {
  const navigation = useNavigation();
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const handleOptionPress = (option, index) => {
    const updatedSelectedOptions = [...selectedOptions];
    updatedSelectedOptions[index] = { option, isAnswered: true };
    setSelectedOptions(updatedSelectedOptions);
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
      if (option.option === exercises[index].answer && option.isAnswered) {
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
      question: "1. Daniel’s behaviour is bad, but Brian’s is____________",
      options: ["a) much worst", "b) more worse", "c) much worse", "d) worst"],
      answer: "c) much worse",
    },
    {
      question: "2. They___________a photo when I was on the podium",
      options: ["a) were taken", "b) had taken", "c) are taking", "d) took"],
      answer: "d) took",
    },
    {
      question: "3. What are you going to____________in the interview?",
      options: ["a) tell", "b) told", "c) say", "d) saying"],
      answer: "c) say",
    },
    {
      question: "4. What did your mother___________you when she found out?",
      options: ["a) tell", "b) say", "c) said", "d) told"],
      answer: "a) tell",
    },
    // ... Agrega más objetos de ejercicio aquí ...
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.container}>
        <LinearGradient
          colors={['#34494E','#DCDCD1']}
          start={[1, 0]}
          end={[1, 1]}
          style={styles.gradientContainer}
        >
          <Text style={styles.text}>
            Remember this: we often add -er or -or to a verb, e.g., writer, actor. We often add -ian, -ist or man / woman to a noun, e.g., musician.
          </Text>
        </LinearGradient>
      </View>

      {exercises.map((exercise, index) => (
        <View key={index} style={{ margin: 15 }}>
          <Exercise
            question={exercise.question}
            options={exercise.options}
            answer={exercise.answer}
            handleOptionPress={(option) => handleOptionPress(option, index)}
            selectedOption={selectedOptions[index]?.option}
            showResult={showResult}
          />
        </View>
      ))}

      <View>
        <TouchableOpacity
          onPress={() => {
            checkAnswer();
            showQuizResults();
          }}
        >
          <LinearGradient colors={["#009FAC","#009FAC"]} style={styles.gradientButton}>
            <Text style={styles.btnAnswer}>
              Check your Answers
            </Text>
          </LinearGradient>
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

export default Guia1;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  gradientContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  text: {
    color: "white",
    fontSize: 16,
  },
  exerciseContainer: {
    backgroundColor: "#F5F5F5",
    padding: 10,
    borderRadius: 10,
  },
  questionText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  optionButton: {
    backgroundColor: "#E0E0E0",
    padding: 10,
    marginBottom: 5,
    borderRadius: 5,
  },
  selectedOptionButton: {
    backgroundColor: "#80CBC4",
  },
  correctOptionButton: {
    backgroundColor: "#C8E6C9",
  },
  incorrectOptionButton: {
    backgroundColor: "#FFCDD2",
  },
  correctAnswerText: {
    color: "green",
    marginTop: 5,
  },
  incorrectAnswerText: {
    color: "red",
    marginTop: 5,
  },
  gradientButton: {
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  btnAnswer: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    elevation: 5,
  },
  modalText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  correctResultText: {
    color: "green",
    fontSize: 16,
    marginBottom: 5,
  },
  incorrectResultText: {
    color: "red",
    fontSize: 16,
    marginBottom: 10,
  },
  modalButton: {
    backgroundColor: "#2196F3",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  modalButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});
